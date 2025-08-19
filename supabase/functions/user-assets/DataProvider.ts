import { SupabaseClient } from "npm:@supabase/supabase-js@2"

export type PokemonId = string
export type TrainerWriteKey = string

export class DataProvider {
	constructor(private readonly supabase: SupabaseClient) {}

	async newPokemonAvatarFilename(options: {
		id: PokemonId,
		key: TrainerWriteKey,
		extension: string,
	}): Promise<string> {
		const { data: filename, error } = await this.supabase.rpc("new_pokemon_avatar_filename", {
			_id: options.id,
			_write_key: options.key,
			_extension: "." + options.extension,
		}).single<string>()

		if (error) {
			throw new Error(error.message)
		}

		return filename
	}
}