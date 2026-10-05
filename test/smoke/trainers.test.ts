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

	await pokemon.expectNumberOfPokemon(1139)

	// Searching
	await pokemon.searchFor("star")
	await pokemon.expectNumberOfPokemon(6)
	await pokemon.expectPokemonInList(["Staryu", "Starmie", "Omastar", "Starly", "Staravia", "Staraptor"])

	// Filtering
	await pokemon.searchFor("")
	await pokemon.openFilter()
	await pokemon.selectType("ice")
	await pokemon.expectNumberOfPokemon(61)
	await pokemon.expectPokemonInList(["Dewgong", "Cloyster"])

	await pokemon.resetFilters()
	await pokemon.selectSize("huge")
	await pokemon.expectNumberOfPokemon(35)
	await pokemon.expectPokemonInList(["Onix", "Gyarados"])

	await pokemon.resetFilters()
	await pokemon.selectSr("15")
	await pokemon.expectNumberOfPokemon(107)
	await pokemon.expectPokemonInList(["Articuno", "Zapdos"])

	await pokemon.resetFilters()
	await pokemon.selectMinLevel("10")
	await pokemon.expectNumberOfPokemon(113)
	await pokemon.expectPokemonInList(["Venusaur", "Charizard"])

	await pokemon.resetFilters()
	await pokemon.selectEggGroup("Mineral")
	await pokemon.expectNumberOfPokemon(64)
	await pokemon.expectPokemonInList(["Geodude", "Graveler"])

	await pokemon.resetFilters()
	await pokemon.selectBiome("Abyss")
	await pokemon.expectNumberOfPokemon(22)
	await pokemon.expectPokemonInList(["Cloyster", "Chinchou"])

	await pokemon.resetFilters()
	await pokemon.selectNativeRegion("Kanto")
	await pokemon.expectNumberOfPokemon(151)
	await pokemon.expectPokemonInList(["Bulbasaur", "Ivysaur"])

	await pokemon.resetFilters()
	await pokemon.selectFoundIn("Sinnoh")
	await pokemon.expectNumberOfPokemon(226)
	await pokemon.expectPokemonInList(["Pikachu", "Raichu"])

	await pokemon.resetFilters()
	await pokemon.closeFilter()

	// Verify a pokemon
	await pokemon.openPokemon("Eevee")
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

	await moves.expectNumberOfMoves(830)

	// Searching
	await moves.searchFor("power")
	await moves.expectNumberOfMoves(19)
	await moves.expectMovesInList(["Ancient Power", "High Horsepower", "Power Gem", "Superpower"])

	// Filtering
	await moves.searchFor("")
	await moves.openFilter()
	await moves.selectType("ice")
	await moves.expectNumberOfMoves(29)
	await moves.expectMovesInList(["Aurora Beam", "Aurora Veil"])

	await moves.resetFilters()
	await moves.selectMovePower("int")
	await moves.expectNumberOfMoves(35)
	await moves.expectMovesInList(["Confuse Ray", "Confusion"])

	await moves.resetFilters()
	await moves.selectMoveTime("bonus action")
	await moves.expectNumberOfMoves(39)
	await moves.expectMovesInList(["Accelerock", "After You"])

	await moves.resetFilters()
	await moves.selectContest("cute")
	await moves.expectNumberOfMoves(92)
	await moves.expectMovesInList(["After You", "Amnesia"])

	await moves.resetFilters()
	await moves.selectRange("30")
	await moves.expectNumberOfMoves(119)
	await moves.expectMovesInList(["Acid", "Acid Spray"])

	await moves.resetFilters()
	await moves.selectPP("5")
	await moves.expectNumberOfMoves(298)
	await moves.expectMovesInList(["Acrobatics", "Aerial Ace"])

	await moves.resetFilters()
	await moves.closeFilter()

	// Verify a pokemon
	await moves.openMove("Aerial Ace")
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
