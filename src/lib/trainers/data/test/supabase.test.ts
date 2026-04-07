import { test, expect, beforeEach, afterEach, vi } from "vitest"
import { provider } from ".."
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import { Level } from "$lib/dnd/level"
import { stubAbility } from "$lib/pokemon/ability/test/stubs"
import { ApiStub } from "$lib/test/ApiStub"

const ABILITIES = {
	disguise: stubAbility({
		id: "disguise",
		name: "Disguise",
		description: "Grants a disguise.",
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
		abilities: {
			normal: [ABILITIES.disguise.id],
			hidden: [],
		},
	})

	const addedTrainer = await provider.newTrainer(trainerToAdd)
	await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.id, speciesToAdd)

	const receivedTrainer = await provider.getTrainer(addedTrainer.info.readKey)
	const receivedPokemon = receivedTrainer.pokemon[0]

	expect(receivedPokemon.ability).toEqual("disguise")
	expect(receivedPokemon.abilities).toHaveLength(1)
	expect(receivedPokemon.abilities[0]).toEqualData(ABILITIES.disguise)
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
