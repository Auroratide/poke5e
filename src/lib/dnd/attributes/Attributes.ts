import { DataClass, type Data } from "$lib/DataClass"

export class Attributes extends DataClass<{
	str: number,
	dex: number,
	con: number,
	int: number,
	wis: number,
	cha: number,
}> {
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

	get str() { return this.score(this.data.str) }
	get dex() { return this.score(this.data.dex) }
	get con() { return this.score(this.data.con) }
	get int() { return this.score(this.data.int) }
	get wis() { return this.score(this.data.wis) }
	get cha() { return this.score(this.data.cha) }

	private score = (score: number) => ({
		score,
		modifier: Math.floor(score / 2) - 5,
	})
}

export type Attribute = keyof Data<Attributes>
