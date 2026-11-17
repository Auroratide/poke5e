CREATE INDEX IF NOT EXISTS pokemon_trainer_id_idx ON private.pokemon (trainer_id);
CREATE INDEX IF NOT EXISTS moves_pokemon_id_idx ON private.moves (pokemon_id);
CREATE INDEX IF NOT EXISTS held_items_pokemon_id_idx ON private.held_items (pokemon_id);
CREATE INDEX IF NOT EXISTS pokemon_feats_pokemon_id_idx ON private.pokemon_feats (pokemon_id);
CREATE INDEX IF NOT EXISTS inventory_items_trainer_id_idx ON private.inventory_items (trainer_id);
CREATE INDEX IF NOT EXISTS trainer_feats_trainer_id_idx ON private.trainer_feats (trainer_id);