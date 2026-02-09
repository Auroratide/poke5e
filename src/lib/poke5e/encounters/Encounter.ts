import type { PokemonSpecies } from "$lib/poke5e/species"
import { experienceAwarded } from "../experience"

export type EncounterActor = {
	data: PokemonSpecies,
	level: number,
	count: number,
}

export type EncounterGenerationOptions = {
	pool: PokemonSpecies[],
	targetExp: number,
	pokemonLimit?: number,
	maxLevel?: number,
}

export class Encounter {
	private pokemon: EncounterActor[]

	constructor(pokemon: EncounterActor[]) {
		this.pokemon = pokemon
	}

	totalExp(): number {
		return this.pokemon.reduce((sum, p) => {
			const xp = experienceAwarded(p.level, p.data.sr.data)
			return sum + (isNaN(xp) ? 0 : xp) * p.count
		}, 0)
	}

	addPokemon(species: PokemonSpecies, level: number) {
		const existing = this.pokemon.find((poke) => poke.data.id.data === species.id.data)
		if (existing) {
			existing.count += 1
		} else {
			this.pokemon.push({ data: species, count: 1, level: level })
		}
	}

	static generate({
		pool,
		targetExp,
		pokemonLimit = Infinity,
		maxLevel = 20,
	}: EncounterGenerationOptions): Encounter {
		const encounter = new Encounter([])

		let currentTotalExp = 0
		let currentPokemonCount = 0
		let attempts = 0
		const MAX_ATTEMPTS = 500
		
		// Choose between Pokémon in the pool
		while (attempts < MAX_ATTEMPTS) {
			attempts++

			if (currentPokemonCount >= pokemonLimit) break

			const remainingExp = targetExp - currentTotalExp
			if (remainingExp <= 0) break

			const possibleChoices = pool.map(pokemon => {
				const randomLevel = Math.max(pokemon.data.minLevel, Math.floor(Math.random() * maxLevel) + 1)
				const exp = experienceAwarded(randomLevel, Number(pokemon.data.sr))
				return { pokemon, level: randomLevel, exp }
			}).filter(opt => opt.exp <= remainingExp)

			if (possibleChoices.length === 0) {
				break
			}

			let chosen: { pokemon: PokemonSpecies, level: number, exp: number }

			if (pokemonLimit < Infinity) {
				const slotsLeft = pokemonLimit - currentPokemonCount
				const targetExpPerPoke = remainingExp / slotsLeft

				possibleChoices.sort((a, b) => 
					Math.abs(a.exp - targetExpPerPoke) - Math.abs(b.exp - targetExpPerPoke),
				)
				
				const topTier = possibleChoices.slice(0, 3)
				chosen = topTier[Math.floor(Math.random() * topTier.length)]
			} else {
				chosen = possibleChoices[Math.floor(Math.random() * possibleChoices.length)]
			}

			currentTotalExp += chosen.exp
			currentPokemonCount += 1

			encounter.addPokemon(chosen.pokemon, chosen.level)
		}

		return encounter
	}
}
