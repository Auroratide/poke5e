import { DataClass, type Data } from "$lib/DataClass"
import type { AbilityScoreImprovement } from "./AbilityScoreImprovement"

export class Attributes extends DataClass<{
	str: number,
	dex: number,
	con: number,
	int: number,
	wis: number,
	cha: number,
}> {
	static readonly MAX_NORMAL_VALUE = 20
	static readonly MAX_ABSOLUTE_VALUE = 30

	static readonly list: {
		abbr: Attribute,
		name: string,
	}[] = [ {
			abbr: "str",
			name: "Strength",
		}, {
			abbr: "dex",
			name: "Dexterity",
		}, {
			abbr: "con",
			name: "Constitution",
		}, {
			abbr: "int",
			name: "Intelligence",
		}, {
			abbr: "wis",
			name: "Wisdom",
		}, {
			abbr: "cha",
			name: "Charisma",
		} ]

	static readonly getName = (attr: Attribute): string =>
		Attributes.list.find((it) => it.abbr === attr).name

	get str() { return this.score(this.data.str) }
	get dex() { return this.score(this.data.dex) }
	get con() { return this.score(this.data.con) }
	get int() { return this.score(this.data.int) }
	get wis() { return this.score(this.data.wis) }
	get cha() { return this.score(this.data.cha) }

	improve(asi: AbilityScoreImprovement): Attributes {
		this.data.str = Math.min(Attributes.MAX_ABSOLUTE_VALUE, this.data.str + asi.str)
		this.data.dex = Math.min(Attributes.MAX_ABSOLUTE_VALUE, this.data.dex + asi.dex)
		this.data.con = Math.min(Attributes.MAX_ABSOLUTE_VALUE, this.data.con + asi.con)
		this.data.int = Math.min(Attributes.MAX_ABSOLUTE_VALUE, this.data.int + asi.int)
		this.data.wis = Math.min(Attributes.MAX_ABSOLUTE_VALUE, this.data.wis + asi.wis)
		this.data.cha = Math.min(Attributes.MAX_ABSOLUTE_VALUE, this.data.cha + asi.cha)

		return this
	}

	entries(): [Attribute, number][] {
		return Object.entries(this.data) as [Attribute, number][]
	}

	private score = (score: number) => ({
		score,
		modifier: Math.floor(score / 2) - 5,
	})
}

export type Attribute = keyof Data<Attributes>
