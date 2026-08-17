import { BiomesSrdClient } from "./biomes/client"
import type { Edition } from "./editions"
import { MovesSrdClient } from "./moves/client"
import { PokemonSrdClient } from "./pokemon/client"

export class SrdClient {
	readonly biomes: BiomesSrdClient
	readonly moves: MovesSrdClient
	readonly pokemon: PokemonSrdClient

	constructor(readonly edition: Edition, customFetch = fetch) {
		this.biomes = new BiomesSrdClient(edition, customFetch)
		this.moves = new MovesSrdClient(edition, customFetch)
		this.pokemon = new PokemonSrdClient(edition, customFetch)
	}
}
