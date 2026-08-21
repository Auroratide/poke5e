import { test } from '@playwright/test'
import { Poke5eSite } from './Poke5eSite'

test("trainer end to end flow", async ({ page }) => {
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
	await trainers.expectTrainerBadge(trainerName)

	// Managing Pokemon
	await trainers.addPokemon("Charmander")
	await trainers.expectType("fire")
	await trainers.editPokemon("Fritz")

	await trainers.addPokemon("Appletun")
	await trainers.expectType("grass", "dragon")

	// The Box
	await trainers.deposit("Fritz", 1)
	await trainers.deposit("Appletun", 2)
	await trainers.openBox()
	await trainers.expectInBox("Appletun")
	await trainers.filterBox("apple", "Appletun", "Fritz")
	await trainers.withdraw("Fritz", 1)
	await trainers.withdraw("Appletun", 0)
	// Closed again so the open drawer cannot sit over the party badges below.
	await trainers.closeBoxWithEscape()

	await trainers.evolve("Fritz", "Charmeleon")
	await trainers.removePokemon("Appletun")

	await trainers.addPokemon(fakemonName)
	await trainers.expectType("water", "grass")

	// Releasing straight out of the box, then closing it by keyboard
	await trainers.deposit(fakemonName, 1)
	await trainers.openBox()
	await trainers.releaseFromBox(fakemonName, 0)
	await trainers.closeBoxWithEscape()

	// Cleanup
	await trainers.removeTrainer(readKey)
})
