import { test, expect, beforeEach, afterEach, vi } from "vitest"
import { provider } from ".."
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import { Level } from "$lib/dnd/level"
import { stubAbility, stubAbilityPool } from "$lib/pokemon/ability/test/stubs"
import { ApiStub } from "$lib/test/ApiStub"
import { supabase } from "$lib/supabase"
import type { PokemonSpecies } from "$lib/poke5e/species"
import type { ReadWriteKey } from "$lib/trainers/types"

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
	}

	const firstSpeciesToAdd = stubPokemonSpecies({
		id: "mimikyu",
	})
	const secondSpeciesToAdd = stubPokemonSpecies({
		id: "kirlia",
	})

	const addedTrainer = await provider.newTrainer(trainerToAdd)
	const firstAddedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.id, firstSpeciesToAdd)
	const secondAddedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.id, secondSpeciesToAdd)

	const receivedTrainer = await provider.getTrainer(addedTrainer.info.readKey)
	const receivedPokemonIds = receivedTrainer.pokemon.map((it) => it.id)

	expect(receivedTrainer.info.name).toEqual("Renibel")
	expect(receivedPokemonIds).toContain(firstAddedPokemon.id)
	expect(receivedPokemonIds).toContain(secondAddedPokemon.id)

	firstAddedPokemon.bond.level = 3
	await provider.updatePokemon(addedTrainer.writeKey, firstAddedPokemon)
	addedTrainer.info.level = new Level(10)
	await provider.updateTrainerInfo(addedTrainer.writeKey, addedTrainer.info)

	const trainerAfterUpdate = await provider.getTrainer(addedTrainer.info.readKey)
	const firstPokemonAfterUpdate = trainerAfterUpdate.pokemon.find((it) => it.id === firstAddedPokemon.id)

	expect(trainerAfterUpdate.info.level).toEqualData(new Level(10))
	expect(firstPokemonAfterUpdate.bond.level).toEqual(3)
})

test("getting abilities", async () => {
	const trainerToAdd = {
		name: "Renibel",
		description: "Likes cryptids.",
	}

	const speciesToAdd = stubPokemonSpecies({
		id: "mimikyu",
		abilities: stubAbilityPool({
			normal: [ABILITIES.disguise],
			hidden: [],
		}),
	})

	const addedTrainer = await provider.newTrainer(trainerToAdd)
	const addedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.id, speciesToAdd)
	
	addedPokemon.abilities = [ABILITIES.disguise, ABILITIES.intimidate]

	await provider.updatePokemon(addedTrainer.writeKey, addedPokemon)

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
	const firstAddedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.id, firstSpeciesToAdd)
	const secondAddedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.id, secondSpeciesToAdd)
	const thirdAddedPokemon = await provider.addPokemonToTeam(addedTrainer.writeKey, addedTrainer.info.id, thirdSpeciesToAdd)

	// when
	await provider.reorderPokemonTeam(addedTrainer.writeKey, [secondAddedPokemon, thirdAddedPokemon, firstAddedPokemon])

	// then
	const receivedTrainer = await provider.getTrainer(addedTrainer.info.readKey)
	const receivedPokemon = receivedTrainer.pokemon.map((it) => it.pokemonId.data)

	expect(receivedPokemon).toEqual(["kirlia", "litwick", "mimikyu"])
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
