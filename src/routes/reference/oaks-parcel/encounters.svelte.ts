import { Attributes } from "$lib/dnd/attributes"
import { Level } from "$lib/dnd/level"
import { SkillRanks } from "$lib/dnd/skills"
import { CuratedEncounter } from "$lib/poke5e/encounters"
import { SpeciesStore } from "$lib/poke5e/species"
import { PokemonGender } from "$lib/pokemon/gender"
import { Nature } from "$lib/pokemon/nature"

export const OaksParcelEncounters = $state<{
	pending: boolean,
	list: Record<string, CuratedEncounter>,
}>({
	pending: true,
	list: {},
})

export function createEncounters() {
	const canonSpecies = SpeciesStore.canonList()

	const unsubscribe = canonSpecies.subscribe((canonSpecies) => {
		if (canonSpecies == null) return

		OaksParcelEncounters.pending = false
		const grimer = canonSpecies.find((it) => it.data.id === "grimer")
		const zubat = canonSpecies.find((it) => it.data.id === "zubat")
		const meowth = canonSpecies.find((it) => it.data.id === "meowth")
		const koffing = canonSpecies.find((it) => it.data.id === "koffing")
		const nidoqueen = canonSpecies.find((it) => it.data.id === "nidoqueen")

		OaksParcelEncounters.list = {
			TeamRocketGrunts: CuratedEncounter.start("Team Rocket Grunts")
				.trainer({
					name: "Oak's Parcel: Male Grunt",
					level: new Level(2),
					hp: { current: 10, max: 10 },
					ac: 10,
					hitDice: { current: 2, max: 2 },
					attributes: new Attributes({ str: 14, dex: 10, con: 12, int: 10, wis: 10, cha: 10 }),
					proficiencies: SkillRanks.fromList(["athletics", "deception"]),
					savingThrows: ["cha"],
					biography: {
						species: "Human",
						gender: "Male",
						age: 27,
						background: null,
						homeRegion: null,
					},
					specializations: {
						"bug": 0,
						"dark": 0,
						"dragon": 0,
						"electric": 0,
						"fairy": 0,
						"fighting": 0,
						"fire": 0,
						"flying": 0,
						"ghost": 0,
						"grass": 0,
						"ground": 0,
						"ice": 0,
						"normal": 0,
						"poison": 1,
						"psychic": 0,
						"rock": 0,
						"steel": 0,
						"water": 0,
					},
				})
				.pokemon(grimer, {
					level: new Level(2),
					gender: PokemonGender.Female,
					hp: { current: 27, max: 27 },
					hitDice: { current: 2, max: 2 },
					abilities: [grimer.abilities.normal[0]],
					moves: [ {
						id: "",
						moveId: "poison-gas",
						pp: { current: 10, max: 10 },
					}, {
						id: "",
						moveId: "pound",
						pp: { current: 20, max: 20 },
					} ],
				})
				.pokemon(zubat, {
					level: new Level(1),
					gender: PokemonGender.Male,
					hp: { current: 17, max: 17 },
					hitDice: { current: 1, max: 1 },
					abilities: [zubat.abilities.normal[0]],
					moves: [ {
						id: "",
						moveId: "absorb",
						pp: { current: 15, max: 15 },
					} ],
				})
				.trainer({
					name: "Oak's Parcel: Female Grunt",
					level: new Level(2),
					hp: { current: 10, max: 10 },
					ac: 11,
					hitDice: { current: 2, max: 2 },
					attributes: new Attributes({ str: 12, dex: 12, con: 12, int: 10, wis: 10, cha: 10 }),
					proficiencies: SkillRanks.fromList(["acrobatics", "deception"]),
					savingThrows: ["cha"],
					biography: {
						species: "Human",
						gender: "Female",
						age: 26,
						background: null,
						homeRegion: null,
					},
					specializations: {
						"bug": 0,
						"dark": 0,
						"dragon": 0,
						"electric": 0,
						"fairy": 0,
						"fighting": 0,
						"fire": 0,
						"flying": 0,
						"ghost": 0,
						"grass": 0,
						"ground": 0,
						"ice": 0,
						"normal": 0,
						"poison": 1,
						"psychic": 0,
						"rock": 0,
						"steel": 0,
						"water": 0,
					},
				})
				.pokemon(meowth, {
					level: new Level(2),
					gender: PokemonGender.Male,
					hp: { current: 20, max: 20 },
					hitDice: { current: 2, max: 2 },
					abilities: [meowth.abilities.normal[0]],
					moves: [ {
						id: "",
						moveId: "growl",
						pp: { current: 20, max: 20 },
					}, {
						id: "",
						moveId: "scratch",
						pp: { current: 20, max: 20 },
					} ],
				})
				.pokemon(koffing, {
					level: new Level(1),
					gender: PokemonGender.Male,
					hp: { current: 18, max: 18 },
					hitDice: { current: 1, max: 1 },
					abilities: [zubat.abilities.normal[0]],
					moves: [ {
						id: "",
						moveId: "poison-gas",
						pp: { current: 10, max: 10 },
					}, {
						id: "",
						moveId: "tackle",
						pp: { current: 20, max: 20 },
					} ],
				})
				.build(),

			Giovanni: CuratedEncounter.start("Giovanni")
				.trainer({
					name: "Oak's Parcel: Giovanni",
					level: new Level(10),
					hp: { current: 50, max: 50 },
					ac: 13,
					hitDice: { current: 10, max: 10 },
					attributes: new Attributes({ str: 13, dex: 10, con: 16, int: 13, wis: 11, cha: 17 }),
					proficiencies: SkillRanks.fromList(["perception", "intimidation", "deception"]),
					savingThrows: ["con", "cha"],
					biography: {
						species: "Human",
						gender: "Male",
						age: 41,
						background: null,
						homeRegion: null,
					},
					specializations: {
						"bug": 0,
						"dark": 0,
						"dragon": 0,
						"electric": 0,
						"fairy": 0,
						"fighting": 0,
						"fire": 0,
						"flying": 0,
						"ghost": 0,
						"grass": 0,
						"ground": 1,
						"ice": 0,
						"normal": 0,
						"poison": 1,
						"psychic": 0,
						"rock": 0,
						"steel": 0,
						"water": 0,
					},
				})
				.pokemon(nidoqueen, {
					level: new Level(10),
					gender: PokemonGender.Female,
					nature: new Nature("Lonely"),
					hp: { current: 92, max: 92 },
					hitDice: { current: 10, max: 10 },
					attributes: new Attributes({
						str: 18,
						dex: 16,
						con: 16,
						int: 6,
						wis: 13,
						cha: 10,
					}),
					abilities: [nidoqueen.abilities.normal[0]],
					moves: [ {
						id: "",
						moveId: "double-kick",
						pp: { current: 15, max: 15 },
					}, {
						id: "",
						moveId: "poison-sting",
						pp: { current: 15, max: 15 },
					}, {
						id: "",
						moveId: "ice-beam",
						pp: { current: 5, max: 5 },
					}, {
						id: "",
						moveId: "tail-whip",
						pp: { current: 15, max: 15 },
					} ],
				})
				.build(),
		}
	})

	return () => {
		unsubscribe()
	}
}
