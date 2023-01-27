ALTER TABLE private.moves
    DROP CONSTRAINT moves_pokemon_id_fkey,
    ADD CONSTRAINT moves_pokemon_id_fkey
        FOREIGN KEY (pokemon_id)
        REFERENCES private.pokemon(id)
        ON DELETE CASCADE;
