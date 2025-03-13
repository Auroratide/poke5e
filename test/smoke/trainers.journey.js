import {
	click,
	link,
	startJourney,
	write,
	into,
	textBox,
	button,
	dropDown,
	clear,
	radioButton,
	text,
	listItem,
	waitFor,
	visitPathExplicitly,
	readDescriptionDefinition,
} from "./actions.js"
import assert from "node:assert/strict"

export async function test() {
	await startJourney("A trainer manages their pokemon")

	const name = `Automated Tester ${Math.floor(Math.random() * 999999)}`

	const readKey = await createTrainer(name)
	console.log(`  (read key is ${readKey})`)
	assert.ok(await text(`${name}'s Pokemon`).exists())

	await addPokemon("Charmander")
	assert.ok(await text("Charmander").exists())
	assert.ok(await text("Fire").exists())

	await editPokemon("Fritz")
	assert.ok(await text("Fritz").exists())
	assert.ok(await text("Ember").exists())

	await addPokemon("Appletun")
	assert.ok(await text("Appletun").exists())
	assert.ok(await text("Grass").exists())
	assert.ok(await text("Dragon").exists())

	await click(link("Fritz"))
	await evolvePokemon("Charmeleon")
	assert.ok(await text("Charmeleon").exists())

	await click(link("Appletun"))
	await removePokemon()
	await waitFor(async () => !(await listItem("Appletun").exists(0, 0)))

	await removeTrainer(readKey)
}

const createTrainer = async (name) => {
	console.log(`  Creating ${name}...`)

	await click(link("Trainers"))
	await dismissTrainerTransferDialog()
	await click(link("New Trainer"))
	await write(name, into(textBox("Name")))
	await click("Finish!")
	await doneSaving()

	return await readDescriptionDefinition("Trainer Id")
}

const dismissTrainerTransferDialog = async () => {
	const dialogIsPresent = await text("Trainer Data Transfer").exists()
	if (dialogIsPresent) {
		console.log("  Dismissing Trainer Transfer Dialong...")
		await click(button("Close"))
	}
}

const addPokemon = async (species) => {
	console.log(`  Adding ${species}...`)

	const searchQuery = species.toLocaleLowerCase().substring(0, 4)
	await click(link("Add Pokemon"))
	await write(searchQuery, into(textBox("Species")))
	await click(species)
	await doneSaving()
}

const editPokemon = async (nickname) => {
	console.log(`  Editing ${nickname}...`)

	await click("Edit")
	await clear(textBox("Nickname"))
	await write(nickname)
	await dropDown("Nature").select("stubborn")
	await click(radioButton("Male"))

	await addMove("ember")
	await click("Finish!")
	await doneSaving()
}

const addMove = async (move) => {
	await click("Add Move")
	await dropDown("Move").select(move)
}

const evolvePokemon = async (choice) => {
	console.log(`  Evolving into ${choice}...`)

	await click("Evolve")
	await click(radioButton(choice))
	await click("Evolve!")
	await doneSaving()
}

const removePokemon = async () => {
	console.log("  Removing pokemon...")

	await click("Remove")
	await click("Delete")
	await doneSaving()
}

const removeTrainer = async (readKey) => {
	console.log("  Removing trainer...")

	await visitPathExplicitly(`/trainers?id=${readKey}&action=retire-trainer`)
	await click("Delete")
	await doneSaving()
}

const doneSaving = async () => {
	await waitFor(async () => !(await text("Saving...").exists(0, 0)))
}
