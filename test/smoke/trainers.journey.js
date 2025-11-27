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
	below,
	range,
	near,
	checkBox,
	toRightOf,
} from "./actions.js"
import assert from "node:assert/strict"

export async function test() {
	await startJourney("A trainer manages their pokemon")

	const trainerName = `Automated Tester ${Math.floor(Math.random() * 999999)}`
	const fakemonName = `Automated Fakemon ${Math.floor(Math.random() * 999999)}`

	const fakemonReadKey = await createFakemon(fakemonName)
	console.log(`  (read key is ${fakemonReadKey})`)
	assert.ok(await text(fakemonName).exists())

	await editFakemon()
	assert.equal(await readDescriptionDefinition("Min Level"), "5")
	assert.ok(await text("The Automated Test Pokemon").exists())
	assert.ok(await text("Athletics").exists())
	assert.ok(await text("INT", toRightOf(text("Saving Throws"))).exists())
	assert.ok(await text("Aftermath").exists())
	assert.ok(await text("Hidden Power").exists())

	const trainerReadKey = await createTrainer(trainerName)
	console.log(`  (read key is ${trainerReadKey})`)
	assert.ok(await text(`${trainerName}'s Pokemon`).exists())

	await editTrainer()
	assert.ok(await text("Battle Master").exists())
	assert.ok(await text("Kindler ×1").exists())
	assert.ok(await text("Kanto").exists())
	assert.equal(await textBox("Money").value(), "1000")
	assert.ok(await text("Great Ball").exists())
	assert.ok(await text("Lustergem").exists())

	await addPokemon("Charmander")
	assert.ok(await text("Charmander").exists())
	assert.ok(await text("Fire").exists())

	await editPokemon("Fritz")
	assert.ok(await text("Fritz").exists())
	assert.ok(await text("Ember").exists())
	assert.ok(await text("Sitrus Berry").exists())

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

	await addPokemon(fakemonName)
	assert.ok(await text(fakemonName).exists())
	assert.ok(await text("Water").exists())
	assert.ok(await text("Grass").exists())

	await removeTrainer(trainerReadKey)
}

const createFakemon = async (name) => {
	console.log(`  Creating Fakemon ${name}...`)

	await click(link("Fakémon"))
	await click(link("New Fakémon"))
	await write(name, into(textBox("Species Name")))
	await dropDown("Primary Type").select("water")
	await dropDown("Secondary Type").select("grass")
	await click("Finish!")
	await doneSaving()

	return await readDescriptionDefinition("ID")
}

const editFakemon = async () => {
	console.log(`  Editing Fakemon...`)

	await click("Edit")
	await clear(textBox("Min Level"))
	await write("5")
	await write("The Automated Test Pokemon. This pokemon was generated to test that the website still works correctly.", into(textBox("Description")))
	await click(radioButton("50% ♀ : 50% ♂"))
	await click(checkBox("Athletics"))
	await click(checkBox("Intelligence"))
	await dropDown("Add Ability", below(text("Non-Hidden Abilities"))).select("aftermath")
	await click("Add Moves", below(text("Starting Moves")))
	await write("power", into(textBox("Find Move to Add")))
	await click(button(/add/, toRightOf(text("Hidden Power"))))

	await click("Finish!")
	await doneSaving()
}

const createTrainer = async (name) => {
	console.log(`  Creating ${name}...`)

	await click(link("Trainers"))
	await click(link("New Trainer"))
	await write(name, into(textBox("Name")))
	await click("Finish!")
	await doneSaving()

	return await readDescriptionDefinition("Trainer Id")
}

const editTrainer = async () => {
	console.log(`  Editing Trainer...`)

	await click("Edit")

	await clear(textBox("Level"))
	await write("5")
	await dropDown("Path Name").select("Ace Trainer")
	await range("Kindler (fire)").select(1)

	await clear(textBox("Home Region"))
	await write("Kanto")
	await clear(textBox("Money"))
	await write("1000")

	await addStandardItem("Great Ball")
	await addCustomItem("Lustergem", "A very powerful gem.")

	await click("Finish!")
	await doneSaving()
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
	await dropDown("Nature").select("Serious")
	await click(radioButton("Male"))

	await addMove("ember")
	await addStandardItem("Sitrus Berry")

	await click("Finish!")
	await doneSaving()
}

const addMove = async (move) => {
	await click("Add Move")
	await dropDown("Move").select(move)
}

const addStandardItem = async (item) => {
	await click("Add Item")
	await dropDown("Item").select(item)
}

const addCustomItem = async (name, description) => {
	await click("Add Custom Item")
	await clear(textBox("Name", below(text("Inventory"))))
	await write(name)
	await clear(textBox("Item Description"))
	await write(description)
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
