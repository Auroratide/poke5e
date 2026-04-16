import { test, expect, beforeEach, afterEach, vi } from "vitest"
import { provider } from ".."
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import { Level } from "$lib/dnd/level"
import { stubAbility, stubAbilityPool } from "$lib/pokemon/ability/test/stubs"
import { ApiStub } from "$lib/test/ApiStub"

const ABILITIES = {
	disguise: stubAbility({
		referenceId: "disguise",
		name: "Disguise",
		description: "Grants a disguise.",
	}),
	intimidate: stubAbility({
		referenceId: "intimidate",
		name: "Intimidate",
		description: "Angy",
	}),
}

beforeEach(() => {
	ApiStub.abilities = Object.values(ABILITIES)
})

afterEach(() => {
	vi.resetAllMocks()
})

test("add, get, update", async () => {
	const trainerToAdd = {
		name: "Renibel",
		description: "Likes cryptids.",
	}

	const firstSpeciesToAdd = stubPokemonSpecies({
		id: "mimikyu",
	})
	const secondSpeciesToAdd = stubPokemonSpecies({
		id: "kirlia",
	})

	const addedTrainer = await provider.newTrainer(trainerToAdd)
	const firstAddedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.id, firstSpeciesToAdd)
	const secondAddedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.id, secondSpeciesToAdd)

	const receivedTrainer = await provider.getTrainer(addedTrainer.info.readKey)
	const receivedPokemonIds = receivedTrainer.pokemon.map((it) => it.id)

	expect(receivedTrainer.info.name).toEqual("Renibel")
	expect(receivedPokemonIds).toContain(firstAddedPokemon.id)
	expect(receivedPokemonIds).toContain(secondAddedPokemon.id)

	firstAddedPokemon.bond.level = 3
	await provider.updatePokemon(addedTrainer.writeKey, firstAddedPokemon)
	addedTrainer.info.level = new Level(10)
	await provider.updateTrainerInfo(addedTrainer.writeKey, addedTrainer.info)

	const trainerAfterUpdate = await provider.getTrainer(addedTrainer.info.readKey)
	const firstPokemonAfterUpdate = trainerAfterUpdate.pokemon.find((it) => it.id === firstAddedPokemon.id)

	expect(trainerAfterUpdate.info.level).toEqualData(new Level(10))
	expect(firstPokemonAfterUpdate.bond.level).toEqual(3)
})

test("getting abilities", async () => {
	const trainerToAdd = {
		name: "Renibel",
		description: "Likes cryptids.",
	}

	const speciesToAdd = stubPokemonSpecies({
		id: "mimikyu",
		abilities: stubAbilityPool({
			normal: [ABILITIES.disguise],
			hidden: [],
		}),
	})

	const addedTrainer = await provider.newTrainer(trainerToAdd)
	const addedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.id, speciesToAdd)
	
	addedPokemon.abilities = [ABILITIES.disguise, ABILITIES.intimidate]

	await provider.updatePokemon(addedTrainer.writeKey, addedPokemon)

	const receivedTrainer = await provider.getTrainer(addedTrainer.info.readKey)
	const receivedPokemon = receivedTrainer.pokemon[0]

	expect(receivedPokemon.ability).toBeNull() // deprecated
	expect(receivedPokemon.abilities).toHaveLength(2)
	expect(receivedPokemon.abilities[0].referenceId).toEqual(ABILITIES.disguise.referenceId)
	expect(receivedPokemon.abilities[0].name).toEqual(ABILITIES.disguise.name)
	expect(receivedPokemon.abilities[1].referenceId).toEqual(ABILITIES.intimidate.referenceId)
	expect(receivedPokemon.abilities[1].name).toEqual(ABILITIES.intimidate.name)
})

test("reordering pokemon", async () => {
	// given
	const trainerToAdd = {
		name: "Renibel",
		description: "Likes cryptids.",
	}

	const firstSpeciesToAdd = stubPokemonSpecies({
		id: "mimikyu",
	})
	const secondSpeciesToAdd = stubPokemonSpecies({
		id: "kirlia",
	})
	const thirdSpeciesToAdd = stubPokemonSpecies({
		id: "litwick",
	})

	const addedTrainer = await provider.newTrainer(trainerToAdd)
	const firstAddedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.id, firstSpeciesToAdd)
	const secondAddedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.id, secondSpeciesToAdd)
	const thirdAddedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.id, thirdSpeciesToAdd)

	// when
	await provider.reorderPokemonTeam(addedTrainer.writeKey, [secondAddedPokemon, thirdAddedPokemon, firstAddedPokemon])

	// then
	const receivedTrainer = await provider.getTrainer(addedTrainer.info.readKey)
	const receivedPokemon = receivedTrainer.pokemon.map((it) => it.pokemonId.data)

	expect(receivedPokemon).toEqual(["kirlia", "litwick", "mimikyu"])
})
