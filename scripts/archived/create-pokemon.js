import fs from "node:fs/promises"
import path from "node:path"

async function api(url) {
	return await fetch(url).then((res) => {
		if (res.ok) {
			return res.json()
		} else {
			throw new Error(`Request for ${url} failed`)
		}
	})
}

async function main() {
	const allAbilities = (await readJsonFile(path.join("static", "data", "abilities.json"))).items.map((it) => it.id)
	const allMoves = (await readJsonFile(path.join("static", "data", "moves.json"))).moves.map((it) => it.id)
	const allTms = (await readJsonFile(path.join("static", "data", "tms.json"))).tms

	const startNum = parseInt(process.argv[2])
	const endNum = parseInt(process.argv[3])
	console.log(`Starting to generate pokemon ${startNum}-${endNum}`)

	const finalList = []
	const failed = []

	for (let id = startNum; id <= endNum; ++id) {
		try {
			const pokemon = await api(`https://pokeapi.co/api/v2/pokemon/${id}`)
			const species = await api(pokemon.species.url)
			const evolution = await api(species.evolution_chain.url)

			const result = processPokemon(pokemon, species, evolution, allAbilities, allMoves, allTms)
			finalList.push(result)
		} catch (e) {
			failed.push(id)
			console.error(`  ERROR for ${id}: ${e.message}`)
		}
	}

	await fs.writeFile(path.join("scripts", "out", `pokemon-${startNum}-${endNum}.json`), JSON.stringify(finalList, null, 2), { encoding: "utf-8" })

	const totalAttempted = endNum - startNum + 1
	console.log("\nDONE!")
	if (failed.length > 0) {
		console.log(`  ${failed.length} / ${totalAttempted} Failed.`)
		console.log(`  Look into: ${failed.join(", ")}`)
	}
}

function processPokemon(pokemon, species, evolution, allAbilities, allMoves, allTms) {
	const result = {}

	const evolutionDescription = createEvolutionDescription(pokemon.name, evolution)
	const isLowestEvolution = evolutionDescription.stage === 1

	const isLegendary = getIsLegendary(species)

	console.log(`Creating ${pokemon.name}...`)

	result.id = pokemon.name
	result.name = capitalize(pokemon.name)
	result.number = pokemon.id
	result.type = pokemon.types.map((it) => it.type.name)
	result.size = convertSize(pokemon.height)
	result.sr = calculateSr(pokemon.stats, isLegendary)
	result.minLevel = convertMinLevel(pokemon.base_experience, isLegendary)
	result.eggGroup = species.egg_groups.map(convertEggGroup)
	result.gender = convertGender(species.gender_rate)
	if (evolutionDescription.maxStage > 1) {
		result.evolution = evolutionDescription
		// idk why these are string...
		result.evolution.stage = evolutionDescription.stage.toString()
		result.evolution.maxStage = evolutionDescription.maxStage.toString()
	}
	result.description = getDescription(species)
	result.ac = calculateAc(pokemon.stats)
	result.hitDice = calculateHitDice(pokemon.stats, evolutionDescription)
	result.speed = UNKNOWN()
	result.attributes = {
		str: calculateStr(pokemon.stats),
		dex: calculateDex(pokemon.stats),
		con: calculateCon(pokemon.stats),
		int: calculateInt(pokemon.stats),
		wis: calculateWis(pokemon.stats),
		cha: calculateCha(pokemon.stats),
	}
	result.hp = calculateHp(result.minLevel, result.hitDice, result.attributes.con)
	result.skills = UNKNOWN()
	result.savingThrows = UNKNOWN()
	result.senses = UNKNOWN()
	result.abilities = pokemon.abilities.map((it) => convertAbility(it, allAbilities))

	let startMoves = getMovesByLevel(pokemon.moves, -1, 1, allMoves)
	let level2Moves = getMovesByLevel(pokemon.moves, 1, 10, allMoves)
	let level6Moves = getMovesByLevel(pokemon.moves, 10, 20, allMoves)
	let level10Moves = getMovesByLevel(pokemon.moves, 20, 30, allMoves)
	let level14Moves = getMovesByLevel(pokemon.moves, 30, 35, allMoves)
	let level18Moves = getMovesByLevel(pokemon.moves, 35, 100, allMoves)
	const tmMoves = getMovesByType(pokemon.moves, "machine", allMoves)
	const eggMoves = getMovesByType(pokemon.moves, "egg", allMoves)

	if (result.minLevel >= 2) {
		startMoves = startMoves.concat(level2Moves)
		level2Moves = []
	} if (result.minLevel >= 6) {
		startMoves = startMoves.concat(level6Moves)
		level6Moves = []
	} if (result.minLevel >= 10) {
		startMoves = startMoves.concat(level10Moves)
		level10Moves = []
	} if (result.minLevel >= 14) {
		startMoves = startMoves.concat(level14Moves)
		level14Moves = []
	} if (result.minLevel >= 18) {
		startMoves = startMoves.concat(level18Moves)
		level18Moves = []
	}

	result.moves = { start: startMoves }
	if (level2Moves.length > 0) result.moves.level2 = level2Moves
	if (level6Moves.length > 0) result.moves.level6 = level6Moves
	if (level10Moves.length > 0) result.moves.level10 = level10Moves
	if (level14Moves.length > 0) result.moves.level14 = level14Moves
	if (level18Moves.length > 0) result.moves.level18 = level18Moves
	result.moves.tm = convertToTms(tmMoves, allTms)
	if (eggMoves.length > 0 && isLowestEvolution) {
		result.moves.egg = eggMoves
	}

	if (result.minLevel < 2 && level2Moves.length <= 0) console.log("  Level 2 moves were empty?")
	if (result.minLevel < 6 && level6Moves.length <= 0) console.log("  Level 6 moves were empty?")
	if (result.minLevel < 10 && level10Moves.length <= 0) console.log("  Level 10 moves were empty?")
	if (result.minLevel < 14 && level14Moves.length <= 0) console.log("  Level 14 moves were empty?")
	if (result.minLevel < 18 && level18Moves.length <= 0) console.log("  Level 18 moves were empty?")

	result.media = {
		main: pokemon.sprites.other["official-artwork"].front_default,
		mainShiny: pokemon.sprites.other["official-artwork"].front_shiny,
		sprite: pokemon.sprites.front_default,
		spriteShiny: pokemon.sprites.front_shiny,
	}

	doubleCheck(result)

	return result
}

function capitalize(s) {
	return s.charAt(0).toUpperCase() + s.slice(1)
}

function convertSize(height) {
	if (height <= 6) {
		return "tiny"
	} else if (height <= 13) {
		return "small"
	} else if (height <= 21) {
		return "medium"
	} else if (height <= 38) {
		return "large"
	} else if (height <= 90) {
		return "huge"
	} else {
		return "gargantuan"
	}
}

function calculateSr(stats, isLegendary) {
	if (isLegendary) {
		return 15
	}

	const statTotal = stats.reduce((sum, cur) => sum + cur.base_stat, 0)

	const rawSr = 2.3e-12 * Math.pow(statTotal, 4.67)

	if (rawSr < 0.25) {
		return 0.125
	} else if (rawSr <= 0.5) {
		return 0.25
	} else if (rawSr < 1) {
		return 0.5
	} else {
		return Math.min(14, Math.floor(rawSr))
	}
}

function convertMinLevel(baseExp, isLegendary) {
	if (isLegendary) {
		return 20
	} else if (baseExp > 300) {
		return 15
	} else if (baseExp > 250) {
		return 10
	} else if (baseExp > 150) {
		return 8
	} else if (baseExp > 120) {
		return 5
	} else {
		return 1
	}
}

function convertEggGroup(group) {
	switch (group.name) {
		case "ground": return "field"
		case "humanshape": return "human-like"
		case "indeterminate": return "amorphous"
		case "plant": return "grass"
		case "no-eggs": return "undiscovered"
		case "water1": return "water-1"
		case "water2": return "water-2"
		case "water3": return "water-3"
		default: return group.name
	}
}

function convertGender(genderRate) {
	switch (genderRate) {
		case 0: return "0:1"
		case 1: return "1:7"
		case 2: return "1:3"
		case 4: return "1:1"
		case 6: return "3:1"
		case 7: return "7:1"
		case 8: return "1:0"
		case -1: return "0:0"
		default: return UNKNOWN()
	}
}

function getDescription(species) {
	const type = species.genera.find((it) => it.language.name === "en")?.genus ?? UNKNOWN()
	const dex = species.flavor_text_entries.find((it) => it.language.name === "en")?.flavor_text ?? UNKNOWN()
	return `The ${type}. ${dex}`.replaceAll("\n", " ")
}

function stat(all, name) {
	return all.find((it) => it.stat.name === name).base_stat
}

function calculateAc(stats) {
	const def = stat(stats, "defense")
	const sdef = stat(stats, "special-defense")
	const total = def + sdef

	const ac = Math.max(10, Math.round(0.0391 * total + 9.18))
	if (ac >= 20) {
		console.warn("  AC >= 20!")
	}

	return ac
}

function calculateHp(minLevel, hitDice, con) {
	const diceValue = 1 + parseInt(hitDice.slice(1)) / 2
	const conMod = Math.floor(con / 2) - 5

	return 12 + minLevel * (diceValue + conMod)
}

function calculateHitDice(stats, evolution) {
	let bracket = 0
	const hp = stat(stats, "hp")
	if (hp <= 60) bracket = 0
	else if (hp <= 90) bracket = 1
	else if (hp <= 120) bracket = 2
	else if (hp <= 180) bracket = 3
	else bracket = 4

	if (evolution.maxStage === evolution.stage && bracket < 3) {
		++bracket
	}

	switch (bracket) {
		case 0: return "d6"
		case 1: return "d8"
		case 2: return "d10"
		case 3: return "d12"
		case 4: return "d20"
		default: return "d6"
	}
}

function calculateStr(stats) {
	const atk = stat(stats, "attack")
	const def = stat(stats, "defense")
	const total = atk + def

	const str = Math.round(0.0509 * total + 6.97)
	if (str > 20) {
		console.warn("  STR > 20!")
	} else if (str < 10) {
		console.warn("  STR < 10!")
	}

	return str
}

function calculateDex(stats) {
	const spd = stat(stats, "speed")

	const dex = Math.round(0.0996 * spd + 7.73)
	if (dex > 20) {
		console.warn("  DEX > 20!")
	} else if (dex < 10) {
		console.warn("  DEX < 10!")
	}

	return dex
}

function calculateCon(stats) {
	const hp = stat(stats, "hp")
	const def = stat(stats, "defense")
	const total = hp + def

	const con = Math.round(0.0467 * total + 7.9)
	if (con > 20) {
		console.warn("  CON > 20!")
	} else if (con < 10) {
		console.warn("  CON < 10!")
	}

	return con
}

function calculateInt(stats) {
	return 6
}

function calculateWis(stats) {
	const satk = stat(stats, "special-attack")
	const sdef = stat(stats, "special-defense")
	const total = satk + sdef

	const wis = Math.round(0.035 * total + 7.5)
	if (wis > 20) {
		console.warn("  WIS > 20!")
	} else if (wis < 10) {
		console.warn("  WIS < 10!")
	}

	return wis
}

function calculateCha(stats) {
	return 10
}

function convertAbility(ability, availableAbilities) {
	const id = ability.ability.name
	if (!availableAbilities.includes(id)) {
		console.log(`  Ability ${id} does not exist yet.`)
	}

	return {
		id: id,
		hidden: ability.is_hidden,
	}
}

function getMovesByType(allMoves, type, availableMoves) {
	return allMoves.filter((it) => {
		const method = it.version_group_details[0]

		return method.move_learn_method.name === type
	}).map((it) => {
		const name = it.move.name

		if (!availableMoves.includes(name)) {
			console.log(`  Move ${name} does not exist yet.`)
		}

		return name
	})
}

function getMovesByLevel(allMoves, startLevel, endLevel, availableMoves) {
	return allMoves.filter((it) => {
		const method = it.version_group_details[0]

		return method.move_learn_method.name === "level-up" && startLevel < method.level_learned_at && method.level_learned_at <= endLevel
	}).map((it) => {
		const name = it.move.name

		if (!availableMoves.includes(name)) {
			console.log(`  Move ${name} does not exist yet.`)
		}

		return name
	})
}

function convertToTms(moveList, availableTms) {
	return moveList
		.map((move) => availableTms.find((tm) => tm.move === move))
		.filter((tm) => tm != null)
		.map((tm) => tm.id)
		.sort((a, b) => a - b)
}

function createEvolutionDescription(name, evolution) {
	const result = { maxStage: 0 }

	const nodes = [{ depth: 1, value: evolution.chain }]
	while (nodes.length > 0) {
		const currentNode = nodes.shift()
		nodes.push(...currentNode.value.evolves_to.map((it) => ({ depth: currentNode.depth + 1, value: it, parent: currentNode })))

		if (currentNode.depth > result.maxStage)
			result.maxStage = currentNode.depth

		if (currentNode.value.species.name === name || (name.includes("-") && name.startsWith(currentNode.value.species.name))) {
			result.stage = currentNode.depth

			if (currentNode.depth > 1) {
				result.from = [currentNode.parent.value.species.name]
			}

			if (currentNode.value.evolves_to.length > 0) {
				result.to = currentNode.value.evolves_to.map((it) => ({
					id: it.species.name,
					conditions: [{ type: "level", value: UNKNOWN() }],
					effects: [{ type: "asi", value: UNKNOWN() }]
				}))
			}
		}
	}

	return result
}

function getIsLegendary(species) {
	return species.is_legendary || species.is_mythical
}

function UNKNOWN() {
	return "?UNKNOWN?"
}

async function readJsonFile(path) {
	return JSON.parse(await fs.readFile(path, { encoding: "utf-8" }))
}

function doubleCheck(result) {
	if (result.sr === 15) {
		console.log("  Legendary! Double check everything.")
	}

	if (result.type.includes("psychic")) {
		console.log("  Psychic type! Double check INT.")
	}

	if (result.type.includes("fairy") || result.type.includes("dark")) {
		console.log("  Fairy/Dark type! Double check CHA.")
	}
}

await main()
