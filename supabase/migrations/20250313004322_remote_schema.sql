

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium";






CREATE SCHEMA IF NOT EXISTS "private";


ALTER SCHEMA "private" OWNER TO "postgres";




ALTER SCHEMA "public" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."add_move"("_write_key" character varying, "_pokemon_id" integer, "_move_id" character varying, "_pp_cur" integer, "_pp_max" integer, "_notes" "text") RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE ret_id INT;
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
            notes
        ) VALUES (
            _pokemon_id,
            _move_id,
            _pp_cur,
            _pp_max,
            _notes
        ) RETURNING id INTO ret_id;
    END IF;

    RETURN ret_id;
END $$;


ALTER FUNCTION "public"."add_move"("_write_key" character varying, "_pokemon_id" integer, "_move_id" character varying, "_pp_cur" integer, "_pp_max" integer, "_notes" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean) RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE ret_id INT;
BEGIN
    INSERT INTO private.pokemon (
        trainer_id,
        nickname,
        species,
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
        save_cha
    ) VALUES (
        (SELECT id FROM private.trainers WHERE write_key = _write_key),
        _nickname,
        _species,
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
        _save_cha
    ) RETURNING id INTO ret_id;

    RETURN ret_id;
END $$;


ALTER FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying) RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE ret_id INT;
BEGIN
    INSERT INTO private.pokemon (
        trainer_id,
        nickname,
        species,
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
        ability
    ) VALUES (
        (SELECT id FROM private.trainers WHERE write_key = _write_key),
        _nickname,
        _species,
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
        _ability
    ) RETURNING id INTO ret_id;

    RETURN ret_id;
END $$;


ALTER FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
END $$;


ALTER FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
END $$;


ALTER FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying) RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
		held_item
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
		_notes,
		_tera_type,
		_exp,
		_status,
		_held_item
	) RETURNING id INTO ret_id;

	RETURN ret_id;
END $$;


ALTER FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying, "_is_shiny" boolean) RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
		is_shiny
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
		_notes,
		_tera_type,
		_exp,
		_status,
		_held_item,
		_is_shiny
	) RETURNING id INTO ret_id;

	RETURN ret_id;
END $$;


ALTER FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying, "_is_shiny" boolean) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."create_pageview_event"("_path" character varying) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
	INSERT INTO private.pageview_events (
		path
	) VALUES (
		_path
	);
END $$;


ALTER FUNCTION "public"."create_pageview_event"("_path" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_trainer"("_write_key" character varying, "_id" "uuid") RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE affected_rows INT;
BEGIN
    DELETE FROM private.trainers
    WHERE
        id = _id
        AND write_key = _write_key;
    
    GET DIAGNOSTICS affected_rows := ROW_COUNT;

    RETURN affected_rows;
END $$;


ALTER FUNCTION "public"."delete_trainer"("_write_key" character varying, "_id" "uuid") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "private"."moves" (
    "id" bigint NOT NULL,
    "pokemon_id" integer NOT NULL,
    "move_id" character varying(255) NOT NULL,
    "pp_cur" integer NOT NULL,
    "pp_max" integer NOT NULL,
    "notes" "text"
);


ALTER TABLE "private"."moves" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_moveset"("_pokemon_id" integer) RETURNS SETOF "private"."moves"
    LANGUAGE "plpgsql" STABLE SECURITY DEFINER
    AS $$
BEGIN
    RETURN QUERY SELECT
        *
    FROM private.moves WHERE moves.pokemon_id = _pokemon_id;
END $$;


ALTER FUNCTION "public"."get_moveset"("_pokemon_id" integer) OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "private"."pokemon" (
    "id" integer NOT NULL,
    "trainer_id" "uuid" NOT NULL,
    "species" character varying(255) NOT NULL,
    "nickname" character varying(255) NOT NULL,
    "nature" character varying(255) NOT NULL,
    "level" integer NOT NULL,
    "gender" character varying(255) NOT NULL,
    "strength" integer NOT NULL,
    "dexterity" integer NOT NULL,
    "constitution" integer NOT NULL,
    "intelligence" integer NOT NULL,
    "wisdom" integer NOT NULL,
    "charisma" integer NOT NULL,
    "ac" integer NOT NULL,
    "hp_cur" integer NOT NULL,
    "hp_max" integer NOT NULL,
    "hit_dice_cur" integer NOT NULL,
    "hit_dice_max" integer NOT NULL,
    "prof_athletics" boolean NOT NULL,
    "prof_acrobatics" boolean NOT NULL,
    "prof_sleight_of_hand" boolean NOT NULL,
    "prof_stealth" boolean NOT NULL,
    "prof_arcana" boolean NOT NULL,
    "prof_history" boolean NOT NULL,
    "prof_investigation" boolean NOT NULL,
    "prof_nature" boolean NOT NULL,
    "prof_religion" boolean NOT NULL,
    "prof_animal_handling" boolean NOT NULL,
    "prof_insight" boolean NOT NULL,
    "prof_medicine" boolean NOT NULL,
    "prof_perception" boolean NOT NULL,
    "prof_survival" boolean NOT NULL,
    "prof_deception" boolean NOT NULL,
    "prof_intimidation" boolean NOT NULL,
    "prof_performance" boolean NOT NULL,
    "prof_persuasion" boolean NOT NULL,
    "save_str" boolean NOT NULL,
    "save_dex" boolean NOT NULL,
    "save_con" boolean NOT NULL,
    "save_int" boolean NOT NULL,
    "save_wis" boolean NOT NULL,
    "save_cha" boolean NOT NULL,
    "ability" character varying(255) DEFAULT ''::character varying NOT NULL,
    "notes" "text" DEFAULT ''::"text" NOT NULL,
    "type" character varying(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[] NOT NULL,
    "tera_type" character varying(255) DEFAULT ''::character varying NOT NULL,
    "exp" integer DEFAULT 0 NOT NULL,
    "status" character varying(255),
    "held_item" character varying(255),
    "is_shiny" boolean DEFAULT false NOT NULL
);


ALTER TABLE "private"."pokemon" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_pokemon"("_trainer_id" "uuid") RETURNS SETOF "private"."pokemon"
    LANGUAGE "plpgsql" STABLE SECURITY DEFINER
    AS $$
BEGIN
	RETURN QUERY SELECT
		*
	FROM private.pokemon WHERE pokemon.trainer_id = _trainer_id;
END $$;


ALTER FUNCTION "public"."get_pokemon"("_trainer_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_trainer"("_read_key" character varying) RETURNS TABLE("id" "uuid", "read_key" character varying, "name" character varying, "description" "text", "level" integer, "ac" integer, "hp_cur" integer, "hp_max" integer, "hit_dice_cur" integer, "hit_dice_max" integer, "strength" integer, "dexterity" integer, "constitution" integer, "intelligence" integer, "wisdom" integer, "charisma" integer, "prof_athletics" boolean, "prof_acrobatics" boolean, "prof_sleight_of_hand" boolean, "prof_stealth" boolean, "prof_arcana" boolean, "prof_history" boolean, "prof_investigation" boolean, "prof_nature" boolean, "prof_religion" boolean, "prof_animal_handling" boolean, "prof_insight" boolean, "prof_medicine" boolean, "prof_perception" boolean, "prof_survival" boolean, "prof_deception" boolean, "prof_intimidation" boolean, "prof_performance" boolean, "prof_persuasion" boolean, "save_str" boolean, "save_dex" boolean, "save_con" boolean, "save_int" boolean, "save_wis" boolean, "save_cha" boolean)
    LANGUAGE "plpgsql" STABLE SECURITY DEFINER
    AS $$
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
		trainers.save_cha
	FROM private.trainers WHERE trainers.read_key = _read_key;
END $$;


ALTER FUNCTION "public"."get_trainer"("_read_key" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."install_available_extensions_and_test"() RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
DECLARE extension_name TEXT;
allowed_extentions TEXT[] := string_to_array(current_setting('supautils.privileged_extensions'), ',');
BEGIN 
  FOREACH extension_name IN ARRAY allowed_extentions 
  LOOP
    SELECT trim(extension_name) INTO extension_name;
    /* skip below extensions check for now */
    CONTINUE WHEN extension_name = 'pgroonga' OR  extension_name = 'pgroonga_database' OR extension_name = 'pgsodium';
    CONTINUE WHEN extension_name = 'plpgsql' OR  extension_name = 'plpgsql_check' OR extension_name = 'pgtap';
    CONTINUE WHEN extension_name = 'supabase_vault' OR extension_name = 'wrappers';
    RAISE notice 'START TEST FOR: %', extension_name;
    EXECUTE format('DROP EXTENSION IF EXISTS %s CASCADE', quote_ident(extension_name));
    EXECUTE format('CREATE EXTENSION %s CASCADE', quote_ident(extension_name));
    RAISE notice 'END TEST FOR: %', extension_name;
  END LOOP;
    RAISE notice 'EXTENSION TESTS COMPLETED..';
    return true;
END;
$$;


ALTER FUNCTION "public"."install_available_extensions_and_test"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."nanoid"("size" integer DEFAULT 21) RETURNS "text"
    LANGUAGE "plpgsql" STABLE
    AS $$




DECLARE
    id text := '';
    i int := 0;
    urlAlphabet char(32) := '0123456789BCDEFGHJKMNPQRSTUVWXYZ';
    bytes bytea := gen_random_bytes(size);
    byte int;
    pos int;
BEGIN
    WHILE i < size LOOP
        byte := get_byte(bytes, i);
        pos := (byte & 31) + 1;
        id := id || substr(urlAlphabet, pos, 1);
        i = i + 1;
    END LOOP;
    RETURN id;
END
$$;


ALTER FUNCTION "public"."nanoid"("size" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."new_trainer"("_name" character varying, "_description" "text", OUT "ret_id" "uuid", OUT "ret_read_key" character varying, OUT "ret_write_key" character varying) RETURNS "record"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    INSERT INTO private.trainers (
        name,
        description
    ) VALUES (
        _name,
        _description
    ) RETURNING id, read_key, write_key INTO ret_id, ret_read_key, ret_write_key;
END $$;


ALTER FUNCTION "public"."new_trainer"("_name" character varying, "_description" "text", OUT "ret_id" "uuid", OUT "ret_read_key" character varying, OUT "ret_write_key" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."new_trainer"("_name" character varying, "_description" "text", "_level" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, OUT "ret_id" "uuid", OUT "ret_read_key" character varying, OUT "ret_write_key" character varying) RETURNS "record"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
		save_cha
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
		_save_cha
	) RETURNING id, read_key, write_key INTO ret_id, ret_read_key, ret_write_key;
END $$;


ALTER FUNCTION "public"."new_trainer"("_name" character varying, "_description" "text", "_level" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, OUT "ret_id" "uuid", OUT "ret_read_key" character varying, OUT "ret_write_key" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."remove_move"("_write_key" character varying, "_id" bigint) RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE affected_rows INT;
BEGIN
    DELETE FROM private.moves m
    USING
        private.pokemon p,
        private.trainers t
    WHERE
        m.id = _id
        AND m.pokemon_id = p.id
        AND p.trainer_id = t.id
        AND t.write_key = _write_key;
    
    GET DIAGNOSTICS affected_rows := ROW_COUNT;

    RETURN affected_rows;
END $$;


ALTER FUNCTION "public"."remove_move"("_write_key" character varying, "_id" bigint) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."remove_pokemon"("_write_key" character varying, "_id" bigint) RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE affected_rows INT;
BEGIN
    DELETE FROM private.pokemon p
    USING
        private.trainers t
    WHERE
        p.id = _id
        AND p.trainer_id = t.id
        AND t.write_key = _write_key;
    
    GET DIAGNOSTICS affected_rows := ROW_COUNT;

    RETURN affected_rows;
END $$;


ALTER FUNCTION "public"."remove_pokemon"("_write_key" character varying, "_id" bigint) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_move"("_write_key" character varying, "_id" bigint, "_move_id" character varying, "_pp_cur" integer, "_pp_max" integer, "_notes" "text") RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE affected_rows INT;
BEGIN
    UPDATE private.moves m SET
        move_id = _move_id,
        pp_cur = _pp_cur,
        pp_max = _pp_max,
        notes = _notes
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
END $$;


ALTER FUNCTION "public"."update_move"("_write_key" character varying, "_id" bigint, "_move_id" character varying, "_pp_cur" integer, "_pp_max" integer, "_notes" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean) RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE affected_rows INT;
BEGIN
    UPDATE private.pokemon p SET
        species = _species,
        nickname = _nickname,
        nature = _nature,
        level = _level,
        gender = _gender,
        strength = _strength,
        dexterity = _dexterity,
        constitution = _constitution,
        intelligence = _intelligence,
        wisdom = _wisdom,
        charisma = _charisma,
        ac = _ac,
        hp_cur = _hp_cur,
        hp_max = _hp_max,
        hit_dice_cur = _hit_dice_cur,
        hit_dice_max = _hit_dice_max,
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
        save_cha = _save_cha
    FROM private.trainers t
    WHERE
        p.id = _id
        AND trainer_id = t.id
        AND t.write_key = _write_key;
    
    GET DIAGNOSTICS affected_rows := ROW_COUNT;

    RETURN affected_rows;
END $$;


ALTER FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying) RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE affected_rows INT;
BEGIN
    UPDATE private.pokemon p SET
        species = _species,
        nickname = _nickname,
        nature = _nature,
        level = _level,
        gender = _gender,
        strength = _strength,
        dexterity = _dexterity,
        constitution = _constitution,
        intelligence = _intelligence,
        wisdom = _wisdom,
        charisma = _charisma,
        ac = _ac,
        hp_cur = _hp_cur,
        hp_max = _hp_max,
        hit_dice_cur = _hit_dice_cur,
        hit_dice_max = _hit_dice_max,
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
        ability = _ability
    FROM private.trainers t
    WHERE
        p.id = _id
        AND trainer_id = t.id
        AND t.write_key = _write_key;
    
    GET DIAGNOSTICS affected_rows := ROW_COUNT;

    RETURN affected_rows;
END $$;


ALTER FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE affected_rows INT;
BEGIN
    UPDATE private.pokemon p SET
        species = _species,
        nickname = _nickname,
        nature = _nature,
        level = _level,
        gender = _gender,
        strength = _strength,
        dexterity = _dexterity,
        constitution = _constitution,
        intelligence = _intelligence,
        wisdom = _wisdom,
        charisma = _charisma,
        ac = _ac,
        hp_cur = _hp_cur,
        hp_max = _hp_max,
        hit_dice_cur = _hit_dice_cur,
        hit_dice_max = _hit_dice_max,
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
        ability = _ability,
        notes = _notes
    FROM private.trainers t
    WHERE
        p.id = _id
        AND trainer_id = t.id
        AND t.write_key = _write_key;
    
    GET DIAGNOSTICS affected_rows := ROW_COUNT;

    RETURN affected_rows;
END $$;


ALTER FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE affected_rows INT;
BEGIN
    UPDATE private.pokemon p SET
        species = _species,
        nickname = _nickname,
        nature = _nature,
        type = _type,
        level = _level,
        gender = _gender,
        strength = _strength,
        dexterity = _dexterity,
        constitution = _constitution,
        intelligence = _intelligence,
        wisdom = _wisdom,
        charisma = _charisma,
        ac = _ac,
        hp_cur = _hp_cur,
        hp_max = _hp_max,
        hit_dice_cur = _hit_dice_cur,
        hit_dice_max = _hit_dice_max,
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
        ability = _ability,
        notes = _notes
    FROM private.trainers t
    WHERE
        p.id = _id
        AND trainer_id = t.id
        AND t.write_key = _write_key;
    
    GET DIAGNOSTICS affected_rows := ROW_COUNT;

    RETURN affected_rows;
END $$;


ALTER FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying) RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE affected_rows INT;
BEGIN
	UPDATE private.pokemon p SET
		species = _species,
		nickname = _nickname,
		nature = _nature,
		type = _type,
		level = _level,
		gender = _gender,
		strength = _strength,
		dexterity = _dexterity,
		constitution = _constitution,
		intelligence = _intelligence,
		wisdom = _wisdom,
		charisma = _charisma,
		ac = _ac,
		hp_cur = _hp_cur,
		hp_max = _hp_max,
		hit_dice_cur = _hit_dice_cur,
		hit_dice_max = _hit_dice_max,
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
		ability = _ability,
		notes = _notes,
		tera_type = _tera_type,
		exp = _exp,
		status = _status,
		held_item = _held_item
	FROM private.trainers t
	WHERE
		p.id = _id
		AND trainer_id = t.id
		AND t.write_key = _write_key;
	
	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$;


ALTER FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying, "_is_shiny" boolean) RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE affected_rows INT;
BEGIN
	UPDATE private.pokemon p SET
		species = _species,
		nickname = _nickname,
		nature = _nature,
		type = _type,
		level = _level,
		gender = _gender,
		strength = _strength,
		dexterity = _dexterity,
		constitution = _constitution,
		intelligence = _intelligence,
		wisdom = _wisdom,
		charisma = _charisma,
		ac = _ac,
		hp_cur = _hp_cur,
		hp_max = _hp_max,
		hit_dice_cur = _hit_dice_cur,
		hit_dice_max = _hit_dice_max,
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
		ability = _ability,
		notes = _notes,
		tera_type = _tera_type,
		exp = _exp,
		status = _status,
		held_item = _held_item,
		is_shiny = _is_shiny
	FROM private.trainers t
	WHERE
		p.id = _id
		AND trainer_id = t.id
		AND t.write_key = _write_key;
	
	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$;


ALTER FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying, "_is_shiny" boolean) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_trainer"("_write_key" character varying, "_name" character varying, "_description" "text") RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE affected_rows INT;
BEGIN
    UPDATE private.trainers SET
        name = _name,
        description = _description
    WHERE
        write_key = _write_key;
    
    GET DIAGNOSTICS affected_rows := ROW_COUNT;

    RETURN affected_rows;
END $$;


ALTER FUNCTION "public"."update_trainer"("_write_key" character varying, "_name" character varying, "_description" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_trainer"("_write_key" character varying, "_name" character varying, "_description" "text", "_level" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean) RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
		save_cha = _save_cha
	WHERE
		write_key = _write_key;
	
	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$;


ALTER FUNCTION "public"."update_trainer"("_write_key" character varying, "_name" character varying, "_description" "text", "_level" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."verify_write_key"("_id" "uuid", "_write_key" character varying) RETURNS integer
    LANGUAGE "plpgsql" STABLE SECURITY DEFINER
    AS $$
BEGIN
    RETURN (
        SELECT count(*) 
            FROM private.trainers
            WHERE id = _id AND write_key = _write_key
    );
END $$;


ALTER FUNCTION "public"."verify_write_key"("_id" "uuid", "_write_key" character varying) OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "private"."moves_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "private"."moves_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "private"."moves_id_seq" OWNED BY "private"."moves"."id";



CREATE TABLE IF NOT EXISTS "private"."pageview_events" (
    "id" integer NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "path" character varying(255) NOT NULL
);


ALTER TABLE "private"."pageview_events" OWNER TO "postgres";


ALTER TABLE "private"."pageview_events" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "private"."pageview_events_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE SEQUENCE IF NOT EXISTS "private"."pokemon_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "private"."pokemon_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "private"."pokemon_id_seq" OWNED BY "private"."pokemon"."id";



CREATE TABLE IF NOT EXISTS "private"."species_info" (
    "id" character varying(255) NOT NULL,
    "type" character varying(255)[] NOT NULL
);


ALTER TABLE "private"."species_info" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "private"."trainers" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "read_key" character varying(32) DEFAULT "public"."nanoid"(12) NOT NULL,
    "write_key" character varying(32) DEFAULT "public"."nanoid"(16) NOT NULL,
    "name" character varying(255),
    "description" "text",
    "level" integer DEFAULT 1 NOT NULL,
    "ac" integer DEFAULT 10 NOT NULL,
    "hp_cur" integer DEFAULT 8 NOT NULL,
    "hp_max" integer DEFAULT 8 NOT NULL,
    "hit_dice_cur" integer DEFAULT 1 NOT NULL,
    "hit_dice_max" integer DEFAULT 1 NOT NULL,
    "strength" integer DEFAULT 10 NOT NULL,
    "dexterity" integer DEFAULT 10 NOT NULL,
    "constitution" integer DEFAULT 10 NOT NULL,
    "intelligence" integer DEFAULT 10 NOT NULL,
    "wisdom" integer DEFAULT 10 NOT NULL,
    "charisma" integer DEFAULT 10 NOT NULL,
    "prof_athletics" boolean DEFAULT false NOT NULL,
    "prof_acrobatics" boolean DEFAULT false NOT NULL,
    "prof_sleight_of_hand" boolean DEFAULT false NOT NULL,
    "prof_stealth" boolean DEFAULT false NOT NULL,
    "prof_arcana" boolean DEFAULT false NOT NULL,
    "prof_history" boolean DEFAULT false NOT NULL,
    "prof_investigation" boolean DEFAULT false NOT NULL,
    "prof_nature" boolean DEFAULT false NOT NULL,
    "prof_religion" boolean DEFAULT false NOT NULL,
    "prof_animal_handling" boolean DEFAULT false NOT NULL,
    "prof_insight" boolean DEFAULT false NOT NULL,
    "prof_medicine" boolean DEFAULT false NOT NULL,
    "prof_perception" boolean DEFAULT false NOT NULL,
    "prof_survival" boolean DEFAULT false NOT NULL,
    "prof_deception" boolean DEFAULT false NOT NULL,
    "prof_intimidation" boolean DEFAULT false NOT NULL,
    "prof_performance" boolean DEFAULT false NOT NULL,
    "prof_persuasion" boolean DEFAULT false NOT NULL,
    "save_str" boolean DEFAULT false NOT NULL,
    "save_dex" boolean DEFAULT false NOT NULL,
    "save_con" boolean DEFAULT false NOT NULL,
    "save_int" boolean DEFAULT false NOT NULL,
    "save_wis" boolean DEFAULT false NOT NULL,
    "save_cha" boolean DEFAULT false NOT NULL
);


ALTER TABLE "private"."trainers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."migrations" (
    "id" integer NOT NULL,
    "name" character varying(100) NOT NULL,
    "hash" character varying(40) NOT NULL,
    "executed_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."migrations" OWNER TO "postgres";


ALTER TABLE ONLY "private"."moves" ALTER COLUMN "id" SET DEFAULT "nextval"('"private"."moves_id_seq"'::"regclass");



ALTER TABLE ONLY "private"."pokemon" ALTER COLUMN "id" SET DEFAULT "nextval"('"private"."pokemon_id_seq"'::"regclass");



ALTER TABLE ONLY "private"."moves"
    ADD CONSTRAINT "moves_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "private"."pageview_events"
    ADD CONSTRAINT "pageview_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "private"."pokemon"
    ADD CONSTRAINT "pokemon_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "private"."species_info"
    ADD CONSTRAINT "species_info_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "private"."trainers"
    ADD CONSTRAINT "trainers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "private"."trainers"
    ADD CONSTRAINT "trainers_read_key_key" UNIQUE ("read_key");



ALTER TABLE ONLY "private"."trainers"
    ADD CONSTRAINT "trainers_write_key_key" UNIQUE ("write_key");



ALTER TABLE ONLY "public"."migrations"
    ADD CONSTRAINT "migrations_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."migrations"
    ADD CONSTRAINT "migrations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "private"."moves"
    ADD CONSTRAINT "moves_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "private"."pokemon"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "private"."pokemon"
    ADD CONSTRAINT "pokemon_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "private"."trainers"("id") ON DELETE CASCADE;



ALTER TABLE "public"."migrations" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
GRANT ALL ON SCHEMA "public" TO PUBLIC;























































































































































































GRANT ALL ON FUNCTION "public"."add_move"("_write_key" character varying, "_pokemon_id" integer, "_move_id" character varying, "_pp_cur" integer, "_pp_max" integer, "_notes" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."add_move"("_write_key" character varying, "_pokemon_id" integer, "_move_id" character varying, "_pp_cur" integer, "_pp_max" integer, "_notes" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_move"("_write_key" character varying, "_pokemon_id" integer, "_move_id" character varying, "_pp_cur" integer, "_pp_max" integer, "_notes" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying, "_is_shiny" boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying, "_is_shiny" boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_pokemon"("_write_key" character varying, "_nickname" character varying, "_species" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying, "_is_shiny" boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."create_pageview_event"("_path" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."create_pageview_event"("_path" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_pageview_event"("_path" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."delete_trainer"("_write_key" character varying, "_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."delete_trainer"("_write_key" character varying, "_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_trainer"("_write_key" character varying, "_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_moveset"("_pokemon_id" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_moveset"("_pokemon_id" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_moveset"("_pokemon_id" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."get_pokemon"("_trainer_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_pokemon"("_trainer_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_pokemon"("_trainer_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_trainer"("_read_key" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."get_trainer"("_read_key" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_trainer"("_read_key" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."install_available_extensions_and_test"() TO "anon";
GRANT ALL ON FUNCTION "public"."install_available_extensions_and_test"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."install_available_extensions_and_test"() TO "service_role";



GRANT ALL ON FUNCTION "public"."nanoid"("size" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."nanoid"("size" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."nanoid"("size" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."new_trainer"("_name" character varying, "_description" "text", OUT "ret_id" "uuid", OUT "ret_read_key" character varying, OUT "ret_write_key" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."new_trainer"("_name" character varying, "_description" "text", OUT "ret_id" "uuid", OUT "ret_read_key" character varying, OUT "ret_write_key" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."new_trainer"("_name" character varying, "_description" "text", OUT "ret_id" "uuid", OUT "ret_read_key" character varying, OUT "ret_write_key" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."new_trainer"("_name" character varying, "_description" "text", "_level" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, OUT "ret_id" "uuid", OUT "ret_read_key" character varying, OUT "ret_write_key" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."new_trainer"("_name" character varying, "_description" "text", "_level" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, OUT "ret_id" "uuid", OUT "ret_read_key" character varying, OUT "ret_write_key" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."new_trainer"("_name" character varying, "_description" "text", "_level" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, OUT "ret_id" "uuid", OUT "ret_read_key" character varying, OUT "ret_write_key" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."remove_move"("_write_key" character varying, "_id" bigint) TO "anon";
GRANT ALL ON FUNCTION "public"."remove_move"("_write_key" character varying, "_id" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."remove_move"("_write_key" character varying, "_id" bigint) TO "service_role";



GRANT ALL ON FUNCTION "public"."remove_pokemon"("_write_key" character varying, "_id" bigint) TO "anon";
GRANT ALL ON FUNCTION "public"."remove_pokemon"("_write_key" character varying, "_id" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."remove_pokemon"("_write_key" character varying, "_id" bigint) TO "service_role";



GRANT ALL ON FUNCTION "public"."update_move"("_write_key" character varying, "_id" bigint, "_move_id" character varying, "_pp_cur" integer, "_pp_max" integer, "_notes" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."update_move"("_write_key" character varying, "_id" bigint, "_move_id" character varying, "_pp_cur" integer, "_pp_max" integer, "_notes" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_move"("_write_key" character varying, "_id" bigint, "_move_id" character varying, "_pp_cur" integer, "_pp_max" integer, "_notes" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying, "_is_shiny" boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying, "_is_shiny" boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_pokemon"("_write_key" character varying, "_id" integer, "_species" character varying, "_nickname" character varying, "_type" character varying[], "_nature" character varying, "_level" integer, "_gender" character varying, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean, "_ability" character varying, "_notes" "text", "_tera_type" character varying, "_exp" integer, "_status" character varying, "_held_item" character varying, "_is_shiny" boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."update_trainer"("_write_key" character varying, "_name" character varying, "_description" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."update_trainer"("_write_key" character varying, "_name" character varying, "_description" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_trainer"("_write_key" character varying, "_name" character varying, "_description" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."update_trainer"("_write_key" character varying, "_name" character varying, "_description" "text", "_level" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."update_trainer"("_write_key" character varying, "_name" character varying, "_description" "text", "_level" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_trainer"("_write_key" character varying, "_name" character varying, "_description" "text", "_level" integer, "_ac" integer, "_hp_cur" integer, "_hp_max" integer, "_hit_dice_cur" integer, "_hit_dice_max" integer, "_strength" integer, "_dexterity" integer, "_constitution" integer, "_intelligence" integer, "_wisdom" integer, "_charisma" integer, "_prof_athletics" boolean, "_prof_acrobatics" boolean, "_prof_sleight_of_hand" boolean, "_prof_stealth" boolean, "_prof_arcana" boolean, "_prof_history" boolean, "_prof_investigation" boolean, "_prof_nature" boolean, "_prof_religion" boolean, "_prof_animal_handling" boolean, "_prof_insight" boolean, "_prof_medicine" boolean, "_prof_perception" boolean, "_prof_survival" boolean, "_prof_deception" boolean, "_prof_intimidation" boolean, "_prof_performance" boolean, "_prof_persuasion" boolean, "_save_str" boolean, "_save_dex" boolean, "_save_con" boolean, "_save_int" boolean, "_save_wis" boolean, "_save_cha" boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."verify_write_key"("_id" "uuid", "_write_key" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."verify_write_key"("_id" "uuid", "_write_key" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."verify_write_key"("_id" "uuid", "_write_key" character varying) TO "service_role";





















GRANT ALL ON TABLE "public"."migrations" TO "anon";
GRANT ALL ON TABLE "public"."migrations" TO "authenticated";
GRANT ALL ON TABLE "public"."migrations" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
