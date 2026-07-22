import fs from "node:fs/promises"
import path from "node:path"

type PokeType = "normal" | "fighting" | "flying" | "poison" | "ground" | "rock" | "bug" | "ghost" | "steel" | "fire" | "water" | "grass" | "electric" | "psychic" | "ice" | "dragon" | "dark" | "fairy"

type Attribute = "str" | "dex" | "con" | "int" | "wis" | "cha"

type OldMove = {
	id: string,
	name: string,
	type: PokeType,
	power: Attribute[],
	time: string,
	pp: number,
	duration: string,
	range: string,
	description: string[],
	higherLevels?: string,
	tm?: {
		id: number,
		cost: number,
	},
}

type Area = {
	shape: "circle",
	radius: number,
} | {
	shape: "cylinder",
	radius: number,
	height: number,
} | {
	shape: "cone",
	distance: number,
} | {
	shape: "cube",
	size: number,
}

type RangeDescription = {
	targets: "area" | number
	feet: "self" | "melee" | number
	area?: Area
}

type AttackDescription = {
	scope: "melee" | "ranged"
}

type SaveDescription = {
	attribute: Attribute[],
	dc: number | "MOVE"
}

type DamageDescripton = {
	dice: {
		1: string,
		5: string,
		10: string,
		17: string,
	},
	modifier: number | "MOVE",
	type: PokeType[],
}

type NewMove = OldMove & {
	rangeDescription?: RangeDescription,
	attack?: AttackDescription,
	save?: SaveDescription,
	damage?: DamageDescripton,
}

async function readJsonFile(filePath: string) {
	return JSON.parse(await fs.readFile(filePath, { encoding: "utf-8" }))
}

async function writeJsonFile(filePath: string, json: object) {
	return await fs.writeFile(filePath, JSON.stringify(json, null, "\t"), { encoding: "utf-8" })
}

const Regex = {
	damage: /(\d+d\d+)\s*(\+\s*(move|\d+))?\s*(.*?)\s*damage/ig,
	damageScaling: /^The damage dice rolls? for this move changes? to (\d+d\d+) at level 5, (\d+d\d+) at level 10, and (\d+d\d+) at level 17.$/i,
	save: /a\s+(str|dex|con|int|wis|cha)\s+(save|saving throw)/ig,
	dc: /(move)?\s*dc\s*(\d+)?/i,
	attack: /(melee|ranged)\s+attack/ig,
}

function isSingleType(value: string): value is PokeType {
	return [
		"normal",
		"fighting",
		"flying",
		"poison",
		"ground",
		"rock",
		"bug",
		"ghost",
		"steel",
		"fire",
		"water",
		"grass",
		"electric",
		"psychic",
		"ice",
		"dragon",
		"dark",
		"fairy",
	].includes(value.toLocaleLowerCase())
}

function isAttribute(value: string): value is Attribute {
	return [
		"str",
		"dex",
		"con",
		"int",
		"wis",
		"cha",
	].includes(value.toLocaleLowerCase())
}

let audited = 0

function augmentOldMoveWithDescriptions(move: OldMove, manualMoves: NewMove[]): NewMove {
	const manualMove = manualMoves.find((it) => it.id === move.id)
	if (manualMove) return manualMove

	const audit = (reason: string) => {
		++audited
		console.log(move.id, reason)
		return move
	}

	const newMove: NewMove = { ...move }
	const totalDescription = move.description.reduce((all, cur) => all + "\n" + cur, "")

	// DAMAGE
	const damageDice = Array.from(totalDescription.matchAll(Regex.damage))
	if (damageDice.length > 1) {
		const damages = damageDice.map((it) => it[1])
		const dedupe = new Set(damages)

		if (dedupe.size > 1) return audit(`Different damage dice provided ${Array.from(dedupe)}`)
	}
	// if (damageDice.length > 1) return audit("Damage dice specified more than once?")
	if (damageDice.length >= 1) {
		const [damageClause, lv1, modifierClause, modifier, damageType] = damageDice[0]
		if (!isSingleType(damageType)) return audit(`Damage type was weird (${damageType})?`)
		if (move.higherLevels == null) return audit("Damage move has no higher level scaling?")

		const damageScaling = move.higherLevels.match(Regex.damageScaling)
		if (damageScaling == null) return audit("Damage scaling has weird format?")
		const [scalingClause, lv5, lv10, lv17] = damageScaling

		newMove.damage = {
			dice: {
				"1": lv1,
				"5": lv5,
				"10": lv10,
				"17": lv17,
			},
			modifier: modifier == null ? 0 : modifier.toLocaleUpperCase() as number | "MOVE",
			type: [damageType],
		}
	}

	// SAVE
	const saves = Array.from(totalDescription.matchAll(Regex.save))
	if (saves.length > 1) return audit("Saves specified more than once?")
	if (saves.length === 1) {
		const [saveClause, saveAttr] = saves[0]
		if (!isAttribute(saveAttr)) return audit(`Save attribute is weird (${saveAttr})?`)
		// const dc = totalDescription.match(Regex.dc)
		// if (dc == null) return audit("Save does not have a DC?")
		// const [dcClause, dcMove, dcNumber] = dc

		// if ((dcMove == null || dcMove === "") && (dcNumber == null || dcNumber === ""))
		// 	return audit(`Save DC was weird (${dcClause})?`)

		newMove.save = {
			attribute: [saveAttr.toLocaleLowerCase() as Attribute],
			// dc: dcMove != null ? dcMove.toLocaleUpperCase() as "MOVE" : parseInt(dcNumber),
			dc: "MOVE",
		}
	}

	// ATTACK
	const attack = Array.from(totalDescription.matchAll(Regex.attack))
	if (attack.length > 1) return audit("Attack type specified more than once?")
	if (attack.length === 1) {
		const [attackClause, attackScope] = attack[0]
		const attackScopeLower = attackScope.toLocaleLowerCase()
		if (attackScopeLower !== "melee" && attackScopeLower !== "ranged")
			return audit(`Attack scope was weird (${attackScope})?`)

		newMove.attack = {
			scope: attackScopeLower,
		}
	}

	// if (newMove.damage != null && newMove.save == null && newMove.attack == null)
	// 	return audit("Damage specified, but no save or attack?")
		
	// RANGE
	// ignoring for now, pretty complicated

	return newMove
}

const OLD_PATH = path.join("static", "data", "moves.json")
const MANUAL_PATH = path.join("scripts", "moves", "manual.json")
const NEW_PATH = path.join("static", "data", "moves-2.json")

async function main() {
	const allMoves: OldMove[] = (await readJsonFile(OLD_PATH)).moves
	const manualMoves: NewMove[] = (await readJsonFile(MANUAL_PATH)).moves

	const newMoves = allMoves.map((move) => augmentOldMoveWithDescriptions(move, manualMoves))

	await writeJsonFile(NEW_PATH, { moves: newMoves })

	console.log("Completed; auditing", audited)
}

main()
