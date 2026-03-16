CREATE TABLE private.abilities (
	id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	pokemon_id INT REFERENCES private.pokemon(id) ON DELETE CASCADE,
	fakemon_id UUID REFERENCES private.fakemon(id) ON DELETE CASCADE,
	ability_id VARCHAR(255),
	custom_name VARCHAR(255),
	description TEXT,
	rank INT NOT NULL,
	CONSTRAINT must_have_pokemon_or_fakemon
		CHECK (
			(pokemon_id IS NOT NULL AND fakemon_id IS NULL) OR
			(fakemon_id IS NOT NULL AND pokemon_id IS NULL)
		)
);

CREATE OR REPLACE FUNCTION add_ability(
	_write_key VARCHAR(32),
	_pokemon_id INT,
	_fakemon_id UUID,
	_ability_id VARCHAR(255),
	_custom_name VARCHAR(255),
	_description TEXT,
	_rank INT
) RETURNS BIGINT AS $$
DECLARE
	ret_id BIGINT;
BEGIN
	IF _pokemon_id IS NOT NULL THEN
		IF EXISTS (
			SELECT FROM private.pokemon p
				INNER JOIN private.trainers t
				ON p.trainer_id = t.id
				WHERE p.id = _pokemon_id AND t.write_key = _write_key
		) THEN
			INSERT INTO private.abilities (
				pokemon_id,
				ability_id,
				custom_name,
				description,
				rank
			) VALUES (
				_pokemon_id,
				_ability_id,
				_custom_name,
				_description,
				_rank
			) RETURNING id INTO ret_id;
		END IF;

	ELSIF _fakemon_id IS NOT NULL THEN
		IF EXISTS (
			SELECT FROM private.fakemon f
				WHERE f.id = _fakemon_id AND f.write_key = _write_key
		) THEN
			INSERT INTO private.abilities (
				fakemon_id,
				ability_id,
				custom_name,
				description,
				rank
			) VALUES (
				_fakemon_id,
				_ability_id,
				_custom_name,
				_description,
				_rank
			) RETURNING id INTO ret_id;
		END IF;
	END IF;

	RETURN ret_id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_ability(
	_write_key VARCHAR(32),
	_id BIGINT,
	_ability_id VARCHAR(255),
	_custom_name VARCHAR(255),
	_description TEXT,
	_rank INT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	UPDATE private.abilities a SET
		ability_id = _ability_id,
		custom_name = _custom_name,
		description = _description,
		rank = _rank
	FROM private.abilities a2
	LEFT JOIN private.pokemon p
		INNER JOIN private.trainers t ON t.id = p.trainer_id
		ON p.id = a2.pokemon_id
	LEFT JOIN private.fakemon f
		ON f.id = a2.fakemon_id
	WHERE
		a.id = _id
		AND a2.id = _id
		AND (
			(a2.pokemon_id IS NOT NULL AND t.write_key = _write_key)
			OR
			(a2.fakemon_id IS NOT NULL AND f.write_key = _write_key)
		);

	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;


CREATE OR REPLACE FUNCTION remove_ability(
	_write_key VARCHAR(32),
	_id BIGINT
) RETURNS INT AS $$
DECLARE affected_rows INT;
BEGIN
	DELETE FROM private.abilities a
	USING private.abilities a2
	LEFT JOIN private.pokemon p
		INNER JOIN private.trainers t ON t.id = p.trainer_id
		ON p.id = a2.pokemon_id
	LEFT JOIN private.fakemon f
		ON f.id = a2.fakemon_id
	WHERE
		a.id = _id
		AND a2.id = _id
		AND (
			(a2.pokemon_id IS NOT NULL AND t.write_key = _write_key)
			OR
			(a2.fakemon_id IS NOT NULL AND f.write_key = _write_key)
		);

	GET DIAGNOSTICS affected_rows := ROW_COUNT;

	RETURN affected_rows;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_abilities(
	_pokemon_id INT
) RETURNS SETOF private.abilities AS $$
BEGIN
	RETURN QUERY SELECT * FROM private.abilities a WHERE a.pokemon_id = _pokemon_id ORDER BY a.rank;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_abilities(
	_fakemon_id UUID
) RETURNS SETOF private.abilities AS $$
BEGIN
	RETURN QUERY SELECT * FROM private.abilities a WHERE a.fakemon_id = _fakemon_id ORDER BY a.rank;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;
