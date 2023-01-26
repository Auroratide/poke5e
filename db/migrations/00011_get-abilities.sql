CREATE OR REPLACE FUNCTION get_pokemon(_trainer_id uuid)
RETURNS SETOF private.pokemon AS $$
BEGIN
    RETURN QUERY SELECT
        *
    FROM private.pokemon WHERE pokemon.trainer_id = _trainer_id;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;
