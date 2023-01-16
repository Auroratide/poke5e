CREATE OR REPLACE FUNCTION new_trainer(
    _name VARCHAR(255),
    _description TEXT,
    OUT ret_id uuid,
    OUT ret_read_key VARCHAR(32),
    OUT ret_write_key VARCHAR(32)
) AS $$
BEGIN
    INSERT INTO private.trainers (
        name,
        description
    ) VALUES (
        _name,
        _description
    ) RETURNING id, read_key, write_key INTO ret_id, ret_read_key, ret_write_key;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;
