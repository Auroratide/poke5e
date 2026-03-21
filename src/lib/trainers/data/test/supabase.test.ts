import { test, expect } from "vitest"
import { provider } from ".."
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import { Level } from "$lib/dnd/level"

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
