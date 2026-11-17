ALTER TABLE private.fakemon
	ADD CONSTRAINT fakemon_read_key_unique UNIQUE (read_key),
	ADD CONSTRAINT fakemon_write_key_unique UNIQUE (write_key);
