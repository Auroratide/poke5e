CREATE OR REPLACE FUNCTION remove_pokemon(
    _write_key VARCHAR(32),
    _id BIGINT
) RETURNS INT AS $$
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
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;
