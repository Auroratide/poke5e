import { test, expect } from "vitest"
import { provider } from ".."
import { FakemonPermissionError } from "../FakemonDataProvider"
import { stubFakemon } from "$lib/fakemon/test/stubs"
import { FakemonLocalStorage } from "../FakemonLocalStorage"
import type { ImageInputValue } from "$lib/ui/forms"
import { stubImageFile } from "$lib/test/files"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import { stubSpeciesMedia } from "$lib/poke5e/species/media/test/stubs"
import { supabase } from "$lib/supabase"
import { Fakemon } from "$lib/fakemon"
import { SpeciesIdentifier, type PokemonSpecies } from "$lib/poke5e/species"
import { stubAbility, stubAbilityPool } from "$lib/pokemon/ability/test/stubs"

test("add, get, and update", async () => {
	const draft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Droideon",
		}).data,
	})

	const added = await provider.add(draft.data.species)
	const received = await provider.getByReadKey(added.data.readKey)
	expect(received.data.species.name).toEqual(draft.data.species.name)

	added.data.species.name = "Aereon"
	const didUpdate = await provider.update(added)
	expect(didUpdate).toBe(true)

	const afterUpdate = await provider.getByReadKey(added.data.readKey)
	expect(afterUpdate.data.species.name).toEqual("Aereon")
})

test("no permission to update", async () => {
	const draft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Droideon",
		}).data,
	})

	const added = await provider.add(draft.data.species)
	localStorage.clear()

	const received = await provider.getByReadKey(added.data.readKey)

	// result of get is not supposed to have a write key
	received.data.species.name = "Aereon"
	await expect(provider.update(received)).rejects.toThrow(FakemonPermissionError)
})

test("getAllKnown", async () => {
	const drakeon = stubFakemon({
		species: stubPokemonSpecies({
			name: "Drakeon",
		}).data,
	})
	const droideon = stubFakemon({
		species: stubPokemonSpecies({
			name: "Droideon",
		}).data,
	})

	await provider.add(drakeon.data.species)
	await provider.add(droideon.data.species)

	const result = await provider.getAllKnown()
	const resultNames = result.map((it) => it.data.species.name)

	expect(resultNames).toHaveLength(2)
	expect(resultNames).toContain("Drakeon")
	expect(resultNames).toContain("Droideon")
})

test("getAllKnown, but one is invalid", async () => {
	FakemonLocalStorage.add({
		id: "fake id",
		readKey: "fake key",
	})

	const drakeon = stubFakemon({
		species: stubPokemonSpecies({
			name: "Drakeon",
		}).data,
	})

	await provider.add(drakeon.data.species)

	const result = await provider.getAllKnown()
	const resultNames = result.map((it) => it.data.species.name)

	expect(resultNames).toHaveLength(1)
	expect(resultNames).toContain("Drakeon")
})

test.skip("uploading new media", async () => {
	const draft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Droideon",
		}).data,
	})

	const added = await provider.add(draft.data.species)
	const received = await provider.getByReadKey(added.data.readKey)
	expect(received.data.species.name).toEqual(draft.data.species.name)

	const result = await provider.updateMedia(added.data.writeKey, stubSpeciesMedia<ImageInputValue>({
		values: {
			shinyPortrait: {
				type: "new",
				value: stubImageFile("img.png"),
				href: "",
			},
		},
	}))

	expect(result.data.values.normalPortrait).toBeUndefined()
	expect(result.data.values.normalSprite).toBeUndefined()
	expect(result.data.values.shinySprite).toBeUndefined()
	expect(result.data.values.shinyPortrait?.name).toBeDefined()
	expect(result.data.values.shinyPortrait?.href).toBeDefined()

	const afterUpdate = await provider.getByReadKey(added.data.readKey)
	expect(afterUpdate.data.species.media.values.shinyPortrait?.name).toEqual(result.data.values.shinyPortrait.name)

	// include a deletion
	const resultWithDelete = await provider.updateMedia(added.data.writeKey, stubSpeciesMedia<ImageInputValue>({
		values: {
			normalPortrait: {
				type: "new",
				value: stubImageFile("img.png"),
				href: "",
			},
			shinyPortrait: {
				type: "remove",
			},
		},
	}))

	expect(resultWithDelete.data.values.normalPortrait?.name).toBeDefined()
	expect(resultWithDelete.data.values.normalSprite).toBeUndefined()
	expect(resultWithDelete.data.values.shinyPortrait).toBeUndefined()
	expect(resultWithDelete.data.values.shinySprite).toBeUndefined()

	const afterDeletion = await provider.getByReadKey(added.data.readKey)

	expect(afterDeletion.data.species.media.values.normalPortrait?.name).toEqual(resultWithDelete.data.values.normalPortrait.name)
	expect(afterDeletion.data.species.media.values.shinyPortrait).toBeUndefined()
})

test("verify write key", async () => {
	const draft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Droideon",
		}).data,
	})

	const added = await provider.add(draft.data.species)

	const noMatch = await provider.verifyWriteKey(added, "Bad write key")
	expect(noMatch).toBe(false)

	const match = await provider.verifyWriteKey(added, added.data.writeKey)
	expect(match).toBe(true)
})

test("backwards compatibility of abilities", async () => {
	const disguise = stubAbility({
		referenceId: "disguise",
		name: "Disguise",
		description: "This Pokémon has a disguise which gives it a temporary hp boost equal to twice its level. When the temporary hit points fall to zero, the disguise breaks and requires a short rest to repair.",
	})
	const adaptability = stubAbility({
		referenceId: "adaptability",
		name: "Adaptability",
		description: "When this Pokémon uses a move of its own type, it may roll the damage twice and choose either total.",
	})

	const toAdd = stubPokemonSpecies({
		abilities: stubAbilityPool({
			normal: [disguise.data],
			hidden: [adaptability.data],
		}).data,
	})

	const fakemon = await addFakemonWithDeprecatedAbilityField(toAdd)
	const fakemonFromProvider = await provider.getByReadKey(fakemon.data.readKey)

	expect(fakemonFromProvider.species.abilities.normal).toHaveLength(1)
	expect(fakemonFromProvider.species.abilities.hidden).toHaveLength(1)
	expect(fakemonFromProvider.species.abilities.normal[0]).toEqualData(disguise)
	expect(fakemonFromProvider.species.abilities.hidden[0]).toEqualData(adaptability)
})

async function addFakemonWithDeprecatedAbilityField(pokemon: PokemonSpecies) {
	const { data, error } = await supabase.rpc("new_fakemon", {
		_species_name: pokemon.name,
		_type: pokemon.type.data,
		_size: pokemon.size,
		_sr: pokemon.sr.data,
		_min_level: pokemon.minLevel,
		_egg_groups: pokemon.eggGroups.data,
		_gender: pokemon.gender.data,
		_description: pokemon.data.description,
		_ac: pokemon.data.ac,
		_hp: pokemon.hp,
		_hit_dice: pokemon.hitDice.data,
		_speed_walking: pokemon.speed.data.walking ?? 0,
		_speed_climbing: pokemon.speed.data.climbing ?? 0,
		_speed_swimming: pokemon.speed.data.swimming ?? 0,
		_speed_flying: pokemon.speed.data.flying ?? 0,
		_speed_hover: pokemon.speed.data.hover ?? 0,
		_speed_burrowing: pokemon.speed.data.burrowing ?? 0,
		_sense_darkvision: pokemon.senses.data.darkvision ?? 0,
		_sense_blindsight: pokemon.senses.data.blindsight ?? 0,
		_sense_tremorsense: pokemon.senses.data.tremorsense ?? 0,
		_sense_truesight: pokemon.senses.data.truesight ?? 0,
		_strength: pokemon.attributes.str.score,
		_dexterity: pokemon.attributes.dex.score,
		_constitution: pokemon.attributes.con.score,
		_intelligence: pokemon.attributes.int.score,
		_wisdom: pokemon.attributes.wis.score,
		_charisma: pokemon.attributes.cha.score,
		_prof_athletics: pokemon.skills["athletics"] > 0,
		_prof_acrobatics: pokemon.skills["acrobatics"] > 0,
		_prof_sleight_of_hand: pokemon.skills["sleight of hand"] > 0,
		_prof_stealth: pokemon.skills["stealth"] > 0,
		_prof_arcana: pokemon.skills["arcana"] > 0,
		_prof_history: pokemon.skills["history"] > 0,
		_prof_investigation: pokemon.skills["investigation"] > 0,
		_prof_nature: pokemon.skills["nature"] > 0,
		_prof_religion: pokemon.skills["religion"] > 0,
		_prof_animal_handling: pokemon.skills["animal handling"] > 0,
		_prof_insight: pokemon.skills["insight"] > 0,
		_prof_medicine: pokemon.skills["medicine"] > 0,
		_prof_perception: pokemon.skills["perception"] > 0,
		_prof_survival: pokemon.skills["survival"] > 0,
		_prof_deception: pokemon.skills["deception"] > 0,
		_prof_intimidation: pokemon.skills["intimidation"] > 0,
		_prof_performance: pokemon.skills["performance"] > 0,
		_prof_persuasion: pokemon.skills["persuasion"] > 0,
		_save_str: pokemon.data.saves.includes("str"),
		_save_dex: pokemon.data.saves.includes("dex"),
		_save_con: pokemon.data.saves.includes("con"),
		_save_int: pokemon.data.saves.includes("int"),
		_save_wis: pokemon.data.saves.includes("wis"),
		_save_cha: pokemon.data.saves.includes("cha"),
		_abilities: pokemon.abilities.normal.map((it) => it.referenceId), // deprecated
		_hidden_abilities: pokemon.abilities.hidden.map((it) => it.referenceId), // deprecated
		_ability_pool: {
			normal: [],
			hidden: [],
		},
		_moves_start: pokemon.moves.start,
		_moves_level2: pokemon.moves.level2,
		_moves_level6: pokemon.moves.level6,
		_moves_level10: pokemon.moves.level10,
		_moves_level14: pokemon.moves.level14,
		_moves_level18: pokemon.moves.level18,
		_moves_egg: pokemon.moves.egg,
		_moves_tm: pokemon.moves.tm,
		_art_attribution_type: null,
		_art_attribution_name: null,
		_art_attribution_href: null,
		_sprite_attribution_type: null,
		_sprite_attribution_name: null,
		_sprite_attribution_href: null,
		_shiny_hue_rotation: pokemon.media.customization?.shinyHue ?? 0,
		_notes: "",
	}).single<{
		ret_id: string,
		ret_read_key: string,
		ret_write_key: string,
	}>()

	if (error) {
		console.log(error)
		throw error
	}

	const identifyingInfo = {
		id: data.ret_id,
		readKey: data.ret_read_key,
		writeKey: data.ret_write_key,
	}

	return new Fakemon({
		species: {
			...pokemon.data,
			id: SpeciesIdentifier.fromFakemonReadKey(identifyingInfo.readKey).data,
		},
		...identifyingInfo,
	})
}

