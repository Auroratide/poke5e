ALTER TABLE private.errors ADD COLUMN user_agent TEXT;

CREATE OR REPLACE FUNCTION report_error(
	_device_id VARCHAR(255),
	_action VARCHAR(255),
	_user_agent TEXT,
	_message TEXT,
	OUT ret_id UUID
) AS $$
BEGIN
	INSERT INTO private.errors (
		device_id,
		action,
		user_agent,
		message
	) VALUES (
		_device_id,
		_action,
		_user_agent,
		_message
	) RETURNING id INTO ret_id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;
