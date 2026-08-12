import { BiomesSrdClient } from "./biomes/client"
import type { Edition } from "./editions"

export class SrdClient {
	readonly biomes: BiomesSrdClient

	constructor(readonly edition: Edition) {
		this.biomes = new BiomesSrdClient(edition)
	}
}
