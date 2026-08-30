-- The Box is a trainer's PC storage: one flat, unlimited list per trainer. A
-- pokemon is either in the party or in the box, so the whole feature is a
-- single piece of state on the pokemon row.
--
-- It lives on private.pokemon rather than in a table of its own because a
-- pokemon's identity has to survive a deposit: transfer codes, moves, held
-- items, feats, abilities and the avatar filename all key off pokemon.id, and
-- moving the row would mean moving all of them with it.
--
-- It is a location rather than a boolean so that a future place to keep a
-- pokemon -- a daycare, a second box -- is a new value instead of a reshaped
-- schema. Adding one means extending the constraint below.
--
-- get_pokemon RETURNS SETOF private.pokemon and SELECTs *, so the new column
-- reaches the API with no signature change and no DROP FUNCTION -- the same
-- free ride the tags column got.

-- Both clauses in one ALTER TABLE so the table is scanned once. On PG11+ a
-- constant default is a catalog-only change, so no existing row is rewritten
-- and every pokemon that already exists starts out in the party.
--
-- Unlike status or gender, which are only ever displayed, the app *branches* on
-- this value to decide which list a pokemon appears in. An unrecognised value
-- would put a pokemon in neither list and hide it from its own trainer, so the
-- set of valid locations is enforced here rather than by client convention.
ALTER TABLE private.pokemon
	ADD COLUMN storage VARCHAR(255) NOT NULL DEFAULT 'party', -- 'party' or 'box'
	ADD CONSTRAINT must_be_a_known_storage_location CHECK (storage IN ('party', 'box'));

-- Moving a pokemon is its own function rather than another parameter on
-- update_pokemon. update_pokemon is handed a whole pokemon by the editor and by
-- the tag updater, so threading the location through it would let any stale
-- copy of a pokemon silently relocate it. It also has to hand out a party rank
-- on the way in, and rank is deliberately something update_pokemon never
-- touches -- only add_pokemon, reorder_pokemon and accept_pokemon_transfer do.
--
-- add_pokemon needs nothing: a caught pokemon always joins the party, which the
-- column default already gives us, and adding a parameter there would mint yet
-- another overload of an already heavily overloaded function.
--
-- _storage is not defaulted, so a caller that omits it errors instead of
-- silently relocating the pokemon. Validation is left entirely to the check
-- constraint, so there is only one place to edit when a location is added.
CREATE OR REPLACE FUNCTION set_pokemon_storage(
	_write_key VARCHAR(32),
	_id INT,
	_storage VARCHAR(255)
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	UPDATE private.pokemon p SET
		storage = _storage,
		-- rank is a position *within* a storage: the party runs 1..N and the box
		-- runs 1..M, counted separately. A move is therefore an append to the end
		-- of wherever the pokemon is going, in either direction.
		--
		-- MAX, not COUNT, because gaps are allowed -- a move leaves one behind in
		-- the storage it left, and so does remove_pokemon. The subquery reads the
		-- pre-UPDATE snapshot, where this row still belongs to its old storage,
		-- so it never counts itself and the result is always greater than every
		-- rank in the destination.
		--
		-- The guard makes the call idempotent: moving a pokemon to where it
		-- already is leaves its rank alone, so a double click or a stale tab
		-- cannot shunt it to the back of its own list. The storage it leaves is
		-- never renumbered, so the pokemon left behind keep their order.
		rank = CASE WHEN p.storage <> _storage THEN (
			SELECT COALESCE(MAX(sibling.rank), 0) + 1
			FROM private.pokemon sibling
			WHERE sibling.trainer_id = p.trainer_id
				AND sibling.storage = _storage
		) ELSE p.rank END
	FROM private.trainers t
	WHERE
		p.id = _id
		AND p.trainer_id = t.id
		AND t.write_key = _write_key;

	-- The write-access gate is the UPDATE's own WHERE clause, so ROW_COUNT is
	-- already the permission answer: 0 means the pokemon does not exist or the
	-- key does not own it.
	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

-- reorder_pokemon renumbers from 20260323132133_add_rank_to_pokemon.sql, which
-- was written when a trainer had exactly one list and rank was a single
-- sequence across it. With a box there are two lists, and rank counts from 1
-- within each, so a flat 1..N over whatever ids arrive would hand the same rank
-- to a party pokemon and a boxed one.
--
-- The supplied ids are partitioned by the storage each pokemon is *currently*
-- in and numbered from 1 within each partition, keeping the order they were
-- given in. Sending one list is the ordinary case and leaves the other
-- untouched; sending both at once still yields a correct 1..N and 1..M rather
-- than one interleaved run.
--
-- Storage is read from the row rather than passed in, so a caller cannot claim
-- a list a pokemon is not in, and so the pre-box client -- which has no box UI
-- and sends every id it knows about -- keeps ordering its party correctly.
CREATE OR REPLACE FUNCTION reorder_pokemon(
	_write_key VARCHAR(32),
	_ids INT[]
) RETURNS VOID as $$
DECLARE
	_trainer_id UUID;
	_mismatch_count INT;
BEGIN
	-- Resolve the trainer from the write key
	SELECT id INTO _trainer_id
	FROM private.trainers
	WHERE write_key = _write_key;

	IF NOT FOUND THEN
		RAISE EXCEPTION 'Invalid write_key';
	END IF;

	-- Verify every supplied ID belongs to this trainer
	SELECT COUNT(*) INTO _mismatch_count
	FROM UNNEST(_ids) AS supplied_id
	LEFT JOIN private.pokemon p ON p.id = supplied_id AND p.trainer_id = _trainer_id
	WHERE p.id IS NULL;

	IF _mismatch_count > 0 THEN
		RAISE EXCEPTION 'Permission denied: % pokemon id(s) do not belong to this trainer', _mismatch_count;
	END IF;

	-- Reassign ranks by array position, restarting at 1 for each storage.
	-- WITH ORDINALITY carries the caller's ordering through the join to the
	-- pokemon rows, which is what supplies the storage to partition by.
	UPDATE private.pokemon p
	SET rank = position.rank
	FROM (
		SELECT
			supplied.id,
			(ROW_NUMBER() OVER (
				PARTITION BY existing.storage
				ORDER BY supplied.ord
			))::INT AS rank
		FROM UNNEST(_ids) WITH ORDINALITY AS supplied(id, ord)
		JOIN private.pokemon existing ON existing.id = supplied.id
	) AS position
	WHERE p.id = position.id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

-- Unchanged from 20260609141522_transfer_codes.sql except for the storage
-- column. This function builds its column list from information_schema, so
-- every new column on private.pokemon is copied automatically -- which for
-- storage is the wrong behaviour: a pokemon transferred out of a box would
-- arrive invisible in the recipient's box, contradicting the _new_rank below,
-- which already assumes a party slot. It is overridden rather than merely
-- excluded so it stays correct if more locations are added later.
CREATE OR REPLACE FUNCTION accept_pokemon_transfer(
	_write_key VARCHAR(32),
	_transfer_code VARCHAR(32)
) RETURNS INT AS $$
DECLARE
	_new_trainer_id UUID;
	_src_pokemon_id INT;
	_new_pokemon_id INT;
	_new_rank       INT;
	_cols           TEXT;
BEGIN
	-- Resolve the destination trainer from the write key.
	SELECT id INTO _new_trainer_id
	FROM private.trainers
	WHERE write_key = _write_key;

	IF _new_trainer_id IS NULL THEN
		RAISE EXCEPTION 'Invalid write key';
	END IF;

	-- Resolve the source pokemon from the transfer code.
	SELECT pokemon_id INTO _src_pokemon_id
	FROM private.transfer_codes
	WHERE transfer_code = _transfer_code;

	IF _src_pokemon_id IS NULL THEN
		RAISE EXCEPTION 'Invalid or expired transfer code';
	END IF;

	-- Next rank = highest existing rank for the destination trainer + 1.
	-- COALESCE handles the trainer's first pokemon (-> rank 1). We use MAX,
	-- not COUNT, because gaps in the rank sequence are allowed.
	--
	-- Scoped to the party, because rank counts from 1 within each storage and
	-- the clone below always lands in the party. Measuring against the box too
	-- would push every transfer past the end of a list it is not joining.
	SELECT COALESCE(MAX("rank"), 0) + 1
	INTO _new_rank
	FROM private.pokemon
	WHERE trainer_id = _new_trainer_id
		AND storage = 'party';

	-- Build the list of pokemon columns to copy, skipping the identity id
	-- (auto-generated), trainer_id and storage (which we override). This way we
	-- copy every attribute column without having to enumerate them by hand.
	SELECT string_agg(quote_ident(column_name), ', ')
	INTO _cols
	FROM information_schema.columns
	WHERE table_schema = 'private'
		AND table_name   = 'pokemon'
		AND column_name NOT IN ('id', 'trainer_id', 'rank', 'storage')
		AND is_generated = 'NEVER'
		AND identity_generation IS NULL;

	-- Clone the pokemon row under the new trainer and capture the new id. A
	-- transferred pokemon joins the recipient's party: where the sender kept it
	-- is the sender's business, and the rank computed above assumes a party slot.
	EXECUTE format(
		'INSERT INTO private.pokemon (trainer_id, "rank", storage, %1$s)
		SELECT $1, $3, ''party'', %1$s FROM private.pokemon WHERE id = $2
		RETURNING id',
		_cols
	)
	INTO _new_pokemon_id
	USING _new_trainer_id, _src_pokemon_id, _new_rank;

	-- Deep-copy the related rows, pointing them at the new pokemon.
	INSERT INTO private.moves (pokemon_id, move_id, pp_cur, pp_max, notes)
	SELECT _new_pokemon_id, move_id, pp_cur, pp_max, notes
	FROM private.moves
	WHERE pokemon_id = _src_pokemon_id;

	INSERT INTO private.held_items (pokemon_id, item_id, custom_name, description)
	SELECT _new_pokemon_id, item_id, custom_name, description
	FROM private.held_items
	WHERE pokemon_id = _src_pokemon_id;

	INSERT INTO private.pokemon_feats (pokemon_id, feat_name, description, is_custom, rank)
	SELECT _new_pokemon_id, feat_name, description, is_custom, rank
	FROM private.pokemon_feats
	WHERE pokemon_id = _src_pokemon_id;

	RETURN _new_pokemon_id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;
