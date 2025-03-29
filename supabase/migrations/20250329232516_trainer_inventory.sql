CREATE TABLE private.inventory_items (
	id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	trainer_id uuid REFERENCES private.trainers(id) ON DELETE CASCADE,
	item_id VARCHAR(255),
	quantity INT NOT NULL DEFAULT 0,
	custom_name VARCHAR(255),
	description TEXT
);

CREATE OR REPLACE FUNCTION add_inventory_item(
	_write_key VARCHAR(32),
	_item_id VARCHAR(255),
	_quantity INT,
	_custom_name VARCHAR(255),
	_description TEXT
) RETURNS BIGINT AS $$
DECLARE
	ret_id BIGINT;
BEGIN
	IF EXISTS (
		SELECT FROM private.trainers t
			WHERE t.write_key = _write_key
	) THEN
		INSERT INTO private.inventory_items (
			trainer_id,
			item_id,
			quantity,
			custom_name,
			description
		) VALUES (
			(SELECT id FROM private.trainers t WHERE t.write_key = _write_key),
			_item_id,
			_quantity,
			_custom_name,
			_description
		) RETURNING id INTO ret_id;
	END IF;

	RETURN ret_id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_inventory_item(
	_write_key VARCHAR(32),
	_id BIGINT,
	_item_id VARCHAR(255),
	_quantity INT,
	_custom_name VARCHAR(255),
	_description TEXT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	UPDATE private.inventory_items i SET
		item_id = _item_id,
		quantity = _quantity,
		custom_name = _custom_name,
		description = _description
	FROM
		private.trainers t
	WHERE
		i.id = _id
		AND t.write_key = _write_key;
	
	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION remove_inventory_item(
	_write_key VARCHAR(32),
	_id BIGINT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	DELETE FROM private.inventory_items i
	USING
		private.trainers t
	WHERE
		i.id = _id
		AND t.write_key = _write_key
		AND i.trainer_id = t.id;
	
	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_inventory_items(
	_read_key VARCHAR(32)
) RETURNS SETOF private.inventory_items AS $$
BEGIN
	RETURN QUERY SELECT *
	FROM private.inventory_items i
	WHERE i.trainer_id = (SELECT id FROM private.trainers t WHERE t.read_key = _read_key);
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;
