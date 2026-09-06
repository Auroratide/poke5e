import { DataClass, type Data } from "$lib/DataClass"
import type { Attributes } from "$lib/dnd/attributes"
import type { Level } from "$lib/dnd/level"
import type { PokemonSpecies } from "$lib/poke5e/species"
import type { MoveLearnMethod } from "$lib/pokemon/move-pool"
import { Stab } from "$lib/pokemon/stab"
import { type PokeType } from "$lib/pokemon/types"
import type { Edition } from "$lib/srd/editions"
import type { BodyText, TableNode } from "$lib/ui/rendering/types"
import { ContestDetails } from "./contest/ContestDetails"
import { MoveAttack } from "./MoveAttack"
import { MovePower } from "./MovePower"
import { MoveSave } from "./MoveSave"
import type { MoveStats } from "./MoveStats"
import type { MoveType } from "./type"
import type { Tm } from "./tms/Tm"
import { TmDetails } from "./tms/TmDetails"
import { includesSearch } from "$lib/utils/string"
import type { MoveJson } from "$lib/srd/moves/schema"
import { MoveTime } from "./time"
import { MoveDuration } from "./duration"
import { MoveRange } from "./range"
import { MoveShape } from "./shape"
import { MoveDice } from "./dice"
import { m } from "$lib/site/i18n"
import type { MarkdownString } from "$lib/ui/rendering"
import { MoveDamage } from "./MoveDamage"
import type { ContestJson } from "$lib/srd/contest/schema"
import type { ContestEffectJson } from "$lib/srd/contest-effects/schema"
import type { TmJson } from "$lib/srd/tms/schema"

export type MoveId = string

const UNKNOWN = "<?>"

export class Move extends DataClass<{
	id: MoveId,
	beta?: boolean,
	name: string,
	aliases?: string[],
	type: MoveType,
	power: Data<MovePower>,
	time: MoveTime,
	pp: number,
	duration: MoveDuration,
	range: MoveRange,
	shape?: MoveShape,
	description: MarkdownString,
	table?: TableNode,
	higherLevels?: string,
	optional?: BodyText,
	contest?: Data<ContestDetails>,
	tm?: Data<TmDetails>,
	dice?: MoveDice,
	damage?: Data<MoveDamage>,
	attack?: Data<MoveAttack>,
	save?: Data<MoveSave>,
}> {
	get id() { return this.data.id }
	get beta() { return this.data.beta ?? false }
	get name() { return this.data.name }
	get aliases() { return this.data.aliases ?? [] }
	get type() { return this.data.type }
	get power() { return new MovePower(this.data.power) }
	get time() { return this.data.time }
	get pp() { return this.data.pp }
	get duration() { return this.data.duration }
	get range() { return this.data.range }
	get shape() { return this.data.shape }
	get description(): MarkdownString {
		// TODO: THIS IS TEMPORARY
		if (Array.isArray(this.data.description)) {
			return this.data.description.join("\n\n")
		}

		return this.data.description.replace(/\{(dice|type|save|shape)\}/g, (token, key) => {
			switch (key) {
			case "dice": return this.diceText()
			case "type": return this.type
			case "save": return this.saveText()
			case "shape": return this.shapeText()
			default: return token
			}
		})
	}
	get higherLevels() {
		if (this.data.higherLevels != null) {
			return this.data.higherLevels
		}

		if (this.data.dice != null) {
			const d = this.data.dice
			return m.atHigherLevelsDice({
				type: d.type,
				t1: d.tiers[1],
				t2: d.tiers[2],
				t3: d.tiers[3],
			})
		}
	}
	get table() { return this.data.table }
	get optional() { return this.data.optional }
	get contest() { return this.data.contest ? new ContestDetails(this.data.contest) : undefined }
	get tm() { return this.data.tm ? new TmDetails(this.data.tm) : undefined }
	get dice() { return this.data.dice }
	get damage() { return this.data.damage  ? new MoveDamage(this.data.damage) : undefined }
	get attack() { return this.data.attack ? new MoveAttack(this.data.attack) : undefined }
	get save() { return this.data.save ? new MoveSave(this.data.save) : undefined }

	private diceText(): string {
		const dice = this.data.dice
		if (dice == null) return UNKNOWN
		return dice.modifier === "0" ? dice.tiers[0] : `${dice.tiers[0]} + ${dice.modifier}`
	}

	private saveText(): string {
		const attribute = this.save?.data.attribute.map((it) => it.toLocaleUpperCase()).join("/")
		return m.saveAgainstMoveDc({ attribute: attribute ?? UNKNOWN })
	}

	private shapeText(): string {
		const shape = this.shape
		return shape != null ? MoveShape.display(shape) : m.unknownShape()
	}

	tmName(): string {
		if (this.tm == null) return this.name
		return `${this.tm.id} - ${this.name}`
	}

	isTm(): this is Tm {
		return this.tm != null
	}

	pokemonWhoLearnThis(allPokemon: PokemonSpecies[]): Record<MoveLearnMethod, PokemonSpecies[]> {
		const result: Record<MoveLearnMethod, PokemonSpecies[]> = {
			level: [],
			egg: [],
			tm: [],
		}

		allPokemon.forEach((pokemon) => pokemon.moves.canLearnVia(this).forEach((method) => result[method].push(pokemon)))

		return result
	}

	pokemonWhoLearnThisViaTm(allPokemon: PokemonSpecies[]): PokemonSpecies[] {
		return allPokemon.filter((pokemon) => pokemon.moves.canLearnViaTm(this))
	}

	calculateMoveStats(rulesVersion: Edition, forCharacter: {
		attributes: Attributes,
		level: Level,
		type: PokeType[],
		stab: Stab,
	}): MoveStats {
		const result: MoveStats = {}

		const bestPower = this.power.bestAttribute(forCharacter.attributes)[0]

		const attributeMod = bestPower == null ? 0 : forCharacter.attributes[bestPower].modifier

		const pb = forCharacter.level.proficiencyBonus

		result.toHit = this.attack?.toHit(pb, attributeMod)
		result.save = this.save?.withDc(pb, attributeMod)

		const stabToUse = forCharacter.stab ?? new Stab({ base: "default", bonus: 0 })
		result.damage = this.dice ? MoveDice.damage(this.dice, stabToUse, attributeMod, this.type, forCharacter.type, forCharacter.level, rulesVersion) : undefined
		if (result.damage == null) {
			result.damage = this.damage?.damage(stabToUse, attributeMod, this.type, forCharacter.type, forCharacter.level, rulesVersion)
		}

		return result
	}

	static matchNameOrType = (value: string) => (move: Move) =>
		includesSearch([move.name, ...move.aliases], value) ||
			move.type.includes(value.toLocaleLowerCase())

	static readonly fromJson = (json: MoveJson, joins?: {
		contest?: ContestJson,
		contestEffect?: ContestEffectJson,
		tm?: TmJson,
	}): Move => {
		const dice = MoveDice.fromJson(json.dice)

		return new Move({
			id: json.id,
			beta: json.beta,
			name: json.name,
			aliases: json.aliases,
			type: json.type,
			power: json.power,
			time: MoveTime.fromJson(json.time),
			pp: json.pp,
			duration: MoveDuration.fromJson(json.duration),
			range: MoveRange.fromJson(json.range),
			shape: MoveShape.fromJson(json.shape),
			description: json.description,
			higherLevels: json.higherLevels,
			optional: json.optional != null ? [json.optional] : undefined,
			tm: joins?.tm != null ? { id: joins.tm.id, cost: joins.tm.cost } : undefined,
			dice: MoveDice.fromJson(json.dice),
			damage: json.dice != null ? {
				dice: {
					"1": dice.tiers[0],
					"5": dice.tiers[1],
					"10": dice.tiers[2],
					"17": dice.tiers[3],
				},
				modifier: dice.modifier,
				type: dice.type === "healing" ? "healing" : [ "normal" ],
			} : undefined,
			attack: json.attack != null ? {
				scope: json.attack.scope,
			} : undefined,
			save: json.save != null ? {
				attribute: [json.save.attribute],
				dc: "MOVE",
			} : undefined,
			contest: ContestDetails.fromJson(joins?.contest, joins?.contestEffect),
			table: json.table as TableNode,
		})
	}
}
