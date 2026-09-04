import { AbilitiesSrdClient } from "./abilities/client"
import { BiomesSrdClient } from "./biomes/client"
import { ContestEffectsSrdClient } from "./contest-effects/client"
import type { Edition } from "./editions"
import { EvolutionsSrdClient } from "./evolutions/client"
import { ItemsSrdClient } from "./items/client"
import { MovesSrdClient } from "./moves/client"
import { PokemonSrdClient } from "./pokemon/client"

export class SrdClient {
	readonly abilities: AbilitiesSrdClient
	readonly contestEffects: ContestEffectsSrdClient
	readonly biomes: BiomesSrdClient
	readonly moves: MovesSrdClient
	readonly pokemon: PokemonSrdClient
	readonly evolutions: EvolutionsSrdClient
	readonly items: ItemsSrdClient

	constructor(readonly edition: Edition, customFetch = fetch) {
		this.abilities = new AbilitiesSrdClient(edition, customFetch)
		this.contestEffects = new ContestEffectsSrdClient(edition, customFetch)
		this.biomes = new BiomesSrdClient(edition, customFetch)
		this.moves = new MovesSrdClient(edition, customFetch)
		this.pokemon = new PokemonSrdClient(edition, customFetch)
		this.evolutions = new EvolutionsSrdClient(edition, customFetch)
		this.items = new ItemsSrdClient(edition, customFetch)
	}

	static async forEachEdition<T>(f: (client: SrdClient) => Promise<T>, customFetch = fetch): Promise<Record<Edition, T>> {
		const client2018 = new SrdClient("2018", customFetch)
		const client2024 = new SrdClient("2024", customFetch)

		const [result2018, result2024] = await Promise.all([
			f(client2018),
			f(client2024),
		])

		return {
			"2018": result2018,
			"2024": result2024,
		}
	}
}
