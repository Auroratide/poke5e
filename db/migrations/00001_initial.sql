-- CREATE nanoid FUNCTION FOR URL-FRIENDLY IDS
-------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION nanoid(size int DEFAULT 21)
RETURNS text AS $$
-- MIT License

-- Copyright (c) 2020 Jake Lee Kennedy

-- Permission is hereby granted, free of charge, to any person obtaining a copy
-- of this software and associated documentation files (the "Software"), to deal
-- in the Software without restriction, including without limitation the rights
-- to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
-- copies of the Software, and to permit persons to whom the Software is
-- furnished to do so, subject to the following conditions:

-- The above copyright notice and this permission notice shall be included in all
-- copies or substantial portions of the Software.

-- THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
-- IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
-- FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
-- AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
-- LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
-- OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
-- SOFTWARE.
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
$$ LANGUAGE PLPGSQL STABLE;

-- CREATE INITIAL TABLES
-------------------------------------------------------------------------------
CREATE SCHEMA IF NOT EXISTS private;

CREATE TABLE private.trainers (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    read_key VARCHAR(32) DEFAULT nanoid(12) UNIQUE NOT NULL,
    write_key VARCHAR(32) DEFAULT nanoid(16) UNIQUE NOT NULL,
    name VARCHAR(255),
    description TEXT
);

CREATE TABLE private.pokemon (
    id SERIAL PRIMARY KEY,
    trainer_id uuid REFERENCES private.trainers NOT NULL,
    species VARCHAR(255) NOT NULL,
    nickname VARCHAR(255),
    nature VARCHAR(255) NOT NULL,
    level INT NOT NULL,
    gender VARCHAR(255) NOT NULL,
    strength INT NOT NULL,
    dexterity INT NOT NULL,
    constitution INT NOT NULL,
    intelligence INT NOT NULL,
    wisdom INT NOT NULL,
    charisma INT NOT NULL,
    ac INT NOT NULL,
    hp_cur INT NOT NULL,
    hp_max INT NOT NULL,
    hit_dice_cur INT NOT NULL,
    hit_dice_max INT NOT NULL,
    prof_athletics BOOLEAN NOT NULL,
    prof_acrobatics BOOLEAN NOT NULL,
    prof_sleight_of_hand BOOLEAN NOT NULL,
    prof_stealth BOOLEAN NOT NULL,
    prof_arcana BOOLEAN NOT NULL,
    prof_history BOOLEAN NOT NULL,
    prof_investigation BOOLEAN NOT NULL,
    prof_nature BOOLEAN NOT NULL,
    prof_religion BOOLEAN NOT NULL,
    prof_animal_handling BOOLEAN NOT NULL,
    prof_insight BOOLEAN NOT NULL,
    prof_medicine BOOLEAN NOT NULL,
    prof_perception BOOLEAN NOT NULL,
    prof_survival BOOLEAN NOT NULL,
    prof_deception BOOLEAN NOT NULL,
    prof_intimidation BOOLEAN NOT NULL,
    prof_performance BOOLEAN NOT NULL,
    prof_persuasion BOOLEAN NOT NULL,
    save_str BOOLEAN NOT NULL,
    save_dex BOOLEAN NOT NULL,
    save_con BOOLEAN NOT NULL,
    save_int BOOLEAN NOT NULL,
    save_wis BOOLEAN NOT NULL,
    save_cha BOOLEAN NOT NULL
);

-- FUNCTIONS TO ACCESS THE TABLES
-------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_trainer(_read_key VARCHAR(32))
RETURNS TABLE (id uuid, read_key VARCHAR(32), name VARCHAR(255), description TEXT) AS $$
BEGIN
    RETURN QUERY SELECT
        trainers.id,
        trainers.read_key,
        trainers.name,
        trainers.description
    FROM private.trainers WHERE trainers.read_key = _read_key;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;


CREATE OR REPLACE FUNCTION get_pokemon(_trainer_id uuid)
RETURNS SETOF private.pokemon AS $$
BEGIN
    RETURN QUERY SELECT
        *
    FROM private.pokemon WHERE pokemon.trainer_id = _trainer_id;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;
