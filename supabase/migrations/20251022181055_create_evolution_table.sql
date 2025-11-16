CREATE TABLE private.fakemon_evolutions (
	id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	-- Not foreign keys, since ids can be standard pokemon
	-- If from fakemon table, use "F." + read key
	from_id VARCHAR(255) NOT NULL,
	from_write_key VARCHAR(32),
	to_id VARCHAR(255) NOT NULL,
	to_write_key VARCHAR(32),
	conditions JSONB,
	effects JSONB,
	UNIQUE(from_id, to_id)
);

CREATE OR REPLACE FUNCTION add_fakemon_evolution(
	_from_id VARCHAR(255),
	_from_write_key VARCHAR(32),
	_to_id VARCHAR(255),
	_to_write_key VARCHAR(32),
	_conditions JSONB,
	_effects JSONB
) RETURNS BIGINT AS $$
DECLARE
	ret_id BIGINT;
BEGIN
	IF (EXISTS (
		SELECT FROM private.species_info s WHERE s.id = _from_id
	) OR EXISTS (
		SELECT FROM private.fakemon f WHERE 'F.' || f.read_key = _from_id AND f.write_key = _from_write_key
	)) AND (EXISTS (
		SELECT FROM private.species_info s WHERE s.id = _to_id
	) OR EXISTS (
		SELECT FROM private.fakemon f WHERE 'F.' || f.read_key = _to_id AND f.write_key = _to_write_key
	)) THEN
		INSERT INTO private.fakemon_evolutions (
			from_id,
			from_write_key,
			to_id,
			to_write_key,
			conditions,
			effects
		) VALUES (
			_from_id,
			_from_write_key,
			_to_id,
			_to_write_key,
			_conditions,
			_effects
		) RETURNING id INTO ret_id;
	END IF;

	RETURN ret_id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_fakemon_evolution(
	_id BIGINT,
	_original_from_write_key VARCHAR(32),
	_original_to_write_key VARCHAR(32),
	_from_id VARCHAR(255),
	_from_write_key VARCHAR(32),
	_to_id VARCHAR(255),
	_to_write_key VARCHAR(32),
	_conditions JSONB,
	_effects JSONB
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	IF (EXISTS (
		SELECT FROM private.species_info s WHERE s.id = _from_id
	) OR EXISTS (
		SELECT FROM private.fakemon f WHERE 'F.' || f.read_key = _from_id AND f.write_key = _from_write_key
	)) AND (EXISTS (
		SELECT FROM private.species_info s WHERE s.id = _to_id
	) OR EXISTS (
		SELECT FROM private.fakemon f WHERE 'F.' || f.read_key = _to_id AND f.write_key = _to_write_key
	)) THEN
		UPDATE private.fakemon_evolutions f SET
			from_id = _from_id,
			from_write_key = _from_write_key,
			to_id = _to_id,
			to_write_key = _to_write_key,
			conditions = _conditions,
			effects = _effects
		WHERE
			f.id = _id
			AND f.from_write_key IS NOT DISTINCT FROM _original_from_write_key
			AND f.to_write_key IS NOT DISTINCT FROM _original_to_write_key;
	END IF;
	
	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION remove_fakemon_evolution(
	_id BIGINT,
	_original_from_write_key VARCHAR(32),
	_original_to_write_key VARCHAR(32)
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	DELETE FROM private.fakemon_evolutions f
	WHERE
		f.id = _id
		AND f.from_write_key IS NOT DISTINCT FROM _original_from_write_key
		AND f.to_write_key IS NOT DISTINCT FROM _original_to_write_key;
	
	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

-- Note: include the 'F.' in this case for fakemon
CREATE OR REPLACE FUNCTION get_fakemon_evolutions(
	_fakemon_id VARCHAR(255)
) RETURNS TABLE (
	id BIGINT,
	from_id VARCHAR(255),
	to_id VARCHAR(255),
	conditions JSONB,
	effects JSONB
) AS $$
BEGIN
	RETURN QUERY SELECT
		e.id,
		e.from_id,
		e.to_id,
		e.conditions,
		e.effects
	FROM private.fakemon_evolutions e WHERE e.from_id = _fakemon_id OR e.to_id = _fakemon_id ORDER BY id;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;
