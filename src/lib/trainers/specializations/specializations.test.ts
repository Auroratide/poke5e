import { test, expect } from "vitest"
import { mapToTypeRanks, SpecializationList, typeRanksToMap, type Specialization } from "./specializations"

test("typeRanksToMap", () => {
	const ranks = {
		normal: 0,
		fighting: 1,
		flying: 2,
		poison: 3,
		ground: 4,
		rock: 3,
		bug: 2,
		ghost: 1,
		steel: 0,
		fire: 1,
		water: 2,
		grass: 3,
		electric: 4,
		psychic: 3,
		ice: 2,
		dragon: 1,
		dark: 0,
		fairy: 1,
	}
	
	const result = typeRanksToMap(ranks)

	expect(result).toEqual(new Map<Specialization, number>([
		[SpecializationList.PokeFan, 0],
		[SpecializationList.BlackBelt, 1],
		[SpecializationList.BirdKeeper, 2],
		[SpecializationList.Punk, 3],
		[SpecializationList.Camper, 4],
		[SpecializationList.Hiker, 3],
		[SpecializationList.BugManiac, 2],
		[SpecializationList.Mystic, 1],
		[SpecializationList.Worker, 0],
		[SpecializationList.Kindler, 1],
		[SpecializationList.Swimmer, 2],
		[SpecializationList.Gardener, 3],
		[SpecializationList.Engineer, 4],
		[SpecializationList.Psychic, 3],
		[SpecializationList.Skier, 2],
		[SpecializationList.DragonTamer, 1],
		[SpecializationList.Delinquent, 0],
		[SpecializationList.Actor, 1],
	]))
})

test("mapToTypeRanks", () => {
	const specializations = new Map<Specialization, number>([
		[SpecializationList.PokeFan, 0],
		[SpecializationList.BlackBelt, 1],
		[SpecializationList.BirdKeeper, 2],
		[SpecializationList.Punk, 3],
		[SpecializationList.Camper, 4],
		[SpecializationList.Hiker, 3],
		[SpecializationList.BugManiac, 2],
		[SpecializationList.Mystic, 1],
		[SpecializationList.Worker, 0],
		[SpecializationList.Kindler, 1],
		[SpecializationList.Swimmer, 2],
		[SpecializationList.Gardener, 3],
		[SpecializationList.Engineer, 4],
		[SpecializationList.Psychic, 3],
		[SpecializationList.Skier, 2],
		[SpecializationList.DragonTamer, 1],
		[SpecializationList.Delinquent, 0],
		[SpecializationList.Actor, 1],
	])
	
	const result = mapToTypeRanks(specializations)

	expect(result).toEqual({
		normal: 0,
		fighting: 1,
		flying: 2,
		poison: 3,
		ground: 4,
		rock: 3,
		bug: 2,
		ghost: 1,
		steel: 0,
		fire: 1,
		water: 2,
		grass: 3,
		electric: 4,
		psychic: 3,
		ice: 2,
		dragon: 1,
		dark: 0,
		fairy: 1,
	})
})
