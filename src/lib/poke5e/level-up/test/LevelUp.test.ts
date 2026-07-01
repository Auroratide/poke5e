import { AbilityScoreImprovement, Attributes } from "$lib/dnd/attributes"
import { stubAttributes } from "$lib/dnd/attributes/test/stubs"
import { Level } from "$lib/dnd/level"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import { TrainerPaths } from "$lib/trainers/paths/2024"
import { SpecializationList } from "$lib/trainers/specializations/2024/SpecializationList"
import { SpecializationList as SpecializationList2018 } from "$lib/trainers/specializations/2018/SpecializationList"
import { stubSpecializations } from "$lib/trainers/specializations/test/stubs"
import { stubTrainer, stubTrainerPokemon } from "$lib/trainers/test/stubs"
import { describe, expect, test } from "vitest"
import { AdditionalSpecializationEffect } from "../effects/AdditionalSpecialization"
import { AsiOrFeatEffect } from "../effects/AsiOrFeat"
import type { IncreaseHpEffect } from "../effects/IncreaseHp"
import { NewTrainerPathEffect } from "../effects/NewTrainerPath"
import { LevelUp } from "../LevelUp"
import { PokemonLevelTable } from "../PokemonLevelTable"
import { TrainerLevelTable } from "../TrainerLevelTable"
import { TrainerResolveEffect } from "../effects/TrainerResolve"
import { EvolutionForest } from "$lib/pokemon/evolution"
import { stubEvolution } from "$lib/pokemon/evolution/test/stubs"

describe("trainers", () => {
	test("on any level up", () => {
		// given
		const trainer = stubTrainer({
			level: new Level(1),
			hp: {
				current: 7,
				max: 12,
			},
		})

		const effects = TrainerLevelTable.toLevel(new Level(2))(trainer)
		const hpEffect = effects[1] as IncreaseHpEffect

		hpEffect.params.increaseAmount = 3

		// when
		const result = LevelUp.apply(trainer, effects)

		// then
		expect(result.level).toEqualData(new Level(2))
		expect(result.hp).toEqual({
			current: 10,
			max: 15,
		})
	})

	test("choosing a trainer path", () => {
		// given
		const trainer = stubTrainer({
			level: new Level(1),
		})

		const effects = TrainerLevelTable.toLevel(new Level(2))(trainer)
		const pathEffect = effects[2] as NewTrainerPathEffect

		pathEffect.params.path = TrainerPaths[0]

		// when
		const result = LevelUp.apply(trainer, effects)

		// then
		expect(result.path.name).toEqual(TrainerPaths[0].name)
	})

	test("choosing ASI", () => {
		// given
		const trainer = stubTrainer({
			level: new Level(3),
			attributes: new Attributes({
				str: 10,
				dex: 10,
				con: 10,
				int: 10,
				wis: 10,
				cha: 10,
			}),
		})

		const effects = TrainerLevelTable.toLevel(new Level(4))(trainer)
		const asiEffect = effects[2] as AsiOrFeatEffect

		asiEffect.params.feat = undefined
		asiEffect.params.pointsSpent = {
			str: 1,
			dex: 0,
			con: 0,
			int: 0,
			wis: 1,
			cha: 0,
		}

		// when
		const result = LevelUp.apply(trainer, effects)

		// then
		expect(result.attributes).toEqualData(new Attributes({
			str: 11,
			dex: 10,
			con: 10,
			int: 10,
			wis: 11,
			cha: 10,
		}))
	})

	test("choosing a feat", () => {
		// given
		const trainer = stubTrainer({
			level: new Level(3),
		})

		const effects = TrainerLevelTable.toLevel(new Level(4))(trainer)
		const asiEffect = effects[2] as AsiOrFeatEffect

		const feat = {
			id: "",
			name: "Sentinel",
			description: "",
			isCustom: false,
		}

		asiEffect.params.feat = feat
		asiEffect.params.pointsSpent = {
			str: 0,
			dex: 0,
			con: 0,
			int: 0,
			wis: 0,
			cha: 0,
		}

		// when
		const result = LevelUp.apply(trainer, effects)

		// then
		expect(result.feats).toEqual([feat])
	})

	test("increasing CON increases HP retroactively", () => {
		// given
		const trainer = stubTrainer({
			level: new Level(7),
			hp: {
				current: 35,
				max: 35,
			},
			attributes: new Attributes({
				str: 10,
				dex: 10,
				con: 10,
				int: 10,
				wis: 10,
				cha: 10,
			}),
		})

		const effects = TrainerLevelTable.toLevel(new Level(8))(trainer)
		const hpEffect = effects[1] as IncreaseHpEffect
		const asiEffect = effects[2] as AsiOrFeatEffect

		hpEffect.params.increaseAmount = 0

		asiEffect.params.pointsSpent = {
			str: 0,
			dex: 0,
			con: 2, // con modifier will go up by 1
			int: 0,
			wis: 0,
			cha: 0,
		}

		// when
		const result = LevelUp.apply(trainer, effects)

		// then
		expect(result.hp.max).toEqual(43)
	})

	test("specialization", () => {
		// given
		const trainer = stubTrainer({
			level: new Level(6),
			specializations: stubSpecializations({
				normal: 1,
			}),
			attributes: stubAttributes({
				cha: 12,
			}),
		})

		const effects = TrainerLevelTable.toLevel(new Level(7))(trainer)
		const effect = effects[2] as AdditionalSpecializationEffect

		effect.params.specialization = SpecializationList.normal

		// when
		const result = LevelUp.apply(trainer, effects)

		// then
		expect(result.specializations).toEqual(stubSpecializations({
			normal: 2,
		}))
		expect(result.attributes.cha.score).toEqual(13) // normal specialization increases CHA
	})

	test("pokemon tracker", () => {
		// given
		const trainer = stubTrainer({
			level: new Level(12),
		})

		const effects = TrainerLevelTable.toLevel(new Level(13))(trainer)

		// when
		const result = LevelUp.apply(trainer, effects)

		// then
		expect(result.proficiencies.isExpert("animal handling")).toBe(true)
	})

	test("trainer resolve", () => {
		// given
		const trainer = stubTrainer({
			level: new Level(9),
		})

		const effects = TrainerLevelTable.toLevel(new Level(10))(trainer)
		const effect = effects[3] as TrainerResolveEffect
		effect.params.savingThrows = ["str", "cha"]

		// when
		const result = LevelUp.apply(trainer, effects)

		// then
		expect(result.savingThrows).toEqual(["str", "cha"])
	})
})

describe("pokemon", () => {
	test("on any level up", () => {
		// given
		const pokemon = stubTrainerPokemon({
			level: new Level(1),
			hp: {
				current: 7,
				max: 12,
			},
		})

		const species = stubPokemonSpecies()
		const evolution = new EvolutionForest([])

		const effects = PokemonLevelTable.toLevel(new Level(2))(pokemon, species, evolution)
		const hpEffect = effects[1] as IncreaseHpEffect

		hpEffect.params.increaseAmount = 3

		// when
		const result = LevelUp.apply(pokemon, effects)

		// then
		expect(result.level).toEqualData(new Level(2))
		expect(result.hp).toEqual({
			current: 10,
			max: 15,
		})
	})

	test("asi for pokemon with 1 stage", () => {
		// given
		const pokemon = stubTrainerPokemon({
			level: new Level(3),
			attributes: new Attributes({
				str: 10,
				dex: 10,
				con: 10,
				int: 10,
				wis: 10,
				cha: 10,
			}),
		})

		const species = stubPokemonSpecies()
		const evolution = new EvolutionForest([])

		const effects = PokemonLevelTable.toLevel(new Level(4))(pokemon, species, evolution)
		const asiEffect = effects[2] as AsiOrFeatEffect

		expect(asiEffect.props.pointsToSpend).toEqual(4)

		asiEffect.params.feat = undefined
		asiEffect.params.pointsSpent = {
			str: 2,
			dex: 1,
			con: 0,
			int: 0,
			wis: 1,
			cha: 0,
		}

		// when
		const result = LevelUp.apply(pokemon, effects)

		// then
		expect(result.attributes).toEqualData(new Attributes({
			str: 12,
			dex: 11,
			con: 10,
			int: 10,
			wis: 11,
			cha: 10,
		}))
	})

	test("asi for pokemon with 3 stages", () => {
		// given
		const pokemon = stubTrainerPokemon({
			level: new Level(3),
			attributes: new Attributes({
				str: 10,
				dex: 10,
				con: 10,
				int: 10,
				wis: 10,
				cha: 10,
			}),
		})

		const species = stubPokemonSpecies({
			id: "one",
		})
		const evolvesTo = stubPokemonSpecies({
			id: "two",
		})
		const evolvesToTo = stubPokemonSpecies({
			id: "three",
		})
		const evolution = new EvolutionForest([
			stubEvolution({
				from: species.id.data,
				to: evolvesTo.id.data,
			}),
			stubEvolution({
				from: evolvesTo.id.data,
				to: evolvesToTo.id.data,
			}),
		])

		const effects = PokemonLevelTable.toLevel(new Level(4))(pokemon, species, evolution)
		const asiEffect = effects[2] as AsiOrFeatEffect

		expect(asiEffect.props.pointsToSpend).toEqual(2)

		asiEffect.params.feat = undefined
		asiEffect.params.pointsSpent = {
			str: 0,
			dex: 1,
			con: 0,
			int: 0,
			wis: 1,
			cha: 0,
		}

		// when
		const result = LevelUp.apply(pokemon, effects)

		// then
		expect(result.attributes).toEqualData(new Attributes({
			str: 10,
			dex: 11,
			con: 10,
			int: 10,
			wis: 11,
			cha: 10,
		}))
	})
})

describe("errors", () => {
	test("no specialization chosen", () => {
		const effect = new AdditionalSpecializationEffect({}, {
			specialization: undefined,
			asi: undefined,
			skill: undefined,
		})

		const error = effect.hasError()

		expect(error).toEqual("Must choose a specialization.")
	})

	test("specialization requires asi", () => {
		const effect = new AdditionalSpecializationEffect({}, {
			specialization: SpecializationList2018.normal,
			asi: undefined,
			skill: undefined,
		})

		const error = effect.hasError()

		expect(error).toEqual("Specialization requires choosing an ability or proficiency.")
	})

	test("specialization requires skill", () => {
		const effect = new AdditionalSpecializationEffect({}, {
			specialization: SpecializationList2018.dark,
			asi: undefined,
			skill: undefined,
		})

		const error = effect.hasError()

		expect(error).toEqual("Specialization requires choosing an ability or proficiency.")
	})

	test("specialization requires asi, and asi provided", () => {
		const effect = new AdditionalSpecializationEffect({}, {
			specialization: SpecializationList2018.normal,
			asi: "cha",
			skill: undefined,
		})

		const error = effect.hasError()

		expect(error).toBeUndefined()
	})

	test("specialization requires skill, and skill provided", () => {
		const effect = new AdditionalSpecializationEffect({}, {
			specialization: SpecializationList2018.dark,
			asi: undefined,
			skill: "deception",
		})

		const error = effect.hasError()

		expect(error).toBeUndefined()
	})

	test("specialization only has one possible asi or skill", () => {
		const effect = new AdditionalSpecializationEffect({}, {
			specialization: SpecializationList.normal,
			asi: undefined,
			skill: undefined,
		})

		const error = effect.hasError()

		expect(error).toBeUndefined()
	})

	test("asi not allocated", () => {
		const effect = new AsiOrFeatEffect({
			options: [],
			pointsToSpend: 2,
			attributes: stubAttributes(),
		}, {
			feat: undefined,
			pointsSpent: AbilityScoreImprovement.zero(),
		})

		const error = effect.hasError()

		expect(error).toEqual("Must allocate ability score improvement points.")
	})

	test("feat chosen instead of asi", () => {
		const effect = new AsiOrFeatEffect({
			options: [],
			pointsToSpend: 2,
			attributes: stubAttributes(),
		}, {
			feat: {
				id: "",
				name: "Feat",
				description: "???",
				isCustom: true,
			},
			pointsSpent: AbilityScoreImprovement.zero(),
		})

		const error = effect.hasError()

		expect(error).toBeUndefined()
	})

	test("trainer path unspecified", () => {
		const effect = new NewTrainerPathEffect({}, {
			path: undefined,
		})

		const error = effect.hasError()

		expect(error).toEqual("Must choose a trainer path.")
	})

	test("resolve needs a saving throw chosen", () => {
		const effect = new TrainerResolveEffect({
			savingThrows: ["cha"],
		}, {
			savingThrows: ["cha"],
		})

		const error = effect.hasError()

		expect(error).toEqual("Choose a saving throw for Trainer's Resolve.")
	})

	test("already has all six saving throws", () => {
		const effect = new TrainerResolveEffect({
			savingThrows: ["str", "dex", "con", "int", "wis", "cha"],
		}, {
			savingThrows: ["str", "dex", "con", "int", "wis", "cha"],
		})

		const error = effect.hasError()

		expect(error).toBeUndefined()
	})
})
