import { SupabaseClient } from "npm:@supabase/supabase-js@2"

export type PokemonId = string
export type TrainerWriteKey = string
export type FakemonWriteKey = string

export type FakemonMedia<T> = {
	normalPortrait?: T,
	normalSprite?: T,
	shinyPortrait?: T,
	shinySprite?: T,
}
const FakemonMediaTypes = ["normalPortrait", "normalSprite", "shinyPortrait", "shinySprite"] as const
export function forEachFakemonMediaType<T>(fn: (type: keyof FakemonMedia<T>) => T): FakemonMedia<T> {
	return FakemonMediaTypes.reduce((obj, type) => ({
		...obj,
		[type]: fn(type),
	}), {})
}
export async function forEachFakemonMediaTypeAsync<T>(fn: (type: keyof FakemonMedia<T>) => Promise<T>): Promise<FakemonMedia<T>> {
	const values = await Promise.all(FakemonMediaTypes.map(async (it) => ({
		type: it,
		value: await fn(it)
	})))

	return values.reduce((obj, { type, value }) => ({
		...obj,
		[type]: value,
	}), {})
}

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

	async removePokemonAvatar(options: {
		id: PokemonId,
		key: TrainerWriteKey,
	}): Promise<boolean> {
		const { data, error } = await this.supabase.rpc("remove_pokemon_avatar", {
			_id: options.id,
			_write_key: options.key,
		}).single<number>()

		if (error) {
			throw new Error(error.message)
		}

		return data > 0
	}

	async newFakemonMediaFilenames(options: {
		key: FakemonWriteKey
	 } & FakemonMedia<{ extension: string }>): Promise<FakemonMedia<string>> {
		const { data, error } = await this.supabase.rpc("new_fakemon_avatar_filenames", {
			_write_key: options.key,
			_normal_portrait_extension: options.normalPortrait ? "." + options.normalPortrait.extension : null,
			_normal_sprite_extension: options.normalSprite ? "." + options.normalSprite.extension : null,
			_shiny_portrait_extension: options.shinyPortrait ? "." + options.shinyPortrait.extension : null,
			_shiny_sprite_extension: options.shinySprite ? "." + options.shinySprite.extension : null,
		}).single<{
			normal_portrait_filename?: string,
			normal_sprite_filename?: string,
			shiny_portrait_filename?: string,
			shiny_sprite_filename?: string,
		}>()

		if (error) {
			throw new Error(error.message)
		}

		return {
			normalPortrait: data.normal_portrait_filename,
			normalSprite: data.normal_sprite_filename,
			shinyPortrait: data.shiny_portrait_filename,
			shinySprite: data.shiny_sprite_filename,
		}
	}

	async removeFakemonMedia(options: {
		key: FakemonWriteKey,
	} & FakemonMedia<boolean>): Promise<boolean> {
		const { data, error } = await this.supabase.rpc("remove_fakemon_avatars", {
			_write_key: options.key,
			_remove_normal_portrait: options.normalPortrait ?? false,
			_remove_normal_sprite: options.normalSprite ?? false,
			_remove_shiny_portrait: options.shinyPortrait ?? false,
			_remove_shiny_sprite: options.shinySprite ?? false,
		}).single<number>()

		if (error) {
			throw new Error(error.message)
		}

		return data > 0
	}
}