ALTER TABLE private.pokemon
	ADD COLUMN avatar_filename VARCHAR(255);

CREATE FUNCTION new_pokemon_avatar_filename(
	_write_key VARCHAR(32),
	_id INT,
	_extension VARCHAR(32)
) RETURNS VARCHAR(255) AS $$
DECLARE
	_uuid uuid;
	_filename VARCHAR(255);
BEGIN
	_uuid := uuid_generate_v4();
	_filename := _uuid || _extension;

	UPDATE private.pokemon p
		SET avatar_filename = _filename
		FROM private.trainers t
		WHERE
			p.id = _id
			AND p.trainer_id = t.id
			AND t.write_key = _write_key;

	RETURN _filename;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE FUNCTION remove_pokemon_avatar(
	_write_key VARCHAR(32),
	_id INT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	UPDATE private.pokemon p
		SET avatar_filename = null
		FROM private.trainers t
		WHERE
			p.id = _id
			AND p.trainer_id = t.id
			AND t.write_key = _write_key;

	GET DIAGNOSTICS affected_rows := ROW_COUNT;
	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;
