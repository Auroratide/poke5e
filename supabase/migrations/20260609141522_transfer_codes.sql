CREATE TABLE private.transfer_codes (
	id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	pokemon_id INT REFERENCES private.pokemon(id) ON DELETE CASCADE,
	transfer_code VARCHAR(32)
);

CREATE OR REPLACE FUNCTION generate_transfer_code(
	_write_key VARCHAR(32),
	_pokemon_id INT
) RETURNS VARCHAR(32) AS $$
DECLARE
	ret_transfer_code VARCHAR(32);
BEGIN
	-- Authorize: the write_key must belong to the trainer that owns the pokemon.
	IF NOT EXISTS (
		SELECT 1
		FROM private.pokemon p
		JOIN private.trainers t ON t.id = p.trainer_id
		WHERE p.id = _pokemon_id
			AND t.write_key = _write_key
	) THEN
		RAISE EXCEPTION 'Not authorized to generate a transfer code for pokemon %', _pokemon_id;
	END IF;

	-- Idempotent: if a code already exists, hand it back instead of piling up duplicates.
	SELECT transfer_code INTO ret_transfer_code
	FROM private.transfer_codes
	WHERE pokemon_id = _pokemon_id;

	IF ret_transfer_code IS NOT NULL THEN
		RETURN ret_transfer_code;
	END IF;

	ret_transfer_code := public.nanoid(13);

	INSERT INTO private.transfer_codes (pokemon_id, transfer_code)
	VALUES (_pokemon_id, ret_transfer_code);

	RETURN ret_transfer_code;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_transfer_code(
	_write_key VARCHAR(32),
	_pokemon_id INT
) RETURNS VARCHAR(32) AS $$
DECLARE
	ret_transfer_code VARCHAR(32);
BEGIN
	SELECT tc.transfer_code INTO ret_transfer_code
	FROM private.transfer_codes tc
	JOIN private.pokemon p  ON p.id = tc.pokemon_id
	JOIN private.trainers t ON t.id = p.trainer_id
	WHERE tc.pokemon_id = _pokemon_id
		AND t.write_key = _write_key;

	RETURN ret_transfer_code;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;

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
	SELECT COALESCE(MAX("rank"), 0) + 1
	INTO _new_rank
	FROM private.pokemon
	WHERE trainer_id = _new_trainer_id;

	-- Build the list of pokemon columns to copy, skipping the identity id
	-- (auto-generated) and trainer_id (which we override). This way we copy
	-- every attribute column without having to enumerate them by hand.
	SELECT string_agg(quote_ident(column_name), ', ')
	INTO _cols
	FROM information_schema.columns
	WHERE table_schema = 'private'
		AND table_name   = 'pokemon'
		AND column_name NOT IN ('id', 'trainer_id', 'rank')
		AND is_generated = 'NEVER'
		AND identity_generation IS NULL;

	-- Clone the pokemon row under the new trainer and capture the new id.
	EXECUTE format(
		'INSERT INTO private.pokemon (trainer_id, "rank", %1$s)
		SELECT $1, $3, %1$s FROM private.pokemon WHERE id = $2
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

CREATE OR REPLACE FUNCTION revoke_transfer_code(
	_write_key VARCHAR(32),
	_pokemon_id INT
) RETURNS INT AS $$
DECLARE
	_deleted INT;
BEGIN
	IF NOT EXISTS (
		SELECT 1
		FROM private.pokemon p
		JOIN private.trainers t ON t.id = p.trainer_id
		WHERE p.id = _pokemon_id
			AND t.write_key = _write_key
	) THEN
		RAISE EXCEPTION 'Not authorized to revoke a transfer code for pokemon %', _pokemon_id;
	END IF;

	WITH del AS (
		DELETE FROM private.transfer_codes
		WHERE pokemon_id = _pokemon_id
		RETURNING 1
	)
	SELECT count(*) INTO _deleted FROM del;

	RETURN _deleted;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;
