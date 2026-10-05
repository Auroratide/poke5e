import { test } from '@playwright/test'
import { Poke5eSite } from './Poke5eSite'

// things to test
// pokemon pages show all the pokemon, and list the correct info on them
// (same with moves, tms, items)
// Rules pages load; abilities filter; literally go through each individual page and make sure it loads

// tRainers
//   Create a trainer
//   Edit the trainer, try every single individual field
//   Add a pokemon

test("pokemon pages", async ({ page }) => {
	const site = await Poke5eSite.startJourney("someone looks at the pokemon pages", page)

	const pokemon = await site.navToPokemon()

	await pokemon.expectNumberOfItems(1139)

	// Searching
	await pokemon.searchFor("star")
	await pokemon.expectNumberOfItems(6)
	await pokemon.expectInList(["Staryu", "Starmie", "Omastar", "Starly", "Staravia", "Staraptor"])

	// Filtering
	await pokemon.searchFor("")
	await pokemon.openFilter()
	await pokemon.selectType("ice")
	await pokemon.expectNumberOfItems(61)
	await pokemon.expectInList(["Dewgong", "Cloyster"])

	await pokemon.resetFilters()
	await pokemon.selectSize("huge")
	await pokemon.expectNumberOfItems(35)
	await pokemon.expectInList(["Onix", "Gyarados"])

	await pokemon.resetFilters()
	await pokemon.selectSr("15")
	await pokemon.expectNumberOfItems(107)
	await pokemon.expectInList(["Articuno", "Zapdos"])

	await pokemon.resetFilters()
	await pokemon.selectMinLevel("10")
	await pokemon.expectNumberOfItems(113)
	await pokemon.expectInList(["Venusaur", "Charizard"])

	await pokemon.resetFilters()
	await pokemon.selectEggGroup("Mineral")
	await pokemon.expectNumberOfItems(64)
	await pokemon.expectInList(["Geodude", "Graveler"])

	await pokemon.resetFilters()
	await pokemon.selectBiome("Abyss")
	await pokemon.expectNumberOfItems(22)
	await pokemon.expectInList(["Cloyster", "Chinchou"])

	await pokemon.resetFilters()
	await pokemon.selectNativeRegion("Kanto")
	await pokemon.expectNumberOfItems(151)
	await pokemon.expectInList(["Bulbasaur", "Ivysaur"])

	await pokemon.resetFilters()
	await pokemon.selectFoundIn("Sinnoh")
	await pokemon.expectNumberOfItems(226)
	await pokemon.expectInList(["Pikachu", "Raichu"])

	await pokemon.resetFilters()
	await pokemon.closeFilter()

	// Verify a pokemon
	await pokemon.open("Eevee")
	await pokemon.expectCorrectInfo(
		"#0133",
		"tiny",
		"½",
		"field",
		"1"
	)
	await pokemon.expectAbility("Run Away")
	await pokemon.expectAbility("Adaptability")
	await pokemon.expectAbility("Anticipation")

	await pokemon.expectEvolvesTo("Vaporeon")
	await pokemon.expectEvolvesTo("Jolteon")
	await pokemon.expectEvolvesTo("Flareon")
	await pokemon.expectEvolvesTo("Espeon")
	await pokemon.expectEvolvesTo("Umbreon")
	await pokemon.expectEvolvesTo("Leafeon")
	await pokemon.expectEvolvesTo("Glaceon")
	await pokemon.expectEvolvesTo("Sylveon")

	await pokemon.expectMoveList("Level 2", ["Sand Attack", "Baby-Doll Eyes", "Quick Attack"])
	await pokemon.expectMoveList("Level 6", ["Bite", "Swift"])
})

test("move pages", async ({ page }) => {
	const site = await Poke5eSite.startJourney("someone looks at the move pages", page)

	const moves = await site.navToMoves()

	await moves.expectNumberOfItems(830)

	// Searching
	await moves.searchFor("power")
	await moves.expectNumberOfItems(19)
	await moves.expectInList(["Ancient Power", "High Horsepower", "Power Gem", "Superpower"])

	// Filtering
	await moves.searchFor("")
	await moves.openFilter()
	await moves.selectType("ice")
	await moves.expectNumberOfItems(29)
	await moves.expectInList(["Aurora Beam", "Aurora Veil"])

	await moves.resetFilters()
	await moves.selectMovePower("int")
	await moves.expectNumberOfItems(35)
	await moves.expectInList(["Confuse Ray", "Confusion"])

	await moves.resetFilters()
	await moves.selectMoveTime("bonus action")
	await moves.expectNumberOfItems(39)
	await moves.expectInList(["Accelerock", "After You"])

	await moves.resetFilters()
	await moves.selectContest("cute")
	await moves.expectNumberOfItems(92)
	await moves.expectInList(["After You", "Amnesia"])

	await moves.resetFilters()
	await moves.selectRange("30")
	await moves.expectNumberOfItems(119)
	await moves.expectInList(["Acid", "Acid Spray"])

	await moves.resetFilters()
	await moves.selectPP("5")
	await moves.expectNumberOfItems(298)
	await moves.expectInList(["Acrobatics", "Aerial Ace"])

	await moves.resetFilters()
	await moves.closeFilter()

	// Verify a move
	await moves.open("Aerial Ace")
	await moves.expectCorrectInfo("dex", "Action", "5", "Instantaneous", "Melee")
	await moves.expectDamage("flying", "1d6", "1d10", "2d8", "5d4")
	await moves.expectsLearnsBy("Level Up", ["Spearow", "Fearow", "Ducklett"])
	await moves.expectsLearnsBy("TM", ["Charmander", "Tropius", "Keldeo"])
})

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
