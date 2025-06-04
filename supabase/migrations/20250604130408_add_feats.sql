-- Pokemon
CREATE TABLE private.pokemon_feats (
	id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	pokemon_id INT REFERENCES private.pokemon(id) ON DELETE CASCADE,
	feat_name VARCHAR(255),
	description TEXT,
	is_custom BOOLEAN,
	rank INT NOT NULL DEFAULT 0
);

CREATE OR REPLACE FUNCTION add_pokemon_feat(
	_write_key VARCHAR(32),
	_pokemon_id INT,
	_feat_name VARCHAR(255),
	_description TEXT,
	_is_custom BOOLEAN,
	_rank INT
) RETURNS BIGINT AS $$
DECLARE
	ret_id BIGINT;
BEGIN
	IF EXISTS (
		SELECT FROM private.pokemon p
			INNER JOIN private.trainers t
			ON p.trainer_id = t.id
			WHERE p.id = _pokemon_id AND t.write_key = _write_key
	) THEN
		INSERT INTO private.pokemon_feats (
			pokemon_id,
			feat_name,
			description,
			is_custom,
			rank
		) VALUES (
			_pokemon_id,
			_feat_name,
			_description,
			_is_custom,
			_rank
		) RETURNING id INTO ret_id;
	END IF;

	RETURN ret_id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_pokemon_feat(
	_write_key VARCHAR(32),
	_id BIGINT,
	_feat_name VARCHAR(255),
	_description TEXT,
	_is_custom BOOLEAN,
	_rank INT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	UPDATE private.pokemon_feats h SET
		feat_name = _feat_name,
		description = _description,
		is_custom = _is_custom,
		rank = _rank
	FROM
		private.pokemon p
		INNER JOIN private.trainers t
		ON t.id = p.trainer_id
	WHERE
		h.id = _id
		AND pokemon_id = p.id
		AND t.write_key = _write_key;
	
	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION remove_pokemon_feat(
	_write_key VARCHAR(32),
	_id BIGINT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	DELETE FROM private.pokemon_feats h
	USING
		private.pokemon p,
		private.trainers t
	WHERE
		h.id = _id
		AND h.pokemon_id = p.id
		AND p.trainer_id = t.id
		AND t.write_key = _write_key;
	
	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_pokemon_feats(
	_pokemon_id INT
) RETURNS SETOF private.pokemon_feats AS $$
BEGIN
	RETURN QUERY SELECT * FROM private.pokemon_feats h WHERE h.pokemon_id = _pokemon_id  ORDER BY h.rank;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;

-- Trainers
CREATE TABLE private.trainer_feats (
	id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	trainer_id uuid REFERENCES private.trainers(id) ON DELETE CASCADE,
	feat_name VARCHAR(255),
	description TEXT,
	is_custom BOOLEAN,
	rank INT NOT NULL DEFAULT 0
);

CREATE OR REPLACE FUNCTION add_trainer_feat(
	_write_key VARCHAR(32),
	_feat_name VARCHAR(255),
	_description TEXT,
	_is_custom BOOLEAN,
	_rank INT
) RETURNS BIGINT AS $$
DECLARE
	ret_id BIGINT;
BEGIN
	IF EXISTS (
		SELECT FROM private.trainers t
			WHERE t.write_key = _write_key
	) THEN
		INSERT INTO private.trainer_feats (
			trainer_id,
			feat_name,
			description,
			is_custom,
			rank
		) VALUES (
			(SELECT id FROM private.trainers t WHERE t.write_key = _write_key),
			_feat_name,
			_description,
			_is_custom,
			_rank
		) RETURNING id INTO ret_id;
	END IF;

	RETURN ret_id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_trainer_feat(
	_write_key VARCHAR(32),
	_id BIGINT,
	_feat_name VARCHAR(255),
	_description TEXT,
	_is_custom BOOLEAN,
	_rank INT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	UPDATE private.trainer_feats i SET
		feat_name = _feat_name,
		description = _description,
		is_custom = _is_custom,
		rank = _rank
	FROM
		private.trainers t
	WHERE
		i.id = _id
		AND t.write_key = _write_key;
	
	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION remove_trainer_feat(
	_write_key VARCHAR(32),
	_id BIGINT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	DELETE FROM private.trainer_feats i
	USING
		private.trainers t
	WHERE
		i.id = _id
		AND t.write_key = _write_key
		AND i.trainer_id = t.id;
	
	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_trainer_feats(
	_read_key VARCHAR(32)
) RETURNS SETOF private.trainer_feats AS $$
BEGIN
	RETURN QUERY SELECT *
	FROM private.trainer_feats i
	WHERE i.trainer_id = (SELECT id FROM private.trainers t WHERE t.read_key = _read_key)
	ORDER BY i.rank;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;
