CREATE TABLE private.held_items (
	id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	pokemon_id INT REFERENCES private.pokemon(id) ON DELETE CASCADE,
	item_id VARCHAR(255),
	custom_name VARCHAR(255),
	description TEXT
);

CREATE OR REPLACE FUNCTION add_held_item(
	_write_key VARCHAR(32),
	_pokemon_id INT,
	_item_id VARCHAR(255),
	_custom_name VARCHAR(255),
	_description TEXT
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
		INSERT INTO private.held_items (
			pokemon_id,
			item_id,
			custom_name,
			description
		) VALUES (
			_pokemon_id,
			_item_id,
			_custom_name,
			_description
		) RETURNING id INTO ret_id;
	END IF;

	RETURN ret_id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_held_item(
	_write_key VARCHAR(32),
	_id BIGINT,
	_item_id VARCHAR(255),
	_custom_name VARCHAR(255),
	_description TEXT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	UPDATE private.held_items h SET
		item_id = _item_id,
		custom_name = _custom_name,
		description = _description
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

CREATE OR REPLACE FUNCTION remove_held_item(
	_write_key VARCHAR(32),
	_id BIGINT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	DELETE FROM private.held_items h
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

CREATE OR REPLACE FUNCTION get_held_items(
	_pokemon_id INT
) RETURNS SETOF private.held_items AS $$
BEGIN
	RETURN QUERY SELECT * FROM private.held_items h WHERE h.pokemon_id = _pokemon_id;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;
