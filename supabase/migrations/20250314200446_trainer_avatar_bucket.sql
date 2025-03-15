INSERT INTO storage.buckets
	(id, name, public, file_size_limit, allowed_mime_types)
VALUES
	('trainer_avatars', 'trainer_avatars', true, 524288, '{"image/*"}');

CREATE OR REPLACE FUNCTION is_trainer_avatar_valid(_filename VARCHAR(255))
RETURNS BOOLEAN AS $$
BEGIN
	RETURN EXISTS (SELECT 1 FROM private.trainers WHERE avatar_filename = _filename);
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;

CREATE POLICY "Safelist Trainer Avatar Filenames" ON storage.objects FOR INSERT WITH CHECK (
	is_trainer_avatar_valid(name) AND bucket_id = 'trainer_avatars'
);

CREATE POLICY "Select Invalid Trainer Avatar Filenames" ON storage.objects FOR SELECT USING (
	NOT is_trainer_avatar_valid(name) AND bucket_id = 'trainer_avatars'
);

CREATE POLICY "Delete Invalid Trainer Avatar Filenames" ON storage.objects FOR DELETE USING (
	NOT is_trainer_avatar_valid(name) AND bucket_id = 'trainer_avatars'
);
