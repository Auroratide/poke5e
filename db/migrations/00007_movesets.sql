CREATE TABLE private.moves (
    id BIGSERIAL PRIMARY KEY,
    pokemon_id INT REFERENCES private.pokemon NOT NULL,
    move_id VARCHAR(255) NOT NULL,
    pp_cur INT NOT NULL,
    pp_max INT NOT NULL,
    notes TEXT
);

CREATE OR REPLACE FUNCTION get_moveset(_pokemon_id INT)
RETURNS SETOF private.moves AS $$
BEGIN
    RETURN QUERY SELECT
        *
    FROM private.moves WHERE moves.pokemon_id = _pokemon_id;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_move(
    _write_key VARCHAR(32),
    _id BIGINT,
    _move_id VARCHAR(255),
    _pp_cur INT,
    _pp_max INT,
    _notes TEXT
) RETURNS INT AS $$
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
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION add_move(
    _write_key VARCHAR(32),
    _pokemon_id INT,
    _move_id VARCHAR(255),
    _pp_cur INT,
    _pp_max INT,
    _notes TEXT
) RETURNS INT AS $$
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
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;