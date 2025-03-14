ALTER TABLE private.trainers
	ADD COLUMN avatar_filename VARCHAR(255);

CREATE FUNCTION new_trainer_avatar_filename(
	_write_key VARCHAR(32),
	_extension VARCHAR(32)
) RETURNS VARCHAR(255) AS $$
DECLARE
	_uuid uuid;
	_filename VARCHAR(255);
BEGIN
	_uuid := uuid_generate_v4();
	_filename := _uuid || _extension;

	UPDATE private.trainers
		SET avatar_filename = _filename
		WHERE _write_key = write_key;

	RETURN _filename;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE FUNCTION remove_trainer_avatar(
	_write_key VARCHAR(32)
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	UPDATE private.trainers
		SET avatar_filename = null
		WHERE _write_key = write_key;

	GET DIAGNOSTICS affected_rows := ROW_COUNT;
	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

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
	avatar_filename VARCHAR(255)
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
		trainers.avatar_filename
	FROM private.trainers WHERE trainers.read_key = _read_key;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;
