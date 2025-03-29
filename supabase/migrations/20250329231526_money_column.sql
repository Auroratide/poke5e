ALTER TABLE private.trainers
	ADD COLUMN money INT NOT NULL DEFAULT 0;

DROP FUNCTION get_trainer;

CREATE OR REPLACE FUNCTION get_trainer(_read_key VARCHAR(32))
RETURNS TABLE (
	id uuid,
	read_key VARCHAR(32),
	name VARCHAR(255),
	description TEXT,
	level INT,
	ac INT,
	hp_cur INT,
	hp_max INT,
	hit_dice_cur INT,
	hit_dice_max INT,
	strength INT,
	dexterity INT,
	constitution INT,
	intelligence INT,
	wisdom INT,
	charisma INT,
	prof_athletics BOOLEAN,
	prof_acrobatics BOOLEAN,
	prof_sleight_of_hand BOOLEAN,
	prof_stealth BOOLEAN,
	prof_arcana BOOLEAN,
	prof_history BOOLEAN,
	prof_investigation BOOLEAN,
	prof_nature BOOLEAN,
	prof_religion BOOLEAN,
	prof_animal_handling BOOLEAN,
	prof_insight BOOLEAN,
	prof_medicine BOOLEAN,
	prof_perception BOOLEAN,
	prof_survival BOOLEAN,
	prof_deception BOOLEAN,
	prof_intimidation BOOLEAN,
	prof_performance BOOLEAN,
	prof_persuasion BOOLEAN,
	save_str BOOLEAN,
	save_dex BOOLEAN,
	save_con BOOLEAN,
	save_int BOOLEAN,
	save_wis BOOLEAN,
	save_cha BOOLEAN,
	species VARCHAR(255),
	gender VARCHAR(255),
	age INT,
	home_region VARCHAR(255),
	background VARCHAR(255),
	avatar_filename VARCHAR(255),
	money INT
) AS $$
BEGIN
	RETURN QUERY SELECT
		trainers.id,
		trainers.read_key,
		trainers.name,
		trainers.description,
		trainers.level,
		trainers.ac,
		trainers.hp_cur,
		trainers.hp_max,
		trainers.hit_dice_cur,
		trainers.hit_dice_max,
		trainers.strength,
		trainers.dexterity,
		trainers.constitution,
		trainers.intelligence,
		trainers.wisdom,
		trainers.charisma,
		trainers.prof_athletics,
		trainers.prof_acrobatics,
		trainers.prof_sleight_of_hand,
		trainers.prof_stealth,
		trainers.prof_arcana,
		trainers.prof_history,
		trainers.prof_investigation,
		trainers.prof_nature,
		trainers.prof_religion,
		trainers.prof_animal_handling,
		trainers.prof_insight,
		trainers.prof_medicine,
		trainers.prof_perception,
		trainers.prof_survival,
		trainers.prof_deception,
		trainers.prof_intimidation,
		trainers.prof_performance,
		trainers.prof_persuasion,
		trainers.save_str,
		trainers.save_dex,
		trainers.save_con,
		trainers.save_int,
		trainers.save_wis,
		trainers.save_cha,
		trainers.species,
		trainers.gender,
		trainers.age,
		trainers.home_region,
		trainers.background,
		trainers.avatar_filename,
		trainers.money
	FROM private.trainers WHERE trainers.read_key = _read_key;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION new_trainer(
	_name VARCHAR(255),
	_description TEXT,
	_level INT,
	_ac INT,
	_hp_cur INT,
	_hp_max INT,
	_hit_dice_cur INT,
	_hit_dice_max INT,
	_strength INT,
	_dexterity INT,
	_constitution INT,
	_intelligence INT,
	_wisdom INT,
	_charisma INT,
	_prof_athletics BOOLEAN,
	_prof_acrobatics BOOLEAN,
	_prof_sleight_of_hand BOOLEAN,
	_prof_stealth BOOLEAN,
	_prof_arcana BOOLEAN,
	_prof_history BOOLEAN,
	_prof_investigation BOOLEAN,
	_prof_nature BOOLEAN,
	_prof_religion BOOLEAN,
	_prof_animal_handling BOOLEAN,
	_prof_insight BOOLEAN,
	_prof_medicine BOOLEAN,
	_prof_perception BOOLEAN,
	_prof_survival BOOLEAN,
	_prof_deception BOOLEAN,
	_prof_intimidation BOOLEAN,
	_prof_performance BOOLEAN,
	_prof_persuasion BOOLEAN,
	_save_str BOOLEAN,
	_save_dex BOOLEAN,
	_save_con BOOLEAN,
	_save_int BOOLEAN,
	_save_wis BOOLEAN,
	_save_cha BOOLEAN,
	_species VARCHAR(255),
	_gender VARCHAR(255),
	_age INT,
	_home_region VARCHAR(255),
	_background VARCHAR(255),
	_money INT,
	OUT ret_id uuid,
	OUT ret_read_key VARCHAR(32),
	OUT ret_write_key VARCHAR(32)
) AS $$
BEGIN
	INSERT INTO private.trainers (
		name,
		description,
		level,
		ac,
		hp_cur,
		hp_max,
		hit_dice_cur,
		hit_dice_max,
		strength,
		dexterity,
		constitution,
		intelligence,
		wisdom,
		charisma,
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
		species,
		gender,
		age,
		home_region,
		background,
		money
	) VALUES (
		_name,
		_description,
		_level,
		_ac,
		_hp_cur,
		_hp_max,
		_hit_dice_cur,
		_hit_dice_max,
		_strength,
		_dexterity,
		_constitution,
		_intelligence,
		_wisdom,
		_charisma,
		_prof_athletics,
		_prof_acrobatics,
		_prof_sleight_of_hand,
		_prof_stealth,
		_prof_arcana,
		_prof_history,
		_prof_investigation,
		_prof_nature,
		_prof_religion,
		_prof_animal_handling,
		_prof_insight,
		_prof_medicine,
		_prof_perception,
		_prof_survival,
		_prof_deception,
		_prof_intimidation,
		_prof_performance,
		_prof_persuasion,
		_save_str,
		_save_dex,
		_save_con,
		_save_int,
		_save_wis,
		_save_cha,
		_species,
		_gender,
		_age,
		_home_region,
		_background,
		_money
	) RETURNING id, read_key, write_key INTO ret_id, ret_read_key, ret_write_key;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_trainer(
	_write_key VARCHAR(32),
	_name VARCHAR(255),
	_description TEXT,
	_level INT,
	_ac INT,
	_hp_cur INT,
	_hp_max INT,
	_hit_dice_cur INT,
	_hit_dice_max INT,
	_strength INT,
	_dexterity INT,
	_constitution INT,
	_intelligence INT,
	_wisdom INT,
	_charisma INT,
	_prof_athletics BOOLEAN,
	_prof_acrobatics BOOLEAN,
	_prof_sleight_of_hand BOOLEAN,
	_prof_stealth BOOLEAN,
	_prof_arcana BOOLEAN,
	_prof_history BOOLEAN,
	_prof_investigation BOOLEAN,
	_prof_nature BOOLEAN,
	_prof_religion BOOLEAN,
	_prof_animal_handling BOOLEAN,
	_prof_insight BOOLEAN,
	_prof_medicine BOOLEAN,
	_prof_perception BOOLEAN,
	_prof_survival BOOLEAN,
	_prof_deception BOOLEAN,
	_prof_intimidation BOOLEAN,
	_prof_performance BOOLEAN,
	_prof_persuasion BOOLEAN,
	_save_str BOOLEAN,
	_save_dex BOOLEAN,
	_save_con BOOLEAN,
	_save_int BOOLEAN,
	_save_wis BOOLEAN,
	_save_cha BOOLEAN,
	_species VARCHAR(255),
	_gender VARCHAR(255),
	_age INT,
	_home_region VARCHAR(255),
	_background VARCHAR(255),
	_money INT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	UPDATE private.trainers SET
		name = _name,
		description = _description,
		level = _level,
		ac = _ac,
		hp_cur = _hp_cur,
		hp_max = _hp_max,
		hit_dice_cur = _hit_dice_cur,
		hit_dice_max = _hit_dice_max,
		strength = _strength,
		dexterity = _dexterity,
		constitution = _constitution,
		intelligence = _intelligence,
		wisdom = _wisdom,
		charisma = _charisma,
		prof_athletics = _prof_athletics,
		prof_acrobatics = _prof_acrobatics,
		prof_sleight_of_hand = _prof_sleight_of_hand,
		prof_stealth = _prof_stealth,
		prof_arcana = _prof_arcana,
		prof_history = _prof_history,
		prof_investigation = _prof_investigation,
		prof_nature = _prof_nature,
		prof_religion = _prof_religion,
		prof_animal_handling = _prof_animal_handling,
		prof_insight = _prof_insight,
		prof_medicine = _prof_medicine,
		prof_perception = _prof_perception,
		prof_survival = _prof_survival,
		prof_deception = _prof_deception,
		prof_intimidation = _prof_intimidation,
		prof_performance = _prof_performance,
		prof_persuasion = _prof_persuasion,
		save_str = _save_str,
		save_dex = _save_dex,
		save_con = _save_con,
		save_int = _save_int,
		save_wis = _save_wis,
		save_cha = _save_cha,
		species = _species,
		gender = _gender,
		age = _age,
		home_region = _home_region,
		background = _background,
		money = _money
	WHERE
		write_key = _write_key;
	
	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;
