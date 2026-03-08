CREATE TABLE private.errors (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	created_at TIMESTAMPTZ DEFAULT NOW(),
	device_id VARCHAR(255),
	action VARCHAR(255),
	message TEXT
);

CREATE OR REPLACE FUNCTION report_error(
	_device_id VARCHAR(255),
	_action VARCHAR(255),
	_message TEXT,
	OUT ret_id UUID
) AS $$
BEGIN
	INSERT INTO private.errors (
		device_id,
		action,
		message
	) VALUES (
		_device_id,
		_action,
		_message
	) RETURNING id INTO ret_id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;
