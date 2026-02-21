<script lang="ts" context="module">
	export type UpdateDetail = {
		pokemon: TrainerPokemon,
		updateAvatar?: ImageInputValue,
	}
</script>

<script lang="ts">
	import { Button } from "$lib/ui/elements"
	import { ActionArea, Form, FormDetails, MarkdownField, type ImageInputValue, Fieldset } from "$lib/ui/forms"
	import { AttributesFieldset, SavingThrowsFieldset } from "$lib/dnd/attributes"
	import { ProficienciesFieldset } from "$lib/dnd/skills"
	import { createEventDispatcher } from "svelte"
	import { type TrainerPokemon } from "../types"
	import BasicInfoFieldset from "./forms/BasicInfoFieldset.svelte"
	import AbilitiesFieldset from "./forms/AbilitiesFieldset.svelte"
	import HeldItemsFieldset from "./forms/HeldItemsFieldset.svelte"
	import MovesFieldset from "./forms/MovesFieldset.svelte"
	import { FeatsFieldset } from "$lib/dnd/feats"
	import { DndAndPokemonFeats } from "$lib/poke5e/feats/PokemonFeats"
	import CustomBasicInfoFieldset from "./forms/CustomBasicInfoFieldset.svelte"
	import { SensesFieldset } from "$lib/dnd/senses"
	import BondFieldset from "$lib/pokemon/bond/BondFieldset.svelte"
	import { Level } from "$lib/dnd/level"
	import { SpeedsFieldset } from "$lib/dnd/movement"
	import { PokemonTeraType, TypeField, type TeraType } from "$lib/pokemon/types"
	import { GenderFieldset } from "$lib/pokemon/gender"
	import { HitDice } from "$lib/dnd/hit-dice"
	import type { PokemonSpecies } from "$lib/poke5e/species"
	import { m } from "$lib/site/i18n"
	import { Resource } from "$lib/poke5e/resource"

	const dispatch = createEventDispatcher()

	export let pokemon: TrainerPokemon
	export let species: PokemonSpecies
	export let saving: boolean = false
	$: disabled = saving

	let nickname = pokemon.nickname
	let nature = pokemon.nature.copy()
	let tera = pokemon.teraType?.copy() ?? new PokemonTeraType("" as TeraType) // deal with undefined teras on older pokemon
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
	let originalAvatar = pokemon.avatar
	let avatarToUpload: ImageInputValue | undefined = undefined
	let isValid = true

	let moves = structuredClone(pokemon.moves)
	let items = structuredClone(pokemon.items)

	const cancel = () => {
		dispatch("cancel")
	}

	const endEdit = () => {
		dispatch("update", {
			pokemon: {
				...pokemon,
				nickname: nickname.length > 0 ? nickname : species.data.name,
				type,
				nature: nature,
				teraType: tera,
				level: new Level(level),
				ac,
				hp: Resource.adjustMax(pokemon.hp, maxHp),
				hitDice: Resource.adjustMax(pokemon.hitDice, maxHitDice),
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
					points: Resource.adjustMax(pokemon.bond.points, bond.points.max),
				},
				avatar: originalAvatar,
			},
			updateAvatar: avatarToUpload,
		} as UpdateDetail)
	}
</script>

<Form onsubmit={endEdit} {saving}>
	<BasicInfoFieldset bind:nickname bind:nature bind:tera={tera} bind:level bind:ac bind:maxHp bind:maxHitDice bind:isShiny originalAvatarSrc={originalAvatar?.href} bind:avatar={avatarToUpload} bind:isValid {disabled} />
	<GenderFieldset bind:value={gender} {disabled} />
	<AttributesFieldset bind:values={attributes} {disabled} />
	<AbilitiesFieldset bind:ability {species} {disabled} />
	<BondFieldset bind:value={bond} {disabled} />
	<ProficienciesFieldset bind:values={proficiencies} {disabled} />
	<SavingThrowsFieldset bind:values={savingThrows} {disabled} />
	<MovesFieldset bind:values={moves} {species} level={new Level(level)} {disabled} />
	<FeatsFieldset feats={$DndAndPokemonFeats} bind:values={feats} {disabled} />
	<HeldItemsFieldset bind:items {disabled} />
	<Fieldset title="{m.general()}">
		<MarkdownField label="{m.notes()}" bind:value={notes} placeholder="{m.generalNotesPlaceholder()}" {disabled} />
	</Fieldset>
	<FormDetails title="Advanced">
		<TypeField bind:value={type.data} {disabled} />
		<CustomBasicInfoFieldset bind:customSize bind:customHitDiceSize {disabled} />
		<SpeedsFieldset bind:values={speeds} {disabled} />
		<SensesFieldset bind:values={senses} {disabled} />
	</FormDetails>
	<ActionArea error={!isValid ? m.oneOrMoreFieldsAboveHaveAnIssue() : undefined}>
		<Button on:click={cancel} variant="ghost" {disabled}>{m.cancel()}</Button>
		<Button type="submit" disabled={disabled || !isValid}>{m.finish()}</Button>
	</ActionArea>
</Form>
