import { test, expect, beforeEach, afterEach, vi } from "vitest"
import { provider } from ".."
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import { Level } from "$lib/dnd/level"
import { stubAbility, stubAbilityPool } from "$lib/pokemon/ability/test/stubs"
import { ApiStub } from "$lib/test/ApiStub"
import { supabase } from "$lib/supabase"
import type { PokemonSpecies } from "$lib/poke5e/species"
import type { ReadWriteKey } from "$lib/trainers/types"
import { TagList } from "$lib/poke5e/tags"
import { TrainerLocalStorage } from "../TrainerLocalStorage"
import { provider as transferProvider } from "../../pokemon-transfer"
import { stubLearnedMove } from "$lib/trainers/test/stubs"
import { PokemonStorage } from "../../pokemon-storage"

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

test("moving pokemon between the party and the box", async () => {
	// given
	const trainerToAdd = {
		name: "Renibel",
		description: "Likes cryptids.",
		hp: {
			current: 6,
			max: 6,
		},
	}

	// Explicit ranks: the stubs share a nickname, so without them ORDER BY
	// rank, nickname has nothing to break the tie and the order is arbitrary.
	const addedTrainer = await provider.newTrainer(trainerToAdd)
	const first = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, stubPokemonSpecies({ id: "mimikyu" }), 1)
	const second = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, stubPokemonSpecies({ id: "kirlia" }), 2)
	const third = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.readKey, addedTrainer.info.id, stubPokemonSpecies({ id: "litwick" }), 3)

	// then: a newly caught pokemon joins the party
	expect(first.storage).toEqual(PokemonStorage.Party)

	// when: the middle one is deposited
	await provider.setPokemonStorage(addedTrainer.writeKey, addedTrainer.info.readKey, second.id, PokemonStorage.Box)

	// then: only it is boxed, and the party keeps its order
	const afterDeposit = await provider.getTrainer(addedTrainer.info.readKey)
	expect(afterDeposit.pokemon.filter((it) => it.storage === PokemonStorage.Box).map((it) => it.pokemonId.data)).toEqual(["kirlia"])
	expect(afterDeposit.pokemon.filter((it) => it.storage === PokemonStorage.Party).map((it) => it.pokemonId.data)).toEqual(["mimikyu", "litwick"])

	// when: it is withdrawn again
	await provider.setPokemonStorage(addedTrainer.writeKey, addedTrainer.info.readKey, second.id, PokemonStorage.Party)

	// then: it rejoins at the end of the party
	const afterWithdraw = await provider.getTrainer(addedTrainer.info.readKey)
	expect(afterWithdraw.pokemon.map((it) => it.pokemonId.data)).toEqual(["mimikyu", "litwick", "kirlia"])
	expect(afterWithdraw.pokemon.every((it) => it.storage === PokemonStorage.Party)).toBe(true)

	// and: an unknown location is refused outright
	await expect(provider.setPokemonStorage(addedTrainer.writeKey, addedTrainer.info.readKey, third.id, "daycare" as PokemonStorage)).rejects.toThrow()
})

test("no permission to move a pokemon", async () => {
	const draft = (name: string) => ({
		name: name,
		description: "Likes stuff.",
		hp: {
			current: 6,
			max: 6,
		},
	})

	// given: a pokemon belonging to one trainer
	const renibel = await provider.newTrainer(draft("Renibel"))
	const iris = await provider.newTrainer(draft("Iris"))
	const pokemon = await provider.addPokemonToTeam(renibel.writeKey, renibel.info.readKey, renibel.info.id, stubPokemonSpecies({ id: "mimikyu" }))

	// when: another trainer's write key tries to move it
	await expect(provider.setPokemonStorage(iris.writeKey, renibel.info.readKey, pokemon.id, PokemonStorage.Box)).rejects.toThrow()

	// then: it stayed put
	const afterAttempt = await provider.getTrainer(renibel.info.readKey)
	expect(afterAttempt.pokemon[0].storage).toEqual(PokemonStorage.Party)
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

	// given: the pokemon is in the sender's box, to prove where it lands
	await provider.setPokemonStorage(addedFirstTrainer.writeKey, addedFirstTrainer.info.readKey, addedPokemon.id, PokemonStorage.Box)

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

	// then: a transferred pokemon arrives in the party even when it was boxed,
	// and the sender's copy keeps its own place
	expect(transferedPokemon.storage).toEqual(PokemonStorage.Party)
	expect(refreshedSecondTrainer.pokemon[0].storage).toEqual(PokemonStorage.Party)

	const refreshedFirstTrainer = await provider.getTrainer(addedFirstTrainer.info.readKey)
	expect(refreshedFirstTrainer.pokemon[0].storage).toEqual(PokemonStorage.Box)
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
