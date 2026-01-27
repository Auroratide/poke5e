import fs from "node:fs/promises"
import path from "node:path"

const POKEAPI_TMS_PATH = path.join("scripts", "tms", ".pokeapi", "tms.json")
const POKEAPI_ITEMS_PATH = path.join("scripts", "tms", ".pokeapi", "items.json")
const MOVES_PATH = path.join("static", "data", "moves.json")
const MOVES_2_PATH = path.join("static", "data", "moves-2.json")

type PokeApiTm = {
	id: number,
	item: {
		name: string,
	},
	move: {
		name: string,
	},
	version_group: {
		name: string,
	},
}

type PokeApiItem = {
	name: string,
	cost: number,
}

type Move = {
	id: string,
	tm?: {
		id: number,
		cost: number,
	},
}

type Tm = {
	id: string,
	tm?: {
		id: number,
		cost: number,
	},
}

const normalizeCost = (fromRange: [number, number], toRange: [number, number]) => (nativeCost: number): number => {
	const normalizedPosition = (nativeCost - fromRange[0]) / (fromRange[1] - fromRange[0])
	const rawCost = toRange[0] + normalizedPosition * (toRange[1] - toRange[0])
	return 100 * Math.round(rawCost / 100)
}

const normalizeApiCost = normalizeCost([1000, 100000], [2500, 15000])
const normalizeBulbapediaCost = normalizeCost([200, 15000], [2500, 15000])

/**
 * These are 0 in the api. Ripped the cost from Bulbapedia instead.
 */
const MANUAL_COST_MAP: Record<string, number> = {
	"dragon-dance": 5000,
	"power-gem": 8000,
	"gunk-shot": 5000,
	"iron-defense": 1500,
	"drill-run": 8000,
	"crunch": 8000,
	"trick": 5000,
	"liquidation": 10000,
	"giga-drain": 8000,
	"aura-sphere": 8000,
	"tailwind": 5000,
	"dragon-pulse": 8000,
	"stealth-rock": 5000,
	"hyper-voice": 8000,
	"heat-wave": 10000,
	"heavy-slam": 5000,
	"encore": 3000,
	"ice-spinner": 10000,
	"play-rough": 10000,
	"amnesia": 1500,
	"helping-hand": 400,
	"pollen-puff": 10000,
	"baton-pass": 3000,
	"earth-power": 10000,
	"reversal": 3000,
	"electric-terrain": 3000,
	"grassy-terrain": 3000,
	"psychic-terrain": 3000,
	"misty-terrain": 3000,
	"nasty-plot": 5000,
	"hydro-pump": 12000,
	"fire-pledge": 8000,
	"water-pledge": 8000,
	"grass-pledge": 8000,
	"phantom-force": 10000,
	"blast-burn": 14000,
	"hydro-cannon": 14000,
	"frenzy-plant": 14000,
	"outrage": 12000,
	"leaf-storm": 12000,
	"hurricane": 12000,
	"bug-buzz": 3000,
	"brave-bird": 12000,
	"flare-blitz": 12000,
	"close-combat": 12000,
	"draco-meteor": 14000,
	"steel-beam": 14000,
	"tera-blast": 8000,
	"charge": 400,
	"haze": 400,
	"sand-tomb": 3000,
	"spite": 200,
	"gravity": 400,
	"knock-off": 14000,
	"bug-bite": 3000,
	"super-fang": 5000,
	"vacuum-wave": 3000,
	"lunge": 5000,
	"high-horsepower": 5000,
	"icicle-spear": 3000,
	"heat-crash": 8000,
	"solar-blade": 400,
	"uproar": 5000,
	"focus-punch": 400,
	"weather-ball": 1500,
	"grassy-glide": 10000,
	"burning-jealousy": 8000,
	"flip-turn": 5000,
	"dual-wingbeat": 5000,
	"poltergeist": 14000,
	"lash-out": 5000,
	"scale-shot": 10000,
	"misty-explosion": 14000,
	"pain-split": 3000,
	"double-edge": 800,
	"endeavor": 5000,
	"petal-blizzard": 5000,
	"temper-flare": 3000,
	"whirlpool": 1500,
	"muddy-water": 10000,
	"supercell-slam": 5000,
	"electroweb": 400,
	"triple-axel": 8000,
	"coaching": 800,
	"scorching-sands": 10000,
	"feather-dance": 400,
	"future-sight": 5000,
	"expanding-force": 10000,
	"skitter-smack": 3000,
	"meteor-beam": 15000,
	"throat-chop": 5000,
	"breaking-swipe": 8000,
	"metal-sound": 800,
	"curse": 400,
	"hard-press": 5000,
	"dragon-cheer": 1500,
	"alluring-voice": 3000,
	"psychic-noise": 3000,
	"upper-hand": 1500,
}

async function getScarletVioletTmMasterList(): Promise<PokeApiTm[]> {
	return JSON.parse(await fs.readFile(POKEAPI_TMS_PATH, { encoding: "utf-8" })).tms
		.filter((it: PokeApiTm) => it.version_group.name === "scarlet-violet")
}

async function getItemsList(): Promise<PokeApiItem[]> {
	return JSON.parse(await fs.readFile(POKEAPI_ITEMS_PATH, { encoding: "utf-8" })).items
}

async function getAllMoves(): Promise<Move[]> {
	return JSON.parse(await fs.readFile(MOVES_PATH, { encoding: "utf-8" })).moves
}

function getTmsNotInMyList(fromApi: PokeApiTm[], fromMyList: Tm[]): PokeApiTm[] {
	const myIds = fromMyList.map((it) => it.id)
	return fromApi.filter((apiMove) => !myIds.includes(apiMove.move.name))
}

function addTmsToMoves(tmsToAdd: PokeApiTm[], itemsWithCost: PokeApiItem[], allMoves: Move[], startingNumber: number): Move[] {
	for (const tm of tmsToAdd) {
		const correspondingItem = itemsWithCost.find((item) => item.name === tm.item.name)
		const move = allMoves.find((move) => move.id === tm.move.name)

		if (move == null) {
			console.log("MISSING MOVE:", tm.move.name)
			continue
		}

		move.tm = {
			id: startingNumber++,
			cost: (correspondingItem?.cost ?? 0) !== 0
				? normalizeApiCost(correspondingItem?.cost ?? 0)
				: normalizeBulbapediaCost(MANUAL_COST_MAP[tm.move.name]),
		}

		console.log(tm.move.name, move.tm.cost)
	}

	return allMoves
}

async function main() {
	const apiTms = await getScarletVioletTmMasterList()
	const items = await getItemsList()
	const allMoves = await getAllMoves()
	const myTms: Tm[] = allMoves.filter((it) => it.tm != null)

	const newTms = getTmsNotInMyList(apiTms, myTms)

	const finishedMoves = addTmsToMoves(newTms, items, allMoves, myTms.length + 1)

	await fs.writeFile(MOVES_2_PATH, JSON.stringify({ moves: finishedMoves }, null, "\t"), { encoding: "utf-8" })
}

main()
