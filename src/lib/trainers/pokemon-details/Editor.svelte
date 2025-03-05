<script lang="ts">
	import { type TrainerPokemon } from "../types"
	import { CustomNatureIdentifier, isStandardNature } from "../nature"
	import { createEventDispatcher } from "svelte"
	import Button from "$lib/design/Button.svelte"
	import Fieldset from "$lib/design/Form/Fieldset.svelte"
	import ActionArea from "$lib/design/Form/ActionArea.svelte"
	import NatureInput from "./NatureInput.svelte"
	import type { Pokemon } from "$lib/creatures/types"
	import Saveable from "$lib/design/Saveable.svelte"
	import TypeInput from "./TypeInput.svelte"
	import FormDetails from "$lib/design/Form/FormDetails.svelte"
	import NameInput from "../form/NameInput.svelte"
	import LevelInput from "../form/LevelInput.svelte"
	import AcInput from "../form/AcInput.svelte"
	import NumberInput from "../form/NumberInput.svelte"
	import PokeGenderFieldset from "../form/PokeGenderFieldset.svelte"
	import AttributesFieldset from "../form/AttributesFieldset.svelte"
	import PokeAbilityInput from "../form/PokeAbilityInput.svelte"
	import ProficienciesFieldset from "../form/ProficienciesFieldset.svelte"
	import SavingThrowsFieldset from "../form/SavingThrowsFieldset.svelte"
	import PokeMovesFieldset from "../form/PokeMovesFieldset.svelte"
	import GeneralTextarea from "../form/GeneralTextarea.svelte"
	import TeraTypeInput from "./TeraTypeInput.svelte"
	import ToggleSwitchInput from "../form/ToggleSwitchInput.svelte"

	const dispatch = createEventDispatcher()

	export let pokemon: TrainerPokemon
	export let species: Pokemon
	export let saving: boolean = false
	$: disabled = saving

	let nickname = pokemon.nickname
	let nature = isStandardNature(pokemon.nature) ? pokemon.nature : CustomNatureIdentifier
	let tera = pokemon.teraType
	let natureCustom = pokemon.nature
	let level = pokemon.level
	let ac = pokemon.ac
	let maxHp = pokemon.hp.max
	let maxHitDice = pokemon.hitDice.max
	let gender = pokemon.gender
	let attributes = { ...pokemon.attributes }
	let ability = pokemon.ability
	let proficiencies = pokemon.proficiencies
	let savingThrows = pokemon.savingThrows
	let notes = pokemon.notes
	let type = pokemon.type
	let isShiny = pokemon.isShiny

	let moves = structuredClone(pokemon.moves)

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
			level,
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
			notes,
		} as TrainerPokemon)
	}
</script>

<Saveable {saving}>
	<form on:submit|preventDefault={endEdit}>
		<Fieldset title="Basic Info">
			<NameInput label="Nickname" bind:value={nickname} {disabled} />
			<NatureInput id="nature-input" bind:value={nature} bind:custom={natureCustom} {disabled} />
			<TeraTypeInput id="tera-input" bind:value={tera} {disabled} />
			<LevelInput bind:value={level} bind:maxHitDice={maxHitDice} {disabled} />
			<AcInput bind:value={ac} {disabled} />
			<NumberInput name="max-hp" label="Max HP" bind:value={maxHp} {disabled} />
			<NumberInput name="max-hit-dice" label="Max Hit Dice" bind:value={maxHitDice} {disabled} />
			<ToggleSwitchInput name="shiny" label="Shiny" bind:value={isShiny} {disabled} />
		</Fieldset>
		<PokeGenderFieldset bind:value={gender} {disabled} />
		<AttributesFieldset bind:values={attributes} {disabled} />
		<Fieldset title="Feats">
			<PokeAbilityInput abilities={species.abilities} bind:value={ability} {disabled} />
		</Fieldset>
		<ProficienciesFieldset bind:values={proficiencies} {disabled} />
		<SavingThrowsFieldset bind:values={savingThrows} {disabled} />
		<PokeMovesFieldset bind:values={moves} {disabled} />
		<Fieldset title="General">
			<GeneralTextarea name="notes" label="Notes" bind:value={notes} {disabled} placeholder="Use this for any general notes not covered by the above fields..." />
		</Fieldset>
		<FormDetails title="Advanced">
			<TypeInput bind:value={type} id="type-input" />
		</FormDetails>
		<ActionArea>
			<Button on:click={cancel} variant="ghost" {disabled}>Cancel</Button>
			<Button type="submit" {disabled}>Finish!</Button>
		</ActionArea>
	</form>
</Saveable>
