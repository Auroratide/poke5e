CREATE OR REPLACE FUNCTION update_trainer(
    _write_key VARCHAR(32),
    _name VARCHAR(255),
    _description TEXT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
    UPDATE private.trainers SET
        name = _name,
        description = _description
    WHERE
        write_key = _write_key;
    
    GET DIAGNOSTICS affected_rows := ROW_COUNT;

    RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;