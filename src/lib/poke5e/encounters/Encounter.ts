import { Level } from "$lib/dnd/level"
import type { PokemonSpecies } from "$lib/poke5e/species"
import { provider as trainerProvider, type TrainerData } from "$lib/trainers/data"
import type { WithWriteKey } from "$lib/trainers/types"
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

export type Encounter = {
	pokemon: EncounterActor[]
}

export const Encounter = {
	createEmpty(): Encounter {
		return {
			pokemon: [],
		}
	},

	totalExp(encounter: Encounter): number {
		return encounter.pokemon.reduce((sum, p) => {
			const xp = experienceAwarded(p.level, p.data.sr.data)
			return sum + (isNaN(xp) ? 0 : xp) * p.count
		}, 0)
	},

	addPokemon(encounter: Encounter, species: PokemonSpecies, level: number): Encounter {
		const existing = encounter.pokemon.find((poke) => poke.data.id.data === species.id.data)
		if (existing) {
			existing.count += 1
		} else {
			encounter.pokemon.push({ data: species, count: 1, level: level })
		}

		return {
			...encounter,
			pokemon: [...encounter.pokemon],
		}
	},

	removePokemon(encounter: Encounter, species: PokemonSpecies) {
		return {
			...encounter,
			pokemon: encounter.pokemon.filter((it) => it.data.id.data !== species.data.id),
		}
	},

	generate({
		pool,
		targetExp,
		pokemonLimit = Infinity,
		maxLevel = 20,
	}: EncounterGenerationOptions): Encounter {
		const encounter: Encounter = {
			pokemon: [],
		}

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

			Encounter.addPokemon(encounter, chosen.pokemon, chosen.level)
		}

		return encounter
	},

	async saveToTrainers(encounter: Encounter): Promise<TrainerData & WithWriteKey> {
		if (encounter.pokemon.length === 0) {
			throw new Error("Cannot save an empty encounter. Please add pokémon to it.")
		}

		const trainer = await trainerProvider.newTrainer({
			name: "Encounter",
			description: "Created using the encounter tool.",
		})

		const pokemon = (await Promise.all(encounter.pokemon.map(async (pokemon) => {
			return await Promise.all(Array(pokemon.count).fill(0).map(async () => {
				const added = await trainerProvider.addPokemonToTeam(trainer.writeKey, trainer.info.id, pokemon.data)
	
				added.level = new Level(pokemon.level)
	
				await trainerProvider.updatePokemon(trainer.writeKey, added)

				return added
			}))
		}))).flat()

		trainer.pokemon = pokemon

		return trainer
	},
} as const
