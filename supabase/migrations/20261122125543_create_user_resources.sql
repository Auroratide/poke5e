-- A resource can be "owned" by multiple people via write key
-- This simply memorizes what keys someone has, so they can share across
-- their devices, or simply not lose them
CREATE TABLE private.user_resources (
	user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
	kind VARCHAR(16) NOT NULL CHECK (kind IN ('trainer', 'fakemon')),
	read_key VARCHAR(32) NOT NULL,
	write_key VARCHAR(32),
	position INT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	PRIMARY KEY (user_id, kind, read_key)
);

CREATE INDEX user_resources_position_idx ON private.user_resources (user_id, kind, position);

-- Raises if there is no signed-in user, otherwise returns their id.
-- Also serializes keychain writes per user, so concurrent adds and reorders
-- don't hand out the same position twice.
CREATE OR REPLACE FUNCTION private.lock_my_resources() RETURNS UUID AS $$
DECLARE
	_user_id UUID := auth.uid();
BEGIN
	IF _user_id IS NULL THEN
		RAISE EXCEPTION 'Must be signed in' USING ERRCODE = '42501';
	END IF;

	PERFORM pg_advisory_xact_lock(hashtext('user_resources:' || _user_id::TEXT));

	RETURN _user_id;
END $$ LANGUAGE PLPGSQL VOLATILE;

-- Paginated via offset; offset is NOT "page" (i.e. page 2 is offset 200)
CREATE OR REPLACE FUNCTION get_my_resources(
	_kind VARCHAR(16),
	_offset INT DEFAULT 0
) RETURNS TABLE (
	read_key VARCHAR(32),
	write_key VARCHAR(32)
) AS $$
BEGIN
	IF auth.uid() IS NULL THEN
		RAISE EXCEPTION 'Must be signed in' USING ERRCODE = '42501';
	END IF;

	RETURN QUERY SELECT
		r.read_key,
		r.write_key
	FROM private.user_resources r
	WHERE r.user_id = auth.uid()
		AND r.kind = _kind
	ORDER BY r.position, r.read_key
	LIMIT 200
	OFFSET GREATEST(COALESCE(_offset, 0), 0);
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;

-- can write at most 200 at a time; new resources appended
CREATE OR REPLACE FUNCTION add_my_resources(
	_resources JSONB
) RETURNS VOID AS $$
DECLARE
	_user_id UUID := private.lock_my_resources();
BEGIN
	IF _resources IS NULL OR jsonb_typeof(_resources) <> 'array' THEN
		RAISE EXCEPTION 'Resources must be an array';
	END IF;

	IF jsonb_array_length(_resources) > 200 THEN
		RAISE EXCEPTION 'Too many resources: % (max 200)', jsonb_array_length(_resources);
	END IF;

	WITH input AS (
		SELECT
			elem->>'kind' AS kind,
			elem->>'read_key' AS read_key,
			elem->>'write_key' AS write_key,
			ord
		FROM jsonb_array_elements(_resources) WITH ORDINALITY AS t(elem, ord)
	), deduped AS (
		SELECT
			input.kind,
			input.read_key,
			(array_agg(input.write_key ORDER BY input.ord) FILTER (WHERE input.write_key IS NOT NULL))[1] AS write_key,
			MIN(input.ord) AS ord
		FROM input
		GROUP BY input.kind, input.read_key
	), current_max AS (
		SELECT r.kind, MAX(r.position) AS max_position
		FROM private.user_resources r
		WHERE r.user_id = _user_id
		GROUP BY r.kind
	)
	INSERT INTO private.user_resources (user_id, kind, read_key, write_key, position)
	SELECT
		_user_id,
		deduped.kind,
		deduped.read_key,
		deduped.write_key,
		COALESCE(current_max.max_position, 0) + row_number() OVER (PARTITION BY deduped.kind ORDER BY deduped.ord)
	FROM deduped
	LEFT JOIN current_max ON current_max.kind = deduped.kind
	-- overwrite write_key if now provided
	ON CONFLICT (user_id, kind, read_key) DO UPDATE
		SET write_key = COALESCE(EXCLUDED.write_key, user_resources.write_key);
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION remove_my_resource(
	_kind VARCHAR(16),
	_read_key VARCHAR(32)
) RETURNS VOID AS $$
DECLARE
	_user_id UUID := private.lock_my_resources();
BEGIN
	DELETE FROM private.user_resources r
	WHERE r.user_id = _user_id
		AND r.kind = _kind
		AND r.read_key = _read_key;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

-- given resources first, then any unspecified ones afterward
CREATE OR REPLACE FUNCTION reorder_my_resources(
	_kind VARCHAR(16),
	_read_keys VARCHAR(32)[]
) RETURNS VOID AS $$
DECLARE
	_user_id UUID := private.lock_my_resources();
BEGIN
	WITH listed AS (
		SELECT k AS read_key, MIN(i) AS idx
		FROM unnest(_read_keys) WITH ORDINALITY AS u(k, i)
		GROUP BY k
	), ranked AS (
		SELECT
			r.read_key,
			row_number() OVER (ORDER BY listed.idx NULLS LAST, r.position, r.read_key) AS new_position
		FROM private.user_resources r
		LEFT JOIN listed ON listed.read_key = r.read_key
		WHERE r.user_id = _user_id
			AND r.kind = _kind
	)
	UPDATE private.user_resources r
	SET position = ranked.new_position
	FROM ranked
	WHERE r.user_id = _user_id
		AND r.kind = _kind
		AND r.read_key = ranked.read_key;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

-- Only signed-in users may use their keychain
REVOKE ALL ON FUNCTION private.lock_my_resources() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION get_my_resources(VARCHAR, INT) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION add_my_resources(JSONB) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION remove_my_resource(VARCHAR, VARCHAR) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION reorder_my_resources(VARCHAR, VARCHAR[]) FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION get_my_resources(VARCHAR, INT) TO authenticated;
GRANT EXECUTE ON FUNCTION add_my_resources(JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION remove_my_resource(VARCHAR, VARCHAR) TO authenticated;
GRANT EXECUTE ON FUNCTION reorder_my_resources(VARCHAR, VARCHAR[]) TO authenticated;
