CREATE OR REPLACE FUNCTION remove_move(
    _write_key VARCHAR(32),
    _id BIGINT
) RETURNS INT AS $$
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
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;
