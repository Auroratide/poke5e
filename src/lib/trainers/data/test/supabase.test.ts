import { test, expect, beforeEach, afterEach, vi } from "vitest"
import { provider } from ".."
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import { Level } from "$lib/dnd/level"
import { stubAbility, stubAbilityPool } from "$lib/pokemon/ability/test/stubs"
import { ApiStub } from "$lib/test/ApiStub"
import { supabase } from "$lib/supabase"
import type { PokemonSpecies } from "$lib/poke5e/species"
import type { PokemonId, ReadWriteKey } from "$lib/trainers/types"
import { TagList } from "$lib/poke5e/tags"
import { TrainerLocalStorage } from "../TrainerLocalStorage"
import { provider as transferProvider } from "../../pokemon-transfer"
import { stubLearnedMove } from "$lib/trainers/test/stubs"
import type { MoveRange } from "$lib/moves/range"
import type { MoveDuration } from "$lib/moves/duration"
import type { LearnedMove } from "$lib/moves/learned"

const ABILITIES = {
	disguise: stubAbility({
		referenceId: "disguise",
		name: "Disguise",
		description: "Grants a disguise.",
	}),
	intimidate: stubAbility({
		referenceId: "intimidate",
		name: "Intimidate",
		description: "Angy",
	}),
}

beforeEach(() => {
	ApiStub.abilities = Object.values(ABILITIES)
})

afterEach(() => {
	vi.resetAllMocks()
})

test("add, get, update", async () => {
	const trainerToAdd = {
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	}

	const firstSpeciesToAdd = stubPokemonSpecies({
		id: "mimikyu",
	})
	const secondSpeciesToAdd = stubPokemonSpecies({
		id: "kirlia",
	})

	const addedTrainer = await provider.newTrainer(trainerToAdd)
	const firstAddedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, firstSpeciesToAdd)
	const secondAddedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, secondSpeciesToAdd)

	const receivedTrainer = await provider.getTrainer(addedTrainer.info.readKey)
	const receivedPokemonIds = receivedTrainer.pokemon.map((it) => it.id)

	expect(receivedTrainer.info.name).toEqual("Renibel")
	expect(receivedPokemonIds).toContain(firstAddedPokemon.id)
	expect(receivedPokemonIds).toContain(secondAddedPokemon.id)

	firstAddedPokemon.bond.level = 3
	await provider.updatePokemon(addedTrainer.writeKey, addedTrainer.info.readKey, firstAddedPokemon)
	addedTrainer.info.level = new Level(10)
	await provider.updateTrainerInfo(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info)

	const trainerAfterUpdate = await provider.getTrainer(addedTrainer.info.readKey)
	const firstPokemonAfterUpdate = trainerAfterUpdate.pokemon.find((it) => it.id === firstAddedPokemon.id)

	expect(trainerAfterUpdate.info.level).toEqualData(new Level(10))
	expect(firstPokemonAfterUpdate.bond.level).toEqual(3)
})

test("getting abilities", async () => {
	const trainerToAdd = {
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	}

	const speciesToAdd = stubPokemonSpecies({
		id: "mimikyu",
		abilities: stubAbilityPool({
			normal: [ABILITIES.disguise],
			hidden: [],
		}),
	})

	const addedTrainer = await provider.newTrainer(trainerToAdd)
	const addedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, speciesToAdd)
	
	addedPokemon.abilities = [ABILITIES.disguise, ABILITIES.intimidate]

	await provider.updatePokemon(addedTrainer.writeKey, addedTrainer.info.readKey, addedPokemon)

	const receivedTrainer = await provider.getTrainer(addedTrainer.info.readKey)
	const receivedPokemon = receivedTrainer.pokemon[0]

	expect(receivedPokemon.abilities).toHaveLength(2)
	expect(receivedPokemon.abilities[0].referenceId).toEqual(ABILITIES.disguise.referenceId)
	expect(receivedPokemon.abilities[0].name).toEqual(ABILITIES.disguise.name)
	expect(receivedPokemon.abilities[1].referenceId).toEqual(ABILITIES.intimidate.referenceId)
	expect(receivedPokemon.abilities[1].name).toEqual(ABILITIES.intimidate.name)
})

test("backwards compatibility of abilities", async () => {
	const trainerToAdd = {
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	}

	const speciesToAdd = stubPokemonSpecies({
		id: "mimikyu",
		abilities: stubAbilityPool({
			normal: [ABILITIES.disguise],
			hidden: [],
		}),
	})

	const addedTrainer = await provider.newTrainer(trainerToAdd)
	await addPokemonWithDeprecatedAbilityField(addedTrainer.writeKey, speciesToAdd)

	const trainer = await provider.getTrainer(addedTrainer.info.readKey)
	const addedPokemon = trainer.pokemon[0]

	expect(addedPokemon.ability).toBeNull() // undefined since now deprecated
	expect(addedPokemon.abilities.length).toEqual(1)
	expect(addedPokemon.abilities[0]).toEqualData(ABILITIES.disguise)
})

test("reordering pokemon", async () => {
	// given
	const trainerToAdd = {
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	}

	const firstSpeciesToAdd = stubPokemonSpecies({
		id: "mimikyu",
	})
	const secondSpeciesToAdd = stubPokemonSpecies({
		id: "kirlia",
	})
	const thirdSpeciesToAdd = stubPokemonSpecies({
		id: "litwick",
	})

	const addedTrainer = await provider.newTrainer(trainerToAdd)
	const firstAddedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, firstSpeciesToAdd)
	const secondAddedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, secondSpeciesToAdd)
	const thirdAddedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, thirdSpeciesToAdd)

	// when
	await provider.reorderPokemonTeam(addedTrainer.writeKey, addedTrainer.info.readKey, [secondAddedPokemon, thirdAddedPokemon, firstAddedPokemon])

	// then
	const receivedTrainer = await provider.getTrainer(addedTrainer.info.readKey)
	const receivedPokemon = receivedTrainer.pokemon.map((it) => it.pokemonId.data)

	expect(receivedPokemon).toEqual(["kirlia", "litwick", "mimikyu"])
})

test("tags", async () => {
	// given
	const trainerToAdd = {
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	}

	const firstSpeciesToAdd = stubPokemonSpecies({
		id: "mimikyu",
	})

	const addedTrainer = await provider.newTrainer(trainerToAdd)
	const addedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, firstSpeciesToAdd)

	// when
	addedTrainer.info.tags = TagList.add(addedTrainer.info.tags, "gym leader")
	addedPokemon.tags = TagList.add(addedPokemon.tags, "male")

	await provider.updateTrainerInfo(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info)
	await provider.updatePokemon(addedTrainer.writeKey, addedTrainer.info.readKey, addedPokemon)

	// then
	const afterUpdate = await provider.getTrainer(addedTrainer.info.readKey)
	expect(afterUpdate.info.tags).toEqual(TagList.from(["gym leader"]))
	expect(afterUpdate.pokemon[0].tags).toEqual(TagList.from(["male"]))
})

test("tags: do not own trainer", async () => {
	// given
	const trainerToAdd = {
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	}

	const firstSpeciesToAdd = stubPokemonSpecies({
		id: "mimikyu",
	})

	const addedTrainer = await provider.newTrainer(trainerToAdd)
	const addedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, firstSpeciesToAdd)

	addedTrainer.info.tags = TagList.add(addedTrainer.info.tags, "gym leader")
	addedPokemon.tags = TagList.add(addedPokemon.tags, "male")

	await provider.updateTrainerInfo(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info)
	await provider.updatePokemon(addedTrainer.writeKey, addedTrainer.info.readKey, addedPokemon)

	// when
	TrainerLocalStorage.removeWriteKey(addedTrainer.info.readKey)
	TrainerLocalStorage.tags.setTrainer(addedTrainer.info.readKey, TagList.from(["lass"]))
	TrainerLocalStorage.tags.setPokemon(addedTrainer.info.readKey, addedPokemon.id, TagList.from(["ghost"]))

	// then
	const afterUpdate = await provider.getTrainer(addedTrainer.info.readKey)
	expect(afterUpdate.info.tags).toEqual(TagList.from(["lass"]))
	expect(afterUpdate.pokemon[0].tags).toEqual(TagList.from(["ghost"]))
})

test("accepting a transfer", async () => {
	// given
	const firstTrainerToAdd = {
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	}

	const secondTrainerToAdd = {
		name: "Iris",
		description: "Likes flowers.",
		hp: {
			current: 6,
			max: 6,
		},
	}

	const firstSpeciesToAdd = stubPokemonSpecies({
		id: "mimikyu",
	})

	const someMove = stubLearnedMove({
		id: "tackle",
	})

	const addedFirstTrainer = await provider.newTrainer(firstTrainerToAdd)
	const addedPokemon = await provider.addPokemonToTeam(addedFirstTrainer.writeKey, addedFirstTrainer.info.readKey, addedFirstTrainer.info.id, firstSpeciesToAdd)
	
	// given: some move set, to test that the transfer conducts these too
	addedPokemon.moves.push(someMove)
	await provider.updateMoveset(addedFirstTrainer.writeKey, addedFirstTrainer.info.readKey, addedPokemon.id, addedPokemon.moves)

	const addedSecondTrainer = await provider.newTrainer(secondTrainerToAdd)

	const transferCode = await transferProvider.generate(addedFirstTrainer.writeKey, addedPokemon.id)

	// when
	const transferedPokemon = await provider.acceptPokemonTransfer(addedSecondTrainer.writeKey, addedSecondTrainer.info.readKey, addedSecondTrainer.info.id, transferCode)

	// then
	const refreshedSecondTrainer = await provider.getTrainer(addedSecondTrainer.info.readKey)
	expect(refreshedSecondTrainer.pokemon).toHaveLength(1)
	expect(refreshedSecondTrainer.pokemon[0].pokemonId.data).toEqual("mimikyu")
	expect(refreshedSecondTrainer.pokemon[0].moves[0].moveId).toEqual("tackle")
	expect(transferedPokemon.pokemonId.data).toEqual("mimikyu")
	expect(transferedPokemon.moves[0].moveId).toEqual("tackle")
})

test("reordering trainers", async () => {
	const draft = (name: string) => ({
		name: name,
		description: "Likes stuff.",
		hp: {
			current: 6,
			max: 6,
		},
	})

	// given
	const renibelDraft = draft("Renibel")
	const irisDraft = draft("Iris")
	const blisDraft = draft("Blis")

	const renibel = await provider.newTrainer(renibelDraft)
	const iris = await provider.newTrainer(irisDraft)
	const blis = await provider.newTrainer(blisDraft)

	// initial order
	const initialOrder = await provider.allTrainers()
	expect(initialOrder.map((it) => it.readKey)).toEqual([
		renibel.info.readKey,
		iris.info.readKey,
		blis.info.readKey,
	])

	// when
	await provider.reorderTrainers([
		blis.info.readKey,
		renibel.info.readKey,
		iris.info.readKey,
	])

	// then
	const afterUpdate = await provider.allTrainers()
	expect(afterUpdate.map((it) => it.readKey)).toEqual([
		blis.info.readKey,
		renibel.info.readKey,
		iris.info.readKey,
	])
})

test("trainer size mismatch when reordering", async () => {
	const draft = (name: string) => ({
		name: name,
		description: "Likes stuff.",
		hp: {
			current: 6,
			max: 6,
		},
	})

	// given
	const renibel = await provider.newTrainer(draft("Renibel"))
	const iris = await provider.newTrainer(draft("Iris"))
	const blis = await provider.newTrainer(draft("Blis"))
	const noon = await provider.newTrainer(draft("Noon"))
	const punaraa = await provider.newTrainer(draft("Punaraa"))

	// when
	await provider.reorderTrainers([
		noon.info.readKey,
		blis.info.readKey,
		renibel.info.readKey,
	])

	// then: it puts the sorted ones in front, and keeps the relative order of the rest
	// NOTE: we cannot remove the unsorted ones, as we should never accidentally trainers
	// We cannot error either; it is possible to end up in a situation where some of the
	// trainer IDs are invalidated
	const afterUpdate = await provider.allTrainers()
	expect(afterUpdate.map((it) => it.readKey)).toEqual([
		noon.info.readKey,
		blis.info.readKey,
		renibel.info.readKey,
		iris.info.readKey,
		punaraa.info.readKey,
	])
})

test("moves: converting customization fields", async () => {
	// given
	const addedTrainer = await provider.newTrainer({
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	})
	const addedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, stubPokemonSpecies({
		id: "mimikyu",
	}))

	await addMoveWithCustomization(addedTrainer.writeKey, addedPokemon.id, {
		_move_id: "shadow-claw",
		_rank: 0,
		_to_hit_modifier: 2,
		_damage_modifier: 3,
		_save_dc_modifier: -1,
		_custom_type: "fairy",
		_custom_powers: ["str", "cha"],
		_custom_time: "bonus action",
	})

	// when
	const trainer = await provider.getTrainer(addedTrainer.info.readKey)
	const move = trainer.pokemon[0].moves[0]

	// then
	expect(move.moveId).toEqual("shadow-claw")
	expect(move.modifiers).toEqual({
		toHit: 2,
		damage: 3,
		saveDc: -1,
	})
	expect(move.customization.type).toEqual("fairy")
	expect(move.customization.powers).toEqual(["str", "cha"])
	expect(move.customization.time).toEqual({ unit: "bonus action" })
})

test("moves: no customization", async () => {
	// given
	const addedTrainer = await provider.newTrainer({
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	})
	const addedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, stubPokemonSpecies({
		id: "mimikyu",
	}))

	await addMoveWithCustomization(addedTrainer.writeKey, addedPokemon.id, {
		_move_id: "tackle",
		_rank: 0,
	})

	// when
	const trainer = await provider.getTrainer(addedTrainer.info.readKey)
	const move = trainer.pokemon[0].moves[0]

	// then
	expect(move.moveId).toEqual("tackle")
	expect(move.modifiers).toEqual({
		toHit: 0,
		damage: 0,
		saveDc: 0,
	})
	expect(move.customization.type).toBeUndefined()
	expect(move.customization.powers).toBeUndefined()
	expect(move.customization.time).toBeUndefined()
	expect(move.customization.duration).toBeUndefined()
	expect(move.customization.range).toBeUndefined()
})

test("moves: invalid customization values are ignored", async () => {
	// given
	const addedTrainer = await provider.newTrainer({
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	})
	const addedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, stubPokemonSpecies({
		id: "mimikyu",
	}))

	await addMoveWithCustomization(addedTrainer.writeKey, addedPokemon.id, {
		_move_id: "tackle",
		_rank: 0,
		_custom_type: "not-a-type",
		_custom_powers: ["dex", "luck"],
		_custom_time: "1 minute",
	})

	// when
	const trainer = await provider.getTrainer(addedTrainer.info.readKey)
	const move = trainer.pokemon[0].moves[0]

	// then
	expect(move.customization.type).toBeUndefined()
	expect(move.customization.powers).toEqual(["dex"])
	expect(move.customization.time).toBeUndefined()
})

test.each<{ name: string, unit: string, value: number | undefined, concentration: boolean | undefined, expected: MoveDuration }>([
	{ name: "instantaneous", unit: "instantaneous", value: undefined, concentration: undefined, expected: { unit: "instantaneous", concentration: false } },
	{ name: "rounds", unit: "round", value: 5, concentration: false, expected: { unit: "round", value: 5, concentration: false } },
	{ name: "minutes with concentration", unit: "minute", value: 10, concentration: true, expected: { unit: "minute", value: 10, concentration: true } },
	{ name: "varies", unit: "varies", value: undefined, concentration: undefined, expected: { unit: "varies", concentration: false } },
])("moves: converting custom duration ($name)", async ({ unit, value, concentration, expected }) => {
	// given
	const addedTrainer = await provider.newTrainer({
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	})
	const addedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, stubPokemonSpecies({
		id: "mimikyu",
	}))

	await addMoveWithCustomization(addedTrainer.writeKey, addedPokemon.id, {
		_move_id: "tackle",
		_rank: 0,
		_custom_duration_unit: unit,
		_custom_duration_value: value,
		_custom_concentration: concentration,
	})

	// when
	const trainer = await provider.getTrainer(addedTrainer.info.readKey)
	const move = trainer.pokemon[0].moves[0]

	// then
	expect(move.customization.duration).toEqual(expected)
})

test("moves: invalid custom duration is ignored", async () => {
	// given
	const addedTrainer = await provider.newTrainer({
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	})
	const addedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, stubPokemonSpecies({
		id: "mimikyu",
	}))

	await addMoveWithCustomization(addedTrainer.writeKey, addedPokemon.id, {
		_move_id: "tackle",
		_rank: 0,
		_custom_duration_unit: "fortnight",
		_custom_duration_value: 2,
		_custom_concentration: true,
	})

	// when
	const trainer = await provider.getTrainer(addedTrainer.info.readKey)
	const move = trainer.pokemon[0].moves[0]

	// then
	expect(move.customization.duration).toBeUndefined()
})

test.each<{ name: string, rangeType: string, rangeValue: number | undefined, expected: MoveRange }>([
	{ name: "distance", rangeType: "distance", rangeValue: 30, expected: { type: "distance", value: 30, unit: "feet" } },
	{ name: "melee", rangeType: "melee", rangeValue: undefined, expected: { type: "melee" } },
	{ name: "melee with reach", rangeType: "melee", rangeValue: 10, expected: { type: "melee", reach: { value: 10, unit: "feet" } } },
	{ name: "self", rangeType: "self", rangeValue: undefined, expected: { type: "self" } },
	{ name: "varies", rangeType: "varies", rangeValue: undefined, expected: { type: "varies" } },
])("moves: converting custom range ($name)", async ({ rangeType, rangeValue, expected }) => {
	// given
	const addedTrainer = await provider.newTrainer({
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	})
	const addedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, stubPokemonSpecies({
		id: "mimikyu",
	}))

	await addMoveWithCustomization(addedTrainer.writeKey, addedPokemon.id, {
		_move_id: "tackle",
		_rank: 0,
		_custom_range_type: rangeType,
		_custom_range_value: rangeValue,
	})

	// when
	const trainer = await provider.getTrainer(addedTrainer.info.readKey)
	const move = trainer.pokemon[0].moves[0]

	// then
	expect(move.customization.range).toEqual(expected)
})

test("moves: invalid custom range is ignored", async () => {
	// given
	const addedTrainer = await provider.newTrainer({
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	})
	const addedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, stubPokemonSpecies({
		id: "mimikyu",
	}))

	await addMoveWithCustomization(addedTrainer.writeKey, addedPokemon.id, {
		_move_id: "tackle",
		_rank: 0,
		_custom_range_type: "sideways",
		_custom_range_value: 30,
	})

	// when
	const trainer = await provider.getTrainer(addedTrainer.info.readKey)
	const move = trainer.pokemon[0].moves[0]

	// then
	expect(move.customization.range).toBeUndefined()
})

test("updateMoveset: adding a customized move", async () => {
	// given
	const addedTrainer = await provider.newTrainer({
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	})
	const addedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, stubPokemonSpecies({
		id: "mimikyu",
	}))

	const newMove = stubLearnedMove({
		moveId: "shadow-claw",
		modifiers: {
			toHit: 2,
			damage: 3,
			saveDc: -1,
		},
		customization: {
			type: "fairy",
			powers: ["str", "cha"],
			time: { unit: "bonus action" },
			duration: { unit: "minute", value: 10, concentration: true },
			range: { type: "distance", value: 30, unit: "feet" },
		},
	})

	// when
	await provider.updateMoveset(addedTrainer.writeKey, addedTrainer.info.readKey, addedPokemon.id, [newMove])

	// then
	const trainer = await provider.getTrainer(addedTrainer.info.readKey)
	const move = trainer.pokemon[0].moves[0]

	expect(move.moveId).toEqual("shadow-claw")
	expect(move.modifiers).toEqual(newMove.modifiers)
	expect(move.customization).toEqual(newMove.customization)
})

test("updateMoveset: customizing an existing move", async () => {
	// given
	const addedTrainer = await provider.newTrainer({
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	})
	const addedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, stubPokemonSpecies({
		id: "mimikyu",
	}))

	await addMoveWithCustomization(addedTrainer.writeKey, addedPokemon.id, {
		_move_id: "tackle",
		_rank: 0,
	})

	const existingMove = (await provider.getTrainer(addedTrainer.info.readKey)).pokemon[0].moves[0]

	// when
	const updatedMove = {
		...existingMove,
		modifiers: {
			toHit: 1,
			damage: 2,
			saveDc: 3,
		},
		customization: {
			type: "ghost",
			powers: ["dex"],
			time: { unit: "reaction" },
			duration: { unit: "round", value: 5, concentration: false },
			range: { type: "melee", reach: { value: 10, unit: "feet" } },
		},
	} satisfies LearnedMove
	await provider.updateMoveset(addedTrainer.writeKey, addedTrainer.info.readKey, addedPokemon.id, [updatedMove])

	// then
	const trainer = await provider.getTrainer(addedTrainer.info.readKey)
	const move = trainer.pokemon[0].moves[0]

	expect(move.id).toEqual(existingMove.id)
	expect(move.modifiers).toEqual(updatedMove.modifiers)
	expect(move.customization).toEqual(updatedMove.customization)
})

test("updateMoveset: removing customization from an existing move", async () => {
	// given
	const addedTrainer = await provider.newTrainer({
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	})
	const addedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, stubPokemonSpecies({
		id: "mimikyu",
	}))

	await addMoveWithCustomization(addedTrainer.writeKey, addedPokemon.id, {
		_move_id: "tackle",
		_rank: 0,
		_to_hit_modifier: 2,
		_damage_modifier: 3,
		_save_dc_modifier: -1,
		_custom_type: "fairy",
		_custom_powers: ["str", "cha"],
		_custom_time: "bonus action",
		_custom_duration_unit: "minute",
		_custom_duration_value: 10,
		_custom_concentration: true,
		_custom_range_type: "distance",
		_custom_range_value: 30,
	})

	const existingMove = (await provider.getTrainer(addedTrainer.info.readKey)).pokemon[0].moves[0]

	// when
	const updatedMove = {
		...existingMove,
		modifiers: {
			toHit: 0,
			damage: 0,
			saveDc: 0,
		},
		customization: {},
	} satisfies LearnedMove
	await provider.updateMoveset(addedTrainer.writeKey, addedTrainer.info.readKey, addedPokemon.id, [updatedMove])

	// then
	const trainer = await provider.getTrainer(addedTrainer.info.readKey)
	const move = trainer.pokemon[0].moves[0]

	expect(move.id).toEqual(existingMove.id)
	expect(move.modifiers).toEqual({
		toHit: 0,
		damage: 0,
		saveDc: 0,
	})
	expect(move.customization.type).toBeUndefined()
	expect(move.customization.powers).toBeUndefined()
	expect(move.customization.time).toBeUndefined()
	expect(move.customization.duration).toBeUndefined()
	expect(move.customization.range).toBeUndefined()
})

async function addMoveWithCustomization(writeKey: ReadWriteKey, pokemonId: PokemonId, args: {
	_move_id: string,
	_rank: number,
	_to_hit_modifier?: number,
	_damage_modifier?: number,
	_save_dc_modifier?: number,
	_custom_type?: string,
	_custom_powers?: string[],
	_custom_time?: string,
	_custom_duration_unit?: string,
	_custom_duration_value?: number,
	_custom_concentration?: boolean,
	_custom_range_type?: string,
	_custom_range_value?: number,
}) {
	const { error } = await supabase.rpc("add_move", {
		_write_key: writeKey,
		_pokemon_id: pokemonId,
		_pp_cur: 10,
		_pp_max: 10,
		_notes: "",
		_to_hit_modifier: null,
		_damage_modifier: null,
		_save_dc_modifier: null,
		_custom_type: null,
		_custom_powers: null,
		_custom_time: null,
		_custom_duration_unit: null,
		_custom_duration_value: null,
		_custom_concentration: null,
		_custom_range_type: null,
		_custom_range_value: null,
		// undefined keys are dropped from the request, so they must be null to match the function signature
		...Object.fromEntries(Object.entries(args).map(([key, value]) => [key, value ?? null])),
	}).single<number>()

	if (error) throw error
}

async function addPokemonWithDeprecatedAbilityField(writeKey: ReadWriteKey, pokemon: PokemonSpecies) {
	await supabase.rpc("add_pokemon", {
		_write_key: writeKey,
		_nickname: pokemon.data.name,
		_species: pokemon.id.data,
		_nature: "hardy",
		_type: pokemon.type.data,
		_level: pokemon.data.minLevel,
		_gender: "none",
		_strength: pokemon.attributes.str.score,
		_dexterity: pokemon.attributes.dex.score,
		_constitution: pokemon.attributes.con.score,
		_intelligence: pokemon.attributes.int.score,
		_wisdom: pokemon.attributes.wis.score,
		_charisma: pokemon.attributes.cha.score,
		_ac: pokemon.data.ac,
		_hp_cur: pokemon.data.hp,
		_hp_max: pokemon.data.hp,
		_hit_dice_cur: pokemon.data.minLevel,
		_hit_dice_max: pokemon.data.minLevel,
		_rank_athletics: 0,
		_rank_acrobatics: 0,
		_rank_sleight_of_hand: 0,
		_rank_stealth: 0,
		_rank_arcana: 0,
		_rank_history: 0,
		_rank_investigation: 0,
		_rank_nature: 0,
		_rank_religion: 0,
		_rank_animal_handling: 0,
		_rank_insight: 0,
		_rank_medicine: 0,
		_rank_perception: 0,
		_rank_survival: 0,
		_rank_deception: 0,
		_rank_intimidation: 0,
		_rank_performance: 0,
		_rank_persuasion: 0,
		_save_str: pokemon.data.saves.includes("str"),
		_save_dex: pokemon.data.saves.includes("dex"),
		_save_con: pokemon.data.saves.includes("con"),
		_save_int: pokemon.data.saves.includes("int"),
		_save_wis: pokemon.data.saves.includes("wis"),
		_save_cha: pokemon.data.saves.includes("cha"),
		_ability: pokemon.abilities.normal[0].referenceId,
		_abilities: [],
		_notes: "",
		_tera_type: pokemon.type.primary,
		_exp: 0,
		_status: null,
		_held_item: null,
		_is_shiny: false,
		_custom_size: null,
		_hit_dice_size: null,
		_speed_walking: null,
		_speed_climbing: null,
		_speed_swimming: null,
		_speed_flying: null,
		_speed_hover: null,
		_speed_burrowing: null,
		_sense_darkvision: null,
		_sense_blindsight: null,
		_sense_tremorsense: null,
		_sense_truesight: null,
		_bond_level: 0,
		_bond_points_cur: 0,
		_bond_points_max: 0,
		_rank: 0,
		_stab_base: "default",
		_stab_bonus: 0,
	}).single<number>()
}
