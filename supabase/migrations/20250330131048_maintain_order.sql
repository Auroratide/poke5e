ALTER TABLE private.moves
	ADD COLUMN rank INT NOT NULL DEFAULT 0;

ALTER TABLE private.held_items
	ADD COLUMN rank INT NOT NULL DEFAULT 0;

ALTER TABLE private.inventory_items
	ADD COLUMN rank INT NOT NULL DEFAULT 0;

-- POKEMON MOVES

CREATE OR REPLACE FUNCTION add_move(
	_write_key VARCHAR(32),
	_pokemon_id INT,
	_move_id VARCHAR(255),
	_pp_cur INT,
	_pp_max INT,
	_notes TEXT,
	_rank INT
) RETURNS INT AS $$
DECLARE
	ret_id INT;
BEGIN
	IF EXISTS (
		SELECT FROM private.pokemon p
			INNER JOIN private.trainers t
			ON p.trainer_id = t.id
			WHERE p.id = _pokemon_id AND t.write_key = _write_key
	) THEN
		INSERT INTO private.moves (
			pokemon_id,
			move_id,
			pp_cur,
			pp_max,
			notes,
			rank
		) VALUES (
			_pokemon_id,
			_move_id,
			_pp_cur,
			_pp_max,
			_notes,
			_rank
		) RETURNING id INTO ret_id;
	END IF;

	RETURN ret_id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_move(
	_write_key VARCHAR(32),
	_id BIGINT,
	_move_id VARCHAR(255),
	_pp_cur INT,
	_pp_max INT,
	_notes TEXT,
	_rank INT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	UPDATE private.moves m SET
		move_id = _move_id,
		pp_cur = _pp_cur,
		pp_max = _pp_max,
		notes = _notes,
		rank = _rank
	FROM
		private.pokemon p
		INNER JOIN private.trainers t
		ON t.id = p.trainer_id
	WHERE
		m.id = _id
		AND pokemon_id = p.id
		AND t.write_key = _write_key;
	
	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_moveset(_pokemon_id INT)
RETURNS SETOF private.moves AS $$
BEGIN
	RETURN QUERY SELECT
		*
	FROM private.moves WHERE moves.pokemon_id = _pokemon_id
	ORDER BY rank;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;

-- HELD ITEMS

CREATE OR REPLACE FUNCTION add_held_item(
	_write_key VARCHAR(32),
	_pokemon_id INT,
	_item_id VARCHAR(255),
	_custom_name VARCHAR(255),
	_description TEXT,
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
		INSERT INTO private.held_items (
			pokemon_id,
			item_id,
			custom_name,
			description,
			rank
		) VALUES (
			_pokemon_id,
			_item_id,
			_custom_name,
			_description,
			_rank
		) RETURNING id INTO ret_id;
	END IF;

	RETURN ret_id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_held_item(
	_write_key VARCHAR(32),
	_id BIGINT,
	_item_id VARCHAR(255),
	_custom_name VARCHAR(255),
	_description TEXT,
	_rank INT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	UPDATE private.held_items h SET
		item_id = _item_id,
		custom_name = _custom_name,
		description = _description,
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

CREATE OR REPLACE FUNCTION get_held_items(
	_pokemon_id INT
) RETURNS SETOF private.held_items AS $$
BEGIN
	RETURN QUERY SELECT * FROM private.held_items h WHERE h.pokemon_id = _pokemon_id ORDER BY h.rank;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;

-- INVENTORY

CREATE OR REPLACE FUNCTION add_inventory_item(
	_write_key VARCHAR(32),
	_item_id VARCHAR(255),
	_quantity INT,
	_custom_name VARCHAR(255),
	_description TEXT,
	_rank INT
) RETURNS BIGINT AS $$
DECLARE
	_trainer_id uuid;
	ret_id BIGINT;
BEGIN
	IF EXISTS (
		SELECT FROM private.trainers t
			WHERE t.write_key = _write_key
	) THEN
		SELECT id INTO _trainer_id
			FROM private.trainers t
			WHERE t.write_key = _write_key;

		INSERT INTO private.inventory_items (
			trainer_id,
			item_id,
			quantity,
			custom_name,
			description,
			rank
		) VALUES (
			_trainer_id,
			_item_id,
			_quantity,
			_custom_name,
			_description,
			_rank
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
	_description TEXT,
	_rank INT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	UPDATE private.inventory_items i SET
		item_id = _item_id,
		quantity = _quantity,
		custom_name = _custom_name,
		description = _description,
		rank = _rank
	FROM
		private.trainers t
	WHERE
		i.id = _id
		AND t.write_key = _write_key;
	
	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_inventory_items(
	_read_key VARCHAR(32)
) RETURNS SETOF private.inventory_items AS $$
BEGIN
	RETURN QUERY SELECT *
	FROM private.inventory_items i
	WHERE i.trainer_id = (SELECT id FROM private.trainers t WHERE t.read_key = _read_key)
	ORDER BY i.rank;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;
