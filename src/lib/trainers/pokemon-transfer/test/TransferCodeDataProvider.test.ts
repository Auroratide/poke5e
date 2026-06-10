import { test, expect } from "vitest"
import { provider as trainerProvider, type TrainerData } from "../../data"
import { provider, TransferCodeDataProviderError } from "../TransferCodeDataProvider"
import { stubTrainer } from "$lib/trainers/test/stubs"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import type { WithWriteKey } from "$lib/trainers/types"

async function setupTrainer(): Promise<TrainerData & WithWriteKey> {
	const trainer = stubTrainer()
	const pokemon = stubPokemonSpecies()
	const createdTrainer = await trainerProvider.newTrainer(trainer)
	const createdPokemon = await trainerProvider.addPokemonToTeam(createdTrainer.writeKey, createdTrainer.info.readKey, createdTrainer.info.id, pokemon)

	createdTrainer.pokemon = [createdPokemon]

	return createdTrainer
}

test("generating, getting, and revoking a code", async () => {
	const trainer = await setupTrainer()

	const code = await provider.generate(trainer.writeKey, trainer.pokemon[0].id)
	expect(code).toBeDefined()

	const gotCode = await provider.get(trainer.writeKey, trainer.pokemon[0].id)
	expect(gotCode).toEqual(code)

	await provider.revoke(trainer.writeKey, trainer.pokemon[0].id)
	const noCode = await provider.get(trainer.writeKey, trainer.pokemon[0].id)
	expect(noCode).toBeUndefined()
})

test("pokemon does not have a code yet", async () => {
	const trainer = await setupTrainer()

	const noCode = await provider.get(trainer.writeKey, trainer.pokemon[0].id)
	expect(noCode).toBeUndefined()
})

test("generation is idempotent", async () => {
	const trainer = await setupTrainer()

	const firstCode = await provider.generate(trainer.writeKey, trainer.pokemon[0].id)
	expect(firstCode).toBeDefined()

	const secondCode = await provider.generate(trainer.writeKey, trainer.pokemon[0].id)
	expect(secondCode).toEqual(firstCode)
})

test("attempting to generate using a readkey instead of a write key", async () => {
	const trainer = await setupTrainer()

	await expect(provider.generate(trainer.info.readKey, trainer.pokemon[0].id)).rejects.toThrow(TransferCodeDataProviderError)
})

test("attempting to generate using someone else's write key", async () => {
	const trainer1 = await setupTrainer()
	const trainer2 = await setupTrainer()

	await expect(provider.generate(trainer1.writeKey, trainer2.pokemon[0].id)).rejects.toThrow(TransferCodeDataProviderError)
})
