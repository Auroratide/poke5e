import { expect, test } from '@playwright/test'
import { Poke5eSite } from './Poke5eSite'

test("testit", async ({ page }) => {
	const site = await Poke5eSite.startJourney("A trainer manages their pokemon", page)

	const trainerName = `Automated Tester ${Math.floor(Math.random() * 999999)}`
	const fakemonName = `Automated Fakemon ${Math.floor(Math.random() * 999999)}`

	// Fakemon Flow
	const fakemon = await site.navToFakemon()
	await fakemon.createFakemon(fakemonName)
	await fakemon.editFakemon()

	// Managing Trainer
	const trainers = await site.navToTrainers()
	const readKey = await trainers.createTrainer(trainerName)
	await trainers.editTrainer()

	// Managing Pokemon
	await trainers.addPokemon("Charmander")
	await trainers.expectType("fire")
	await trainers.editPokemon("Fritz")

	await trainers.addPokemon("Appletun")
	await trainers.expectType("grass", "dragon")

	await trainers.evolve("Fritz", "Charmeleon")
	await trainers.removePokemon("Appletun")

	await trainers.addPokemon(fakemonName)
	await trainers.expectType("water", "grass")

	// Cleanup
	await trainers.removeTrainer(readKey)
})
