-- Cloning a trainer copies the trainer row and everything that hangs off it:
-- inventory, feats, every pokemon, and each pokemon's moves, held items and
-- feats. The copy is a wholly separate trainer with its own keys -- nothing is
-- shared with the original, so editing one never touches the other.
--
-- Both keys are required. The read key alone identifies a trainer to anyone who
-- has been handed a share link, and a clone is a write-shaped act: it mints a
-- new trainer, and its output is a write key granting full control over a copy
-- of someone else's sheet. Demanding the write key too means only the owner can
-- do it, and demanding they match the *same* trainer stops a caller from
-- pairing their own write key with a read key they were merely shown.

-- Every copy here is "the whole row minus the few columns that must differ",
-- and the columns that must differ are the only interesting part. Spelling out
-- the rest by hand would mean that the next migration to add a column to
-- private.pokemon silently drops it from clones -- a bug that shows up as a
-- half-copied sheet long after the column was added, not as a failure here.
--
-- So the column list is read from the catalog at call time. Excluded are:
-- generated and identity columns, which cannot be inserted into at all, and
-- whatever the caller names in _except -- primary keys that are plain serials
-- (private.pokemon.id, private.moves.id) rather than identity columns, the
-- foreign keys being repointed, and the keys that have to be freshly minted.
--
-- It lives in private so it stays off the PostgREST API; only the SECURITY
-- DEFINER functions below can reach it.
CREATE OR REPLACE FUNCTION private.cloneable_columns(
	_table TEXT,
	_except TEXT[]
) RETURNS TEXT AS $$
	SELECT string_agg(quote_ident(column_name), ', ' ORDER BY ordinal_position)
	FROM information_schema.columns
	WHERE table_schema = 'private'
		AND table_name = _table
		AND NOT (column_name = ANY(_except))
		AND is_generated = 'NEVER'
		AND identity_generation IS NULL;
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION clone_trainer(
	_read_key VARCHAR(32),
	_write_key VARCHAR(32),
	OUT ret_read_key VARCHAR(32),
	OUT ret_write_key VARCHAR(32)
) AS $$
DECLARE
	_src_trainer_id UUID;
	_new_trainer_id UUID;
	_src_pokemon_id INT;
	_new_pokemon_id INT;
	_pokemon_cols   TEXT;
BEGIN
	-- Both keys must belong to one and the same trainer.
	SELECT id INTO _src_trainer_id
	FROM private.trainers
	WHERE read_key = _read_key
		AND write_key = _write_key;

	IF _src_trainer_id IS NULL THEN
		RAISE EXCEPTION 'Not authorized to clone this trainer';
	END IF;

	-- id, read_key and write_key are all omitted so their defaults fire:
	-- uuid_generate_v4 and two nanoid calls. The clone is therefore unrelated to
	-- the original as far as every other function here is concerned -- a write
	-- key never opens both.
	--
	-- avatar_filename is copied, so the clone shows the same picture. The two
	-- rows then name one storage object, which is safe in the direction that
	-- matters: the bucket's delete policy only admits filenames no trainer
	-- references any more, so the object survives as long as either trainer
	-- wants it and is collected once neither does.
	--
	-- The name is copied verbatim rather than being suffixed. What a copy should
	-- be called is a question for the person making it, and update_trainer
	-- already answers it.
	EXECUTE format(
		'INSERT INTO private.trainers (%1$s)
		SELECT %1$s FROM private.trainers WHERE id = $1
		RETURNING id, read_key, write_key',
		private.cloneable_columns('trainers', ARRAY['id', 'read_key', 'write_key'])
	)
	INTO _new_trainer_id, ret_read_key, ret_write_key
	USING _src_trainer_id;

	INSERT INTO private.inventory_items (trainer_id, item_id, quantity, custom_name, description, rank)
	SELECT _new_trainer_id, item_id, quantity, custom_name, description, rank
	FROM private.inventory_items
	WHERE trainer_id = _src_trainer_id;

	INSERT INTO private.trainer_feats (trainer_id, feat_name, description, is_custom, rank)
	SELECT _new_trainer_id, feat_name, description, is_custom, rank
	FROM private.trainer_feats
	WHERE trainer_id = _src_trainer_id;

	-- Hoisted out of the loop: the catalog cannot change under us mid-statement,
	-- so one lookup serves every pokemon.
	_pokemon_cols := private.cloneable_columns('pokemon', ARRAY['id', 'trainer_id']);

	-- A pokemon and its children have to be copied together, because each child
	-- row needs the id the parent was just given. That id only exists once the
	-- INSERT has run, so the pokemon are walked one at a time rather than copied
	-- in a single set-based statement; a trainer's roster is small enough that
	-- the loop costs nothing.
	--
	-- rank and storage are copied like any other column. Unlike a transfer,
	-- which lands one pokemon in a party that already has its own ordering, this
	-- reproduces an entire trainer: the clone's party and box should read
	-- exactly as the original's do, in the same order.
	FOR _src_pokemon_id IN
		SELECT id FROM private.pokemon WHERE trainer_id = _src_trainer_id
	LOOP
		EXECUTE format(
			'INSERT INTO private.pokemon (trainer_id, %1$s)
			SELECT $1, %1$s FROM private.pokemon WHERE id = $2
			RETURNING id',
			_pokemon_cols
		)
		INTO _new_pokemon_id
		USING _new_trainer_id, _src_pokemon_id;

		INSERT INTO private.moves (pokemon_id, move_id, pp_cur, pp_max, notes, rank)
		SELECT _new_pokemon_id, move_id, pp_cur, pp_max, notes, rank
		FROM private.moves
		WHERE pokemon_id = _src_pokemon_id;

		INSERT INTO private.held_items (pokemon_id, item_id, custom_name, description, rank)
		SELECT _new_pokemon_id, item_id, custom_name, description, rank
		FROM private.held_items
		WHERE pokemon_id = _src_pokemon_id;

		INSERT INTO private.pokemon_feats (pokemon_id, feat_name, description, is_custom, rank)
		SELECT _new_pokemon_id, feat_name, description, is_custom, rank
		FROM private.pokemon_feats
		WHERE pokemon_id = _src_pokemon_id;
	END LOOP;

	-- private.transfer_codes is deliberately not copied. A transfer code is a
	-- one-time claim on a single pokemon, and accept_pokemon_transfer resolves a
	-- code to a pokemon with a bare SELECT: duplicating a code would make that
	-- lookup ambiguous and hand a second person a claim the owner never issued.
	-- The clone's pokemon simply start out with no outstanding offers.
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;
