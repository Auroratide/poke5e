ALTER TABLE private.pokemon
    DROP CONSTRAINT pokemon_trainer_id_fkey,
    ADD CONSTRAINT pokemon_trainer_id_fkey
        FOREIGN KEY (trainer_id)
        REFERENCES private.trainers(id)
        ON DELETE CASCADE;

CREATE OR REPLACE FUNCTION delete_trainer(
    _write_key VARCHAR(32),
    _id BIGINT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
    DELETE FROM private.trainers
    WHERE
        id = _id
        AND write_key = _write_key;
    
    GET DIAGNOSTICS affected_rows := ROW_COUNT;

    RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;
