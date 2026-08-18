import { AbilitiesSrdClient } from "./abilities/client"
import { BiomesSrdClient } from "./biomes/client"
import { ContestEffectsSrdClient } from "./contest-effects/client"
import type { Edition } from "./editions"
import { MovesSrdClient } from "./moves/client"
import { PokemonSrdClient } from "./pokemon/client"

export class SrdClient {
	readonly abilities: AbilitiesSrdClient
	readonly contestEffects: ContestEffectsSrdClient
	readonly biomes: BiomesSrdClient
	readonly moves: MovesSrdClient
	readonly pokemon: PokemonSrdClient

	constructor(readonly edition: Edition, customFetch = fetch) {
		this.abilities = new AbilitiesSrdClient(edition, customFetch)
		this.contestEffects = new ContestEffectsSrdClient(edition, customFetch)
		this.biomes = new BiomesSrdClient(edition, customFetch)
		this.moves = new MovesSrdClient(edition, customFetch)
		this.pokemon = new PokemonSrdClient(edition, customFetch)
	}
}
