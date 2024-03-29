CREATE OR REPLACE FUNCTION add_pokemon(
    _write_key VARCHAR(32),
    _nickname VARCHAR(255),
    _species VARCHAR(255),
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
    _ability VARCHAR(255),
    _notes TEXT
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
        notes
    ) VALUES (
        (SELECT id FROM private.trainers WHERE write_key = _write_key),
        _nickname,
        _species,
        (SELECT COALESCE(type, ARRAY[]::VARCHAR(255)[]) FROM private.species_info s WHERE _species = s.id),
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
        _ability,
        _notes
    ) RETURNING id INTO ret_id;

    RETURN ret_id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;