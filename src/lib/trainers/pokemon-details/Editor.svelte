<script lang="ts">
	import type { Pokemon } from "$lib/creatures/types"
	import Button from "$lib/design/Button.svelte"
	import { ActionArea, Form, FormDetails, MarkdownField } from "$lib/design/forms"
	import Fieldset from "$lib/design/forms/Fieldset.svelte"
	import { AttributesFieldset, SavingThrowsFieldset } from "$lib/dnd/attributes"
	import { ProficienciesFieldset } from "$lib/dnd/skills"
	import { createEventDispatcher } from "svelte"
	import { CustomNatureIdentifier, isStandardNature } from "../nature"
	import { type TrainerPokemon } from "../types"
	import BasicInfoFieldset from "./forms/BasicInfoFieldset.svelte"
	import AbilitiesFieldset from "./forms/AbilitiesFieldset.svelte"
	import HeldItemsFieldset from "./forms/HeldItemsFieldset.svelte"
	import MovesFieldset from "./forms/MovesFieldset.svelte"
	import FeatsFieldset from "$lib/feats/FeatsFieldset.svelte"
	import { DndAndPokemonFeats } from "$lib/feats/PokemonFeats"
	import CustomBasicInfoFieldset from "./forms/CustomBasicInfoFieldset.svelte"
	import { SensesFieldset } from "$lib/dnd/senses"
	import BondFieldset from "$lib/pokemon/bond/BondFieldset.svelte"
	import { Level } from "$lib/dnd/level"
	import { SpeedsFieldset } from "$lib/dnd/movement"
	import { PokemonTeraType, TypeField, type TeraType } from "$lib/pokemon/types-2"
	import { GenderFieldset } from "$lib/creatures/gender"
	import { HitDice } from "$lib/dnd/hit-dice"

	const dispatch = createEventDispatcher()

	export let pokemon: TrainerPokemon
	export let species: Pokemon
	export let saving: boolean = false
	$: disabled = saving

	let nickname = pokemon.nickname
	let nature = isStandardNature(pokemon.nature) ? pokemon.nature : CustomNatureIdentifier
	let tera = pokemon.teraType?.copy() ?? new PokemonTeraType("" as TeraType) // deal with undefined teras on older pokemon
	let natureCustom = pokemon.nature
	let level = pokemon.level.data
	let ac = pokemon.ac
	let maxHp = pokemon.hp.max
	let maxHitDice = pokemon.hitDice.max
	let gender = pokemon.gender
	let attributes = pokemon.attributes.copy()
	let ability = pokemon.ability
	let proficiencies = pokemon.proficiencies.copy()
	let savingThrows = [...pokemon.savingThrows]
	let notes = pokemon.notes
	let type = pokemon.type.copy()
	let isShiny = pokemon.isShiny
	let feats = pokemon.feats.map((it) => structuredClone(it))
	let customSize = pokemon.customSize
	let customHitDiceSize = pokemon.customHitDiceSize?.data
	let speeds = pokemon.speeds.copy()
	let senses = pokemon.senses.copy()
	let bond = structuredClone(pokemon.bond)

	let moves = structuredClone(pokemon.moves)
	let items = structuredClone(pokemon.items)

	const cancel = () => {
		dispatch("cancel")
	}

	const endEdit = () => {
		dispatch("update", {
			...pokemon,
			nickname: nickname.length > 0 ? nickname : species.name,
			type,
			nature: nature === "other" ? natureCustom : nature,
			teraType: tera,
			level: new Level(level),
			ac,
			hp: {
				current: pokemon.hp.current + (maxHp - pokemon.hp.max),
				max: maxHp,
			},
			hitDice: {
				current: pokemon.hitDice.current + (maxHitDice - pokemon.hitDice.max),
				max: maxHitDice,
			},
			gender,
			isShiny,
			attributes,
			ability,
			proficiencies,
			savingThrows,
			moves,
			items,
			notes,
			feats,
			customSize,
			customHitDiceSize: customHitDiceSize ? new HitDice(customHitDiceSize) : undefined,
			speeds,
			senses,
			bond: {
				...bond,
				points: {
					current: Math.max(0, pokemon.bond.points.current + (bond.points.max - pokemon.bond.points.max)),
					max: bond.points.max,
				},
			},
		} as TrainerPokemon)
	}
</script>

<Form onsubmit={endEdit} {saving}>
	<BasicInfoFieldset bind:nickname bind:nature bind:natureCustom bind:tera={tera} bind:level bind:ac bind:maxHp bind:maxHitDice bind:isShiny {disabled} />
	<GenderFieldset bind:value={gender} {disabled} />
	<AttributesFieldset bind:values={attributes} {disabled} />
	<AbilitiesFieldset bind:ability {species} {disabled} />
	<BondFieldset bind:value={bond} {disabled} />
	<ProficienciesFieldset bind:values={proficiencies} {disabled} />
	<SavingThrowsFieldset bind:values={savingThrows} {disabled} />
	<MovesFieldset bind:values={moves} {species} {level} {disabled} />
	<FeatsFieldset feats={$DndAndPokemonFeats} bind:values={feats} {disabled} />
	<HeldItemsFieldset bind:items {disabled} />
	<Fieldset title="General">
		<MarkdownField label="Notes" bind:value={notes} placeholder="Use this for any general notes not covered by the above fields..." {disabled} />
	</Fieldset>
	<FormDetails title="Advanced">
		<TypeField bind:value={type.data} {disabled} />
		<CustomBasicInfoFieldset bind:customSize bind:customHitDiceSize {disabled} />
		<SpeedsFieldset bind:values={speeds} {disabled} />
		<SensesFieldset bind:values={senses} {disabled} />
	</FormDetails>
	<ActionArea>
		<Button on:click={cancel} variant="ghost" {disabled}>Cancel</Button>
		<Button type="submit" {disabled}>Finish!</Button>
	</ActionArea>
</Form>
