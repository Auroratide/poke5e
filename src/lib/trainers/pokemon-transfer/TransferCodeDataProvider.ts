import { supabase } from "$lib/supabase"
import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js"
import type { PokemonId, ReadWriteKey } from "../types"
import { TransferCode } from "./TransferCode"
import { DetailedError } from "$lib/site/errors"

export class TransferCodeDataProvider {
	constructor(
		private readonly supabase: SupabaseClient,
	) {}

	async generate(trainerWriteKey: ReadWriteKey, pokemonId: PokemonId): Promise<TransferCode> {
		const { data, error } = await this.supabase.rpc("generate_transfer_code", {
			_write_key: trainerWriteKey,
			_pokemon_id: pokemonId,
		}).single<string>()

		this.validateError("Could not generate transfer code", error)

		return TransferCode.from(data)
	}

	async get(trainerWriteKey: ReadWriteKey, pokemonId: PokemonId): Promise<TransferCode | undefined> {
		const { data, error } = await this.supabase.rpc("get_transfer_code", {
			_write_key: trainerWriteKey,
			_pokemon_id: pokemonId,
		}).single<string>()

		this.validateError("Could not get transfer code", error)

		return data ? TransferCode.from(data) : undefined
	}

	async revoke(trainerWriteKey: ReadWriteKey, pokemonId: PokemonId) {
		const { error } = await this.supabase.rpc("revoke_transfer_code", {
			_write_key: trainerWriteKey,
			_pokemon_id: pokemonId,
		}).single<string>()

		this.validateError("Could not revoke transfer code", error)
	}

	private validateError(message: string, e: PostgrestError | undefined) {
		if (e) {
			console.error(e)
			throw new TransferCodeDataProviderError(message, e)
		}
	}
}

export class TransferCodeDataProviderError extends DetailedError {
	constructor(message: string, readonly diagnostics?: PostgrestError) {
		super(message, diagnostics ? `Code: ${diagnostics.code}; ${diagnostics.message}` : "", { cause: diagnostics })
	}
}

export const provider = new TransferCodeDataProvider(supabase)