ALTER TABLE private.pokemon
	ADD COLUMN rank INT NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION add_pokemon(
	_write_key VARCHAR(32),
	_nickname VARCHAR(255),
	_species VARCHAR(255),
	_type VARCHAR(255)[],
	_nature VARCHAR(255),
	_level INT,
	_gender VARCHAR(255),
	_strength INT,
	_dexterity INT,
	_constitution INT,
	_intelligence INT,
	_wisdom INT,
	_charisma INT,
	_ac INT,
	_hp_cur INT,
	_hp_max INT,
	_hit_dice_cur INT,
	_hit_dice_max INT,
	_save_str BOOLEAN,
	_save_dex BOOLEAN,
	_save_con BOOLEAN,
	_save_int BOOLEAN,
	_save_wis BOOLEAN,
	_save_cha BOOLEAN,
	_ability VARCHAR(255),
	_notes TEXT,
	_tera_type VARCHAR(255),
	_exp INT,
	_status VARCHAR(255),
	_held_item VARCHAR(255),
	_is_shiny BOOLEAN,
	_custom_size VARCHAR(255),
	_hit_dice_size VARCHAR(4),
	_speed_walking INT,
	_speed_climbing INT,
	_speed_swimming INT,
	_speed_flying INT,
	_speed_hover INT,
	_speed_burrowing INT,
	_sense_darkvision INT,
	_sense_blindsight INT,
	_sense_tremorsense INT,
	_sense_truesight INT,
	_bond_level INT,
	_bond_points_cur INT,
	_bond_points_max INT,
	_rank_athletics INT,
	_rank_acrobatics INT,
	_rank_sleight_of_hand INT,
	_rank_stealth INT,
	_rank_arcana INT,
	_rank_history INT,
	_rank_investigation INT,
	_rank_nature INT,
	_rank_religion INT,
	_rank_animal_handling INT,
	_rank_insight INT,
	_rank_medicine INT,
	_rank_perception INT,
	_rank_survival INT,
	_rank_deception INT,
	_rank_intimidation INT,
	_rank_performance INT,
	_rank_persuasion INT,
	_rank INT
) RETURNS INT AS $$
DECLARE ret_id INT;
BEGIN
	INSERT INTO private.pokemon (
		trainer_id,
		nickname,
		species,
		type,
		nature,
		level,
		gender,
		strength,
		dexterity,
		constitution,
		intelligence,
		wisdom,
		charisma,
		ac,
		hp_cur,
		hp_max,
		hit_dice_cur,
		hit_dice_max,
		prof_athletics,
		prof_acrobatics,
		prof_sleight_of_hand,
		prof_stealth,
		prof_arcana,
		prof_history,
		prof_investigation,
		prof_nature,
		prof_religion,
		prof_animal_handling,
		prof_insight,
		prof_medicine,
		prof_perception,
		prof_survival,
		prof_deception,
		prof_intimidation,
		prof_performance,
		prof_persuasion,
		save_str,
		save_dex,
		save_con,
		save_int,
		save_wis,
		save_cha,
		ability,
		notes,
		tera_type,
		exp,
		status,
		held_item,
		is_shiny,
		custom_size,
		hit_dice_size,
		speed_walking,
		speed_climbing,
		speed_swimming,
		speed_flying,
		speed_hover,
		speed_burrowing,
		sense_darkvision,
		sense_blindsight,
		sense_tremorsense,
		sense_truesight,
		bond_level,
		bond_points_cur,
		bond_points_max,
		rank_athletics,
		rank_acrobatics,
		rank_sleight_of_hand,
		rank_stealth,
		rank_arcana,
		rank_history,
		rank_investigation,
		rank_nature,
		rank_religion,
		rank_animal_handling,
		rank_insight,
		rank_medicine,
		rank_perception,
		rank_survival,
		rank_deception,
		rank_intimidation,
		rank_performance,
		rank_persuasion,
		rank
	) VALUES (
		(SELECT id FROM private.trainers WHERE write_key = _write_key),
		_nickname,
		_species,
		_type,
		_nature,
		_level,
		_gender,
		_strength,
		_dexterity,
		_constitution,
		_intelligence,
		_wisdom,
		_charisma,
		_ac,
		_hp_cur,
		_hp_max,
		_hit_dice_cur,
		_hit_dice_max,
		_rank_athletics > 0,
		_rank_acrobatics > 0,
		_rank_sleight_of_hand > 0,
		_rank_stealth > 0,
		_rank_arcana > 0,
		_rank_history > 0,
		_rank_investigation > 0,
		_rank_nature > 0,
		_rank_religion > 0,
		_rank_animal_handling > 0,
		_rank_insight > 0,
		_rank_medicine > 0,
		_rank_perception > 0,
		_rank_survival > 0,
		_rank_deception > 0,
		_rank_intimidation > 0,
		_rank_performance > 0,
		_rank_persuasion > 0,
		_save_str,
		_save_dex,
		_save_con,
		_save_int,
		_save_wis,
		_save_cha,
		_ability,
		_notes,
		_tera_type,
		_exp,
		_status,
		_held_item,
		_is_shiny,
		_custom_size,
		_hit_dice_size,
		_speed_walking,
		_speed_climbing,
		_speed_swimming,
		_speed_flying,
		_speed_hover,
		_speed_burrowing,
		_sense_darkvision,
		_sense_blindsight,
		_sense_tremorsense,
		_sense_truesight,
		_bond_level,
		_bond_points_cur,
		_bond_points_max,
		_rank_athletics,
		_rank_acrobatics,
		_rank_sleight_of_hand,
		_rank_stealth,
		_rank_arcana,
		_rank_history,
		_rank_investigation,
		_rank_nature,
		_rank_religion,
		_rank_animal_handling,
		_rank_insight,
		_rank_medicine,
		_rank_perception,
		_rank_survival,
		_rank_deception,
		_rank_intimidation,
		_rank_performance,
		_rank_persuasion,
		_rank
	) RETURNING id INTO ret_id;

	RETURN ret_id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

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

	-- Reassign ranks based on array position (1-indexed)
	UPDATE private.pokemon
	SET rank = position.rank
	FROM (
		SELECT UNNEST(_ids) AS id, GENERATE_SUBSCRIPTS(_ids, 1) AS rank
	) AS position
	WHERE pokemon.id = position.id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_pokemon(
	_trainer_id UUID
) RETURNS SETOF private.pokemon AS $$
BEGIN
	RETURN QUERY SELECT
		*
	FROM private.pokemon p WHERE p.trainer_id = _trainer_id
	ORDER BY p.rank, p.nickname;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;
