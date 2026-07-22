import * as path from "path"
import * as fs from "fs/promises"

const pokemonJsonPath = path.join("static", "data", "pokemon.json")
const pokemonJsonPath2 = path.join("static", "data", "pokemon-2.json")
const jsonToObj = (json) => JSON.parse(json)

const asId = s => s.toLowerCase()
	.replace(/[\s]/g, "-")
	.replace("♀", "f")
	.replace("♂", "m")
	.replace(/[^a-z0-9\-]/g, "")

let NUMBER_OF_UNKNOWNS = 0

const findByName = (allPokemon, name) => allPokemon.find((it) => it.name === name)

const addPreEvolution = (pokemon, from) => {
	pokemon.evolution.from = pokemon.evolution.from ?? []
	pokemon.evolution.from.push(from.id)
}

const matchesLevelPattern = (description) => {
	const match = description.match(
		/^(.*?) can evolve into (.*?) at level (\d+) and above\. When it evolves.*?gains (\d+) points/,
	)

	return match ? {
		from: match[1],
		to: match[2],
		level: match[3],
		asi: match[4],
	} : undefined
}
const matchesLevelAndItemPattern = (description) => {
	const match = description.match(
		/^(.*?) can evolve into (.*?) at level (\d+) and above,? (with the help of|while holding) an? (.*?)\. When it evolves.*?gains (\d+) points/,
	)

	return match ? {
		from: match[1],
		to: match[2],
		level: match[3],
		item: match[5],
		asi: match[6],
	} : undefined
}
const matchesLevelAndLoyaltyPattern = (description) => {
	const match = description.match(
		/^(.*?) can evolve into (.*?) at level (\d+) and above,? (when its|if its|if it has a|only if it'?s) [lL]oyalty (level )?(is|of) (.*?) or higher. When it evolves.*?gains (\d+) points/,
	)

	return match ? {
		from: match[1],
		to: match[2],
		level: match[3],
		loyalty: match[7],
		asi: match[8],
	} : undefined
}
const matchesLearnedMovePattern = (description) => {
	let match = description.match(
		/^(.*?) can evolve into (.*?) at the time it learns '?(.*?)'?\. When it evolves.*?gains (\d+) points/,
	)
	if (!match) {
		match = description.match(
			/^(.*?) can evolve into (.*?) at the time '(.*?)' is learned\. When it evolves.*?gains (\d+) points/,
		)
	}

	return match ? {
		from: match[1],
		to: match[2],
		move: match[3],
		asi: match[4],
	} : undefined
}
const parseEvolutionDescription = (description, allPokemon) => {
	let match = matchesLevelAndItemPattern(description)
	if (match) {
		const from = findByName(allPokemon, match.from)
		const to = findByName(allPokemon, match.to)
		addPreEvolution(to, from)

		return [ {
			id: to.id,
			conditions: [ {
				type: "level",
				value: parseInt(match.level),
			}, {
				type: "item",
				value: match.item,
			} ],
			effects: [ {
				type: "asi",
				value: parseInt(match.asi),
			} ],
		} ]
	}

	match = matchesLevelAndLoyaltyPattern(description)
	if (match) {
		const from = findByName(allPokemon, match.from)
		const to = findByName(allPokemon, match.to)
		addPreEvolution(to, from)

		return [ {
			id: to.id,
			conditions: [ {
				type: "level",
				value: parseInt(match.level),
			}, {
				type: "loyalty",
				value: parseInt(match.loyalty),
			} ],
			effects: [ {
				type: "asi",
				value: parseInt(match.asi),
			} ],
		} ]
	}

	match = matchesLevelPattern(description)
	if (match) {
		const from = findByName(allPokemon, match.from)
		const to = findByName(allPokemon, match.to)
		addPreEvolution(to, from)

		return [ {
			id: to.id,
			conditions: [ {
				type: "level",
				value: parseInt(match.level),
			} ],
			effects: [ {
				type: "asi",
				value: parseInt(match.asi),
			} ],
		} ]
	}

	match = matchesLearnedMovePattern(description)
	if (match) {
		const from = findByName(allPokemon, match.from)
		const to = findByName(allPokemon, match.to)
		addPreEvolution(to, from)

		return [ {
			id: to.id,
			conditions: [ {
				type: "move",
				value: asId(match.move),
			} ],
			effects: [ {
				type: "asi",
				value: parseInt(match.asi),
			} ],
		} ]
	}

	return undefined
}

const SPECIAL_CASES = {
	pikachu: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Raichu"), pokemon)
		addPreEvolution(findByName(allPokemon, "Alolan Raichu"), pokemon)

		return {
			to: [ {
				id: "raichu",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "item",
					value: "Thunder Stone",
				} ],
				effects: [ {
					type: "asi",
					value: 9,
				} ],
			}, {
				id: "alolan-raichu",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "item",
					value: "Alola Stone",
				} ],
				effects: [ {
					type: "asi",
					value: 9,
				} ],
			} ],
		}
	},
	slowpoke: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Slowbro"), pokemon)
		addPreEvolution(findByName(allPokemon, "Slowking"), pokemon)

		return {
			to: [ {
				id: "slowbro",
				conditions: [ {
					type: "level",
					value: 10,
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			}, {
				id: "slowking",
				conditions: [ {
					type: "level",
					value: 10,
				}, {
					type: "item",
					value: "King's Rock",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			} ],
		}
	},
	cubone: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Marowak"), pokemon)
		addPreEvolution(findByName(allPokemon, "Alolan Marowak"), pokemon)

		return {
			to: [ {
				id: "marowak",
				conditions: [ {
					type: "level",
					value: 8,
				} ],
				effects: [ {
					type: "asi",
					value: 9,
				} ],
			}, {
				id: "alolan-marowak",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "item",
					value: "Alola Stone",
				} ],
				effects: [ {
					type: "asi",
					value: 9,
				} ],
			} ],
		}
	},
	koffing: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Weezing"), pokemon)
		addPreEvolution(findByName(allPokemon, "Galarian Weezing"), pokemon)

		return {
			to: [ {
				id: "weezing",
				conditions: [ {
					type: "level",
					value: 9,
				} ],
				effects: [ {
					type: "asi",
					value: 9,
				} ],
			}, {
				id: "galarian-weezing",
				conditions: [ {
					type: "level",
					value: 9,
				}, {
					type: "special",
					value: "while in a region with significant anthropogenic pollution",
				} ],
				effects: [ {
					type: "asi",
					value: 9,
				} ],
			} ],
		}
	},
	eevee: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Vaporeon"), pokemon)
		addPreEvolution(findByName(allPokemon, "Jolteon"), pokemon)
		addPreEvolution(findByName(allPokemon, "Flareon"), pokemon)
		addPreEvolution(findByName(allPokemon, "Leafeon"), pokemon)
		addPreEvolution(findByName(allPokemon, "Glaceon"), pokemon)
		addPreEvolution(findByName(allPokemon, "Espeon"), pokemon)
		addPreEvolution(findByName(allPokemon, "Umbreon"), pokemon)
		addPreEvolution(findByName(allPokemon, "Sylveon"), pokemon)

		return {
			to: [ {
				id: "vaporeon",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "item",
					value: "Water Stone",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			}, {
				id: "jolteon",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "item",
					value: "Thunder Stone",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			}, {
				id: "flareon",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "item",
					value: "Fire Stone",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			}, {
				id: "leafeon",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "item",
					value: "Leaf Stone",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			}, {
				id: "glaceon",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "item",
					value: "Ice Stone",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			}, {
				id: "espeon",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "loyalty",
					value: 2,
				}, {
					type: "time",
					value: "day",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			}, {
				id: "umbreon",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "loyalty",
					value: 2,
				}, {
					type: "time",
					value: "night",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			}, {
				id: "sylveon",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "loyalty",
					value: 2,
				}, {
					type: "move-type",
					value: "fairy",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			} ],
		}
	},
	dunsparce: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Dudunsparce"), pokemon)

		return {
			to: [ {
				id: "dudunsparce",
				conditions: [ {
					type: "level",
					value: 10,
				}, {
					type: "move",
					value: "hyper-drill",
				} ],
				effects: [ {
					type: "asi",
					value: 11,
				} ],
			} ],
		}
	},
	tyrogue: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Hitmonchan"), pokemon)
		addPreEvolution(findByName(allPokemon, "Hitmonlee"), pokemon)
		addPreEvolution(findByName(allPokemon, "Hitmontop"), pokemon)

		return {
			to: [ {
				id: "hitmonchan",
				conditions: [ {
					type: "level",
					value: 6,
				}, {
					type: "special",
					value: "if its STR is higher than its DEX",
				} ],
				effects: [ {
					type: "asi",
					value: 8,
				} ],
			}, {
				id: "hitmonlee",
				conditions: [ {
					type: "level",
					value: 6,
				}, {
					type: "special",
					value: "if its DEX is higher than its STR",
				} ],
				effects: [ {
					type: "asi",
					value: 8,
				} ],
			}, {
				id: "hitmontop",
				conditions: [ {
					type: "level",
					value: 6,
				}, {
					type: "special",
					value: "if its STR is equal to its DEX",
				} ],
				effects: [ {
					type: "asi",
					value: 8,
				} ],
			} ],
		}
	},
	wurmple: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Silcoon"), pokemon)
		addPreEvolution(findByName(allPokemon, "Cascoon"), pokemon)

		return {
			to: [ {
				id: "silcoon",
				conditions: [ {
					type: "level",
					value: 4,
				}, {
					type: "time",
					value: "day",
				} ],
				effects: [ {
					type: "asi",
					value: 6,
				} ],
			}, {
				id: "cascoon",
				conditions: [ {
					type: "level",
					value: 4,
				}, {
					type: "time",
					value: "night",
				} ],
				effects: [ {
					type: "asi",
					value: 6,
				} ],
			} ],
		}
	},
	kirlia: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Gardevoir"), pokemon)
		addPreEvolution(findByName(allPokemon, "Gallade"), pokemon)

		return {
			to: [ {
				id: "gardevoir",
				conditions: [ {
					type: "level",
					value: 12,
				} ],
				effects: [ {
					type: "asi",
					value: 11,
				} ],
			}, {
				id: "gallade",
				conditions: [ {
					type: "level",
					value: 12,
				}, {
					type: "gender",
					value: "male",
				}, {
					type: "item",
					value: "Dawn Stone",
				} ],
				effects: [ {
					type: "asi",
					value: 11,
				} ],
			} ],
		}
	},
	nincada: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Ninjask"), pokemon)
		addPreEvolution(findByName(allPokemon, "Shedinja"), pokemon)

		return {
			to: [ {
				id: "ninjask",
				conditions: [ {
					type: "level",
					value: 6,
				} ],
				effects: [ {
					type: "asi",
					value: 15,
				} ],
			}, {
				id: "shedinja",
				conditions: [ {
					type: "level",
					value: 6,
				}, {
					type: "special",
					value: "its trainer has an empty pokeball when Nincada evolves into Ninjask",
				} ],
				effects: [ {
					type: "special",
					value: "The Shedinja has all the base statistics that are in its stat block, plus any health and Ability Score Increases it would obtain from leveling up from its minimum found level.",
				} ],
			} ],
		}
	},
	snorunt: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Glalie"), pokemon)
		addPreEvolution(findByName(allPokemon, "Froslass"), pokemon)

		return {
			to: [ {
				id: "glalie",
				conditions: [ {
					type: "level",
					value: 14,
				} ],
				effects: [ {
					type: "asi",
					value: 13,
				} ],
			}, {
				id: "froslass",
				conditions: [ {
					type: "level",
					value: 14,
				}, {
					type: "gender",
					value: "female",
				}, {
					type: "item",
					value: "Dawn Stone",
				} ],
				effects: [ {
					type: "asi",
					value: 13,
				} ],
			} ],
		}
	},
	burmy: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Mothim"), pokemon)
		addPreEvolution(findByName(allPokemon, "Wormadam Plant Cloak"), pokemon)
		addPreEvolution(findByName(allPokemon, "Wormadam Sand Cloak"), pokemon)
		addPreEvolution(findByName(allPokemon, "Wormadam Trash Cloak"), pokemon)

		return {
			to: [ {
				id: "mothim",
				conditions: [ {
					type: "level",
					value: 6,
				}, {
					type: "gender",
					value: "male",
				} ],
				effects: [ {
					type: "asi",
					value: 9,
				} ],
			}, {
				id: "wormadam-plant-cloak",
				conditions: [ {
					type: "level",
					value: 6,
				}, {
					type: "gender",
					value: "female",
				}, {
					type: "special",
					value: "in a tall grass/forest",
				} ],
				effects: [ {
					type: "asi",
					value: 9,
				} ],
			}, {
				id: "wormadam-sand-cloak",
				conditions: [ {
					type: "level",
					value: 6,
				}, {
					type: "gender",
					value: "female",
				}, {
					type: "special",
					value: "in a tall cave/desert/mountain",
				} ],
				effects: [ {
					type: "asi",
					value: 9,
				} ],
			}, {
				id: "wormadam-trash-cloak",
				conditions: [ {
					type: "level",
					value: 6,
				}, {
					type: "gender",
					value: "female",
				}, {
					type: "special",
					value: "in a city or building",
				} ],
				effects: [ {
					type: "asi",
					value: 9,
				} ],
			} ],
		}
	},
	combee: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Vespiquen"), pokemon)

		return {
			to: [ {
				id: "vespiquen",
				conditions: [ {
					type: "level",
					value: 7,
				}, {
					type: "gender",
					value: "female",
				} ],
				effects: [ {
					type: "asi",
					value: 17,
				} ],
			} ],
		}
	},
	"mime-jr": (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Mr. Mime"), pokemon)
		addPreEvolution(findByName(allPokemon, "Galarian Mr. Mime"), pokemon)

		return {
			to: [ {
				id: "mr-mime",
				conditions: [ {
					type: "move",
					value: "mimic",
				} ],
				effects: [ {
					type: "asi",
					value: 8,
				} ],
			}, {
				id: "galarian-mr-mime",
				conditions: [ {
					type: "move",
					value: "mimic",
				}, {
					type: "special",
					value: "in a region of typically cool climate",
				} ],
				effects: [ {
					type: "asi",
					value: 8,
				} ],
			} ],
		}
	},
	riolu: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Lucario"), pokemon)

		return {
			to: [ {
				id: "mr-mime",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "loyalty",
					value: 2,
				}, {
					type: "time",
					value: "day",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			} ],
		}
	},
	mantyke: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Mantine"), pokemon)

		return {
			to: [ {
				id: "mantine",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "special",
					value: "when Remoraid is also in the party",
				} ],
				effects: [ {
					type: "asi",
					value: 6,
				} ],
			} ],
		}
	},
	karrablast: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Escavalier"), pokemon)

		return {
			to: [ {
				id: "escavalier",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "special",
					value: "while in the presence of a Shelmet",
				} ],
				effects: [ {
					type: "asi",
					value: 10,
				} ],
			} ],
		}
	},
	shelmet: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Accelgor"), pokemon)

		return {
			to: [ {
				id: "accelgor",
				conditions: [ {
					type: "level",
					value: 10,
				}, {
					type: "special",
					value: "while in the presence of a Karrablast",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			} ],
		}
	},
	pancham: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Pangoro"), pokemon)

		return {
			to: [ {
				id: "pangoro",
				conditions: [ {
					type: "level",
					value: 9,
				}, {
					type: "special",
					value: "its trainer has another dark-type Pokemon in their party",
				} ],
				effects: [ {
					type: "asi",
					value: 11,
				} ],
			} ],
		}
	},
	espurr: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Meowstic ♂"), pokemon)
		addPreEvolution(findByName(allPokemon, "Meowstic ♀"), pokemon)

		return {
			to: [ {
				id: "meowstic-m",
				conditions: [ {
					type: "level",
					value: 7,
				}, {
					type: "gender",
					value: "male",
				} ],
				effects: [ {
					type: "asi",
					value: 12,
				} ],
			}, {
				id: "meowstic-4",
				conditions: [ {
					type: "level",
					value: 7,
				}, {
					type: "gender",
					value: "female",
				} ],
				effects: [ {
					type: "asi",
					value: 12,
				} ],
			} ],
		}
	},
	tyrunt: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Tyrantrum"), pokemon)

		return {
			to: [ {
				id: "tyrantrum",
				conditions: [ {
					type: "level",
					value: 10,
				}, {
					type: "time",
					value: "day",
				} ],
				effects: [ {
					type: "asi",
					value: 11,
				} ],
			} ],
		}
	},
	amaura: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Aurorus"), pokemon)

		return {
			to: [ {
				id: "aurorus",
				conditions: [ {
					type: "level",
					value: 10,
				}, {
					type: "time",
					value: "night",
				} ],
				effects: [ {
					type: "asi",
					value: 10,
				} ],
			} ],
		}
	},
	sliggoo: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Goodra"), pokemon)

		return {
			to: [ {
				id: "goodra",
				conditions: [ {
					type: "level",
					value: 16,
				}, {
					type: "special",
					value: "while raining",
				} ],
				effects: [ {
					type: "asi",
					value: 12,
				} ],
			} ],
		}
	},
	yungoos: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Gumshoos"), pokemon)

		return {
			to: [ {
				id: "gumshoos",
				conditions: [ {
					type: "level",
					value: 6,
				}, {
					type: "time",
					value: "day",
				} ],
				effects: [ {
					type: "asi",
					value: 10,
				} ],
			} ],
		}
	},
	rockruff: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Lycanroc Midday Form"), pokemon)
		addPreEvolution(findByName(allPokemon, "Lycanroc Midnight Form"), pokemon)
		addPreEvolution(findByName(allPokemon, "Lycanroc Dusk Form"), pokemon)

		return {
			to: [ {
				id: "lycanroc-midday-form",
				conditions: [ {
					type: "level",
					value: 9,
				}, {
					type: "time",
					value: "morning",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			}, {
				id: "lycanroc-midnight-form",
				conditions: [ {
					type: "level",
					value: 9,
				}, {
					type: "time",
					value: "night",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			}, {
				id: "lycanroc-dusk-form",
				conditions: [ {
					type: "level",
					value: 9,
				}, {
					type: "time",
					value: "afternoon",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			} ],
		}
	},
	fomantis: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Lurantis"), pokemon)

		return {
			to: [ {
				id: "lurantis",
				conditions: [ {
					type: "level",
					value: 9,
				}, {
					type: "time",
					value: "day",
				} ],
				effects: [ {
					type: "asi",
					value: 12,
				} ],
			} ],
		}
	},
	salandit: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Salazzle"), pokemon)

		return {
			to: [ {
				id: "salazzle",
				conditions: [ {
					type: "level",
					value: 9,
				}, {
					type: "gender",
					value: "female",
				} ],
				effects: [ {
					type: "asi",
					value: 10,
				} ],
			} ],
		}
	},
	cosmoem: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Solgaleo"), pokemon)
		addPreEvolution(findByName(allPokemon, "Lunala"), pokemon)

		return {
			to: [ {
				id: "solgaleo",
				conditions: [ {
					type: "level",
					value: 16,
				}, {
					type: "time",
					value: "day",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			}, {
				id: "lunala",
				conditions: [ {
					type: "level",
					value: 16,
				}, {
					type: "time",
					value: "night",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			} ],
		}
	},
	"galarian-slowpoke": (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Galarian Slowbro"), pokemon)
		addPreEvolution(findByName(allPokemon, "Galarian Slowking"), pokemon)

		return {
			to: [ {
				id: "galarian-slowbro",
				conditions: [ {
					type: "level",
					value: 10,
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			}, {
				id: "galarian-slowking",
				conditions: [ {
					type: "level",
					value: 10,
				}, {
					type: "item",
					value: "King's Rock",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			} ],
		}
	},
	"galarian-farfetchd": (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Sirfetch'd"), pokemon)

		return {
			to: [ {
				id: "sirfetchd",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "special",
					value: "after enduring a single battle where it lands three critical hits",
				} ],
				effects: [ {
					type: "asi",
					value: 11,
				} ],
			} ],
		}
	},
	"galarian-corsola": (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Cursola"), pokemon)

		return {
			to: [ {
				id: "cursola",
				conditions: [ {
					type: "level",
					value: 11,
				} ],
				effects: [ {
					type: "asi",
					value: 9,
				} ],
			} ],
		}
	},
	"galarian-linoone": (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Obstagoon"), pokemon)

		return {
			to: [ {
				id: "obstagoon",
				conditions: [ {
					type: "level",
					value: 14,
				}, {
					type: "time",
					value: "night",
				} ],
				effects: [ {
					type: "asi",
					value: 9,
				} ],
			} ],
		}
	},
	applin: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Flapple"), pokemon)
		addPreEvolution(findByName(allPokemon, "Appletun"), pokemon)

		return {
			to: [ {
				id: "flapple",
				conditions: [ {
					type: "level",
					value: 5,
				}, {
					type: "special",
					value: "inhabiting a green or gold apple",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			}, {
				id: "appletun",
				conditions: [ {
					type: "level",
					value: 5,
				}, {
					type: "special",
					value: "inhabiting a red apple",
				} ],
				effects: [ {
					type: "asi",
					value: 14,
				} ],
			} ],
		}
	},
	toxel: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Toxtricity (Amped)"), pokemon)
		addPreEvolution(findByName(allPokemon, "Toxtricity (Low Key)"), pokemon)

		return {
			to: [ {
				id: "toxtricity-amped",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "special",
					value: "its nature is Arrogant, Brave, Energetic, Grumpy, Hardy, Hasty, Naughty, Rash, Reckless, or Sassy",
				} ],
				effects: [ {
					type: "asi",
					value: 11,
				} ],
			}, {
				id: "toxtricity-low-key",
				conditions: [ {
					type: "level",
					value: 8,
				}, {
					type: "special",
					value: "its nature is NOT Arrogant, Brave, Energetic, Grumpy, Hardy, Hasty, Naughty, Rash, Reckless, or Sassy",
				} ],
				effects: [ {
					type: "asi",
					value: 11,
				} ],
			} ],
		}
	},
	clobbopus: (pokemon, allPokemon) => {
		addPreEvolution(findByName(allPokemon, "Grapploct"), pokemon)

		return {
			to: [ {
				id: "grapploct",
				conditions: [ {
					type: "level",
					value: 5,
				}, {
					type: "move",
					value: "taunt",
				} ],
				effects: [ {
					type: "asi",
					value: 11,
				} ],
			} ],
		}
	},
}

const addEvolutionChain = (allPokemon) => allPokemon.map((pokemon) => {
	if (SPECIAL_CASES[pokemon.id]) {
		const to = SPECIAL_CASES[pokemon.id](pokemon, allPokemon)
		return {
			...pokemon,
			evolution: {
				...pokemon.evolution,
				...to,
			},
		}
	}
    
	const evolution = pokemon.evolution

	if (evolution?.description) {
		try {
			const to = parseEvolutionDescription(evolution.description, allPokemon)
			if (to == null) {
				++NUMBER_OF_UNKNOWNS
				console.log(`${pokemon.name}: description did not match any patterns.`)
			} else {
				evolution.to = to
			}
		} catch (e) {
			++NUMBER_OF_UNKNOWNS
			console.log(`ERROR! ${pokemon.name}: ${e.message}`)
		}
	}

	return {
		...pokemon,
		evolution,
	}
})

const listIntoObject = (items) => ({ items })

const toFile = (filePath) => (obj) => fs.writeFile(filePath, JSON.stringify(obj, null, 2), { encoding: "utf-8" })

fs.readFile(pokemonJsonPath, { encoding: "utf-8" })
	.then(jsonToObj)
	.then(obj => obj.items)
	.then(addEvolutionChain)
	.then(listIntoObject)
	.then(toFile(pokemonJsonPath2))
	.then(() => console.log(`\nFinished with ${NUMBER_OF_UNKNOWNS} unknown cases`))
