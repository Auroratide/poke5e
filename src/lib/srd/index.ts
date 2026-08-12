import { BiomesSrdClient } from "./biomes/client"
import type { Edition } from "./editions"
import { MovesSrdClient } from "./moves/client"

export class SrdClient {
	readonly biomes: BiomesSrdClient
	readonly moves: MovesSrdClient

	constructor(readonly edition: Edition, customFetch = fetch) {
		this.biomes = new BiomesSrdClient(edition, customFetch)
		this.moves = new MovesSrdClient(edition, customFetch)
	}
}
