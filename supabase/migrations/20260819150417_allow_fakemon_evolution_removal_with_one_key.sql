-- Removing or repointing an evolution now only requires write access to ONE of
-- its two ends, since deleting a fakemon strands the evolution rows that pointed
-- at it. Adding remains strict: you must own both ends to assert a new link.
--
-- Note the IS NOT NULL guards. Canon pokemon are stored with a NULL write key,
-- so a bare "f.from_write_key IS NOT DISTINCT FROM _original_from_write_key OR ..."
-- would let a caller supplying no keys at all delete any evolution touching a
-- canon pokemon.

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
-- affected_rows must default to 0 and only be read inside the IF. ROW_COUNT
-- reports the last statement sent to the engine, so when the write-access gate
-- below rejects and no UPDATE runs, it would otherwise pick up the row count of
-- the gate's own EXISTS check and report success.
DECLARE affected_rows INT := 0;
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
			AND (
				(_original_from_write_key IS NOT NULL AND f.from_write_key = _original_from_write_key)
				OR (_original_to_write_key IS NOT NULL AND f.to_write_key = _original_to_write_key)
			);

		GET DIAGNOSTICS affected_rows := ROW_COUNT;
	END IF;

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
		AND (
			(_original_from_write_key IS NOT NULL AND f.from_write_key = _original_from_write_key)
			OR (_original_to_write_key IS NOT NULL AND f.to_write_key = _original_to_write_key)
		);

	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;
