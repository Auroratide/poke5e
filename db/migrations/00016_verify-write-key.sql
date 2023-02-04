CREATE OR REPLACE FUNCTION verify_write_key(
    _id uuid,
    _write_key VARCHAR(32)
) RETURNS INT AS $$
BEGIN
    RETURN (
        SELECT count(*) 
            FROM private.trainers
            WHERE id = _id AND write_key = _write_key
    );
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;
