import fs from "node:fs/promises"
import path from "node:path"

const POKEAPI_POKEMON_PATH = path.join("scripts", "tms", ".pokeapi", "pokemon.json")
const MOVES_PATH = path.join("static", "data", "moves.json")
const POKEMON_PATH = path.join("static", "data", "pokemon.json")
const POKEMON_2_PATH = path.join("static", "data", "pokemon-2.json")

type PokeApiPokemon = {
	id: number,
	name: string,
	moves: {
		move: {
			name: string,
		},
		version_group_details: {
			level_learned_at: number,
			move_learn_method: {
				name: string,
			},
			version_group: {
				name: string,
			}
		}[],
	}[]
}

type Tm = {
	id: string,
	tm: {
		id: number,
		cost: number,
	},
}

type Pokemon = {
	id: string,
	moves: {
		tm: number[],
	},
}

async function getPokemonFromApi(): Promise<PokeApiPokemon[]> {
	return JSON.parse(await fs.readFile(POKEAPI_POKEMON_PATH, { encoding: "utf-8" })).pokemon
}

async function getPoke5eTms(): Promise<Map<string, number>> {
	const tmToNumber = new Map<string, number>()
	const tms: Tm[] = JSON.parse(await fs.readFile(MOVES_PATH, { encoding: "utf-8" })).moves
		.filter((it: Tm) => it.tm != null)
		.toSorted((a: Tm, b: Tm) => a.tm.id - b.tm.id)
	
	for (const tm of tms) {
		tmToNumber.set(tm.id, tm.tm.id)
	}

	return tmToNumber
}

async function getPoke5ePokemon(): Promise<Pokemon[]> {
	return JSON.parse(await fs.readFile(POKEMON_PATH, { encoding: "utf-8" })).items
}

function getLearnedAsTmInSV(pokemon: PokeApiPokemon[]): Map<string, string[]> {
	const flattened = new Map<string, string[]>()

	for (const p of pokemon) {
		const filteredMoves = p.moves.filter((poke) => poke.version_group_details.some((move) => move.move_learn_method.name === "machine" && move.version_group.name === "scarlet-violet"))

		flattened.set(p.name, filteredMoves.map((it) => it.move.name))
	}

	return flattened
}

const POKE5E_TO_API_ID_MAP: Record<string, string | undefined> = {
	"sunny-castform": "castform",
	"rainy-castform": "castform",
	"snowy-castform": "castform",
	"deoxys": "deoxys-normal",
	"wormadam-plant-cloak": "wormadam-plant",
	"wormadam-sand-cloak": "wormadam-sandy",
	"wormadam-trash-cloak": "wormadam-trash",
	"giratina-altered-forme": "giratina-altered",
	"giratina-origin-forme": "giratina-altered",
	"basculin": "basculin-red-striped",
	"darmanitan": "darmanitan-standard",
	"tornadus": "tornadus-incarnate",
	"thundurus": "thundurus-incarnate",
	"landorus": "landorus-incarnate",
	"white-kyurem": "kyurem",
	"black-kyurem": "kyurem",
	"keldeo": "keldeo-ordinary",
	"meloetta---aria": "meloetta-aria",
	"meloetta---pirouette": "meloetta-pirouette",
	"meowstic-m": "meowstic-male",
	"meowstic-f": "meowstic-female",
	"aegislash": "aegislash-shield",
	"pumpkaboo": "pumpkaboo-average",
	"gourgeist": "gourgeist-average",
	"zygarde-10-forme": "zygarde-10",
	"zygarde-50-forme": "zygarde-50",
	"zygarde-complete-forme": "zygarde-complete",
	"hoopa-confined": "hoopa",
	"alolan-rattata": "rattata-alola",
	"alolan-raticate": "raticate-alola",
	"alolan-raichu": "raichu-alola",
	"alolan-sandshrew": "sandshrew-alola",
	"alolan-sandslash": "sandslash-alola",
	"alolan-vulpix": "vulpix-alola",
	"alolan-ninetales": "ninetales-alola",
	"alolan-diglett": "diglett-alola",
	"alolan-dugtrio": "dugtrio-alola",
	"alolan-meowth": "meowth-alola",
	"alolan-persian": "persian-alola",
	"alolan-geodude": "geodude-alola",
	"alolan-graveler": "graveler-alola",
	"alolan-golem": "golem-alola",
	"alolan-grimer": "grimer-alola",
	"alolan-muk": "muk-alola",
	"alolan-exeggutor": "exeggutor-alola",
	"alolan-marowak": "marowak-alola",
	"oricorio-baile-style": "oricorio-baile",
	"oricorio-pom-pom-style": "oricorio-pom-pom",
	"oricorio-pau-style": "oricorio-pau",
	"oricorio-sensu-style": "oricorio-sensu",
	"lycanroc-midday-form": "lycanroc-midday",
	"lycanroc-midnight-form": "lycanroc-midnight",
	"lycanroc-dusk-form": "lycanroc-dusk",
	"wishiwashi-solo-form": "wishiwashi-solo",
	"wishiwashi-school-form": "wishiwashi-solo",
	"minior-meteor-form": "minior-red-meteor",
	"minior-core-form": "minior-red-meteor",
	"mimikyu": "mimikyu-disguised",
	"dusk-mane-necrozma": "necrozma",
	"dawn-wings-necrozma": "necrozma",
	"ultra-necrozma": "necrozma",
	"galarian-meowth": "meowth-galar",
	"galarian-ponyta": "ponyta-galar",
	"galarian-rapidash": "rapidash-galar",
	"galarian-slowpoke": "slowpoke-galar",
	"galarian-slowbro": "slowbro-galar",
	"galarian-farfetchd": "farfetchd-galar",
	"galarian-weezing": "weezing-galar",
	"galarian-mr-mime": "mr-mime-galar",
	"galarian-slowking": "slowking-galar",
	"galarian-corsola": "corsola-galar",
	"galarian-zigzagoon": "zigzagoon-galar",
	"galarian-linoone": "linoone-galar",
	"galarian-darumaka": "darumaka-galar",
	"galarian-darmanitan": "darmanitan-galar-standard",
	"galarian-yamask": "yamask-galar",
	"galarian-stunfisk": "stunfisk-galar",
	"eiscue": "eiscue-ice",
	"indeedee-m": "indeedee-male",
	"indeedee-f": "indeedee-female",
	"morpeko": "morpeko-full-belly",
	"urshifu-single": "urshifu-single-strike",
	"urshifu-rapid": "urshifu-rapid-strike",
	"basculegion-m": "basculegion-male",
	"basculegion-f": "basculegion-female",
	"enamorus": "enamorus-incarnate",
	"maushold": "maushold-family-of-four",
	"squawkabilly": "squawkabilly-green-plumage",
	"palafin": "palafin-zero",
	"tatsugiri": "tatsugiri-curly",
	"dudunsparce": "dudunsparce-two-segment",
	"ogerpon-heartflame-mask": "ogerpon",
	"terapagos-terastal-form": "ogerpon",
	"terapagos-stellar-form": "ogerpon",
	"rookite": undefined,
	"belseraph": undefined,
	"droideon": undefined,
	"brawleon": undefined,
	"specteon": undefined,
	"toxeon": undefined,
	"minereon": undefined,
	"aereon": undefined,
	"pesteon": undefined,
	"terreon": undefined,
	"drakeon": undefined,
	"eeveon": undefined,
}

async function main() {
	const apiPokemon = await getPokemonFromApi()
	const pokemonToTms = getLearnedAsTmInSV(apiPokemon)
	
	const poke5eTms = await getPoke5eTms()
	const poke5ePokemon = await getPoke5ePokemon()


	for (const pokemon of poke5ePokemon) {
		const tmsToAdd = pokemonToTms.get(pokemon.id) ?? pokemonToTms.get(POKE5E_TO_API_ID_MAP[pokemon.id] ?? "")
		if (tmsToAdd == null) {
			console.log("No TMs for ", pokemon.id)
			continue
		}

		const newTmNums = tmsToAdd.map((it) => poke5eTms.get(it)).filter((it) => it != null)

		const combinedTms = (pokemon.moves?.tm ?? []).concat(newTmNums)
		const deduped = Array.from(new Set(combinedTms)).sort((a, b) => a - b)
		pokemon.moves.tm = deduped
	}

	await fs.writeFile(POKEMON_2_PATH, JSON.stringify({ items: poke5ePokemon }, null, "\t"), { encoding: "utf-8" })
}

main()