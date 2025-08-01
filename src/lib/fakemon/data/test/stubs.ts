import type { Data } from "$lib/DataClass"
import { stubAttributes } from "$lib/dnd/attributes/test/stubs"
import { Fakemon } from "$lib/fakemon/Fakemon"
import { stubSkillProficiencies } from "$lib/dnd/skills/test/stubs"
import { stubMovePool } from "$lib/creatures/test/stubs"
import { GenderRatio } from "$lib/creatures/gender"
import { HitDice } from "$lib/dnd/hit-dice"

export function stubFakemon(template: Partial<Data<Fakemon>> = {}): Fakemon {
	return new Fakemon({
		id: "",
		readKey: "",
		writeKey: undefined,
		speciesName: "Drakeon",
		type: ["dragon"],
		size: "small",
		attributes: stubAttributes().data,
		sr: 8,
		minLevel: 5,
		eggGroups: ["Field"],
		gender: new GenderRatio("7:1"),
		description: "",
		ac: 17,
		hp: 50,
		hitDice: new HitDice("d10"),
		speed: {
			walking: 40,
			swimming: 0,
			climbing: 0,
			flying: 15,
			hover: 0,
			burrowing: 0,
		},
		senses: {
			darkvision: 0,
			blindsight: 0,
			tremorsense: 0,
			truesight: 0,
		},
		skills: stubSkillProficiencies({
			intimidation: 1,
		}).data,
		saves: ["dex"],
		abilities: [ {
			id: "intimidate",
			hidden: false,
		}, {
			id: "inner-focus",
			hidden: true,
		} ],
		moves: stubMovePool(),
		...template,
	})
}
