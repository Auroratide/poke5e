-- These bulk functions exist in order to reduce the number of calls the client makes
-- when loading a trainer. Instead of 3N calls (N = # pokemon), it is just 3 calls

CREATE OR REPLACE FUNCTION get_trainer_movesets(
	_trainer_id UUID
) RETURNS SETOF private.moves AS $$
BEGIN
	RETURN QUERY SELECT
		m.*
	FROM private.moves m
		INNER JOIN private.pokemon p
		ON m.pokemon_id = p.id
	WHERE p.trainer_id = _trainer_id
	ORDER BY m.pokemon_id, m.rank, m.id;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_trainer_held_items(
	_trainer_id UUID
) RETURNS SETOF private.held_items AS $$
BEGIN
	RETURN QUERY SELECT
		h.*
	FROM private.held_items h
		INNER JOIN private.pokemon p
		ON h.pokemon_id = p.id
	WHERE p.trainer_id = _trainer_id
	ORDER BY h.pokemon_id, h.rank, h.id;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_trainer_pokemon_feats(
	_trainer_id UUID
) RETURNS SETOF private.pokemon_feats AS $$
BEGIN
	RETURN QUERY SELECT
		f.*
	FROM private.pokemon_feats f
		INNER JOIN private.pokemon p
		ON f.pokemon_id = p.id
	WHERE p.trainer_id = _trainer_id
	ORDER BY f.pokemon_id, f.rank, f.id;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;
