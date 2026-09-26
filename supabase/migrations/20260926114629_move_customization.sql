ALTER TABLE private.moves
	ADD COLUMN to_hit_modifier INT DEFAULT 0,
	ADD COLUMN damage_modifier INT DEFAULT 0,
	ADD COLUMN save_dc_modifier INT DEFAULT 0,
	ADD COLUMN custom_type VARCHAR(255),
	ADD COLUMN custom_powers VARCHAR(8)[],
	ADD COLUMN custom_time VARCHAR(255),
	ADD COLUMN custom_duration_type VARCHAR(255),
	ADD COLUMN custom_duration_unit VARCHAR(255),
	ADD COLUMN custom_duration_value INT,
	ADD COLUMN custom_concentration BOOLEAN,
	ADD COLUMN custom_range_type VARCHAR(255),
	ADD COLUMN custom_range_value INT;

CREATE OR REPLACE FUNCTION add_move(
	_write_key VARCHAR(32),
	_pokemon_id INT,
	_move_id VARCHAR(255),
	_pp_cur INT,
	_pp_max INT,
	_notes TEXT,
	_rank INT,
	_to_hit_modifier INT,
	_damage_modifier INT,
	_save_dc_modifier INT,
	_custom_type VARCHAR(255),
	_custom_powers VARCHAR(8)[],
	_custom_time VARCHAR(255),
	_custom_duration_type VARCHAR(255),
	_custom_duration_unit VARCHAR(255),
	_custom_duration_value INT,
	_custom_concentration BOOLEAN,
	_custom_range_type VARCHAR(255),
	_custom_range_value INT
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
			rank,
			to_hit_modifier,
			damage_modifier,
			save_dc_modifier,
			custom_type,
			custom_powers,
			custom_time,
			custom_duration_type,
			custom_duration_unit,
			custom_duration_value,
			custom_concentration,
			custom_range_type,
			custom_range_value
		) VALUES (
			_pokemon_id,
			_move_id,
			_pp_cur,
			_pp_max,
			_notes,
			_rank,
			_to_hit_modifier,
			_damage_modifier,
			_save_dc_modifier,
			_custom_type,
			_custom_powers,
			_custom_time,
			_custom_duration_type,
			_custom_duration_unit,
			_custom_duration_value,
			_custom_concentration,
			_custom_range_type,
			_custom_range_value
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
	_rank INT,
	_to_hit_modifier INT,
	_damage_modifier INT,
	_save_dc_modifier INT,
	_custom_type VARCHAR(255),
	_custom_powers VARCHAR(8)[],
	_custom_time VARCHAR(255),
	_custom_duration_type VARCHAR(255),
	_custom_duration_unit VARCHAR(255),
	_custom_duration_value INT,
	_custom_concentration BOOLEAN,
	_custom_range_type VARCHAR(255),
	_custom_range_value INT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	UPDATE private.moves m SET
		move_id = _move_id,
		pp_cur = _pp_cur,
		pp_max = _pp_max,
		notes = _notes,
		rank = _rank,
		to_hit_modifier = _to_hit_modifier,
		damage_modifier = _damage_modifier,
		save_dc_modifier = _save_dc_modifier,
		custom_type = _custom_type,
		custom_powers = _custom_powers,
		custom_time = _custom_time,
		custom_duration_type = _custom_duration_type,
		custom_duration_unit = _custom_duration_unit,
		custom_duration_value = _custom_duration_value,
		custom_concentration = _custom_concentration,
		custom_range_type = _custom_range_type,
		custom_range_value = _custom_range_value
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