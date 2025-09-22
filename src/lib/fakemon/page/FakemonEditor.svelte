<script lang="ts" context="module">
	export type SubmitDetail = {
		fakemon: Fakemon,
		newMedia: SpeciesMedia<ImageInputValue>,
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { Fakemon } from "../Fakemon"
	import {
		ActionArea,
		Fieldset,
		Form,
		IntField,
		SelectField,
		TextareaField,
		TextField,
		type ImageInputValue,
	} from "$lib/design/forms"
	import { TypeField } from "$lib/pokemon/types-2"
	import { SpeedsFieldset } from "$lib/dnd/movement"
	import { SensesFieldset } from "$lib/dnd/senses"
	import { CreatureSizes } from "$lib/dnd/CreatureSize"
	import { capitalize } from "$lib/string"
	import { HitDice } from "$lib/dnd/hit-dice"
	import { AttributesFieldset, SavingThrowsFieldset } from "$lib/dnd/attributes"
	import { ProficienciesFieldset } from "$lib/dnd/skills"
	import Button from "$lib/design/Button.svelte"
	import { GenderRatioFieldset } from "$lib/creatures/gender"
	import { SrField } from "$lib/creatures/sr"
	import { MovePoolFieldset } from "$lib/creatures/move-pool"
	import { AbilityPoolFieldset } from "$lib/pokemon/ability"
	import { SpeciesMedia, SpeciesMediaFieldset } from "$lib/creatures/media"

	const dispatch = createEventDispatcher()

	export let fakemon: Fakemon
	export let saving = false
	$: disabled = saving

	let species = fakemon.species

	let speciesName = species.data.name
	let type = species.type.copy()
	let minLevel = species.data.minLevel
	let ac = species.data.ac
	let hp = species.data.hp
	let hitDice = species.hitDice.data
	let size = species.data.size
	let speeds = species.speed.copy()
	let senses = species.senses.copy()
	let attributes = species.attributes.copy()
	let proficiencies = species.skills.copy()
	let savingThrows = species.data.saves
	let gender = species.gender.copy()
	let sr = species.sr.copy()
	let description = species.data.description
	let originalMedia = species.media.copy()
	let updatedMedia = new SpeciesMedia<ImageInputValue>({
		values: {
			normalPortrait: undefined,
			normalSprite: undefined,
			shinyPortrait: undefined,
			shinySprite: undefined,
		},
	})
	let abilityPool = species.abilities.copy()
	let movePool = species.moves.copy()

	const cancel = () => {
		dispatch("cancel")
	}

	const endEdit = () => {
		dispatch("submit", {
			fakemon: fakemon.copy({
				species: fakemon.species.copy({
					name: speciesName,
					type: type.data,
					minLevel,
					ac,
					hp,
					hitDice,
					size,
					speed: speeds.data,
					senses: senses.data,
					attributes: attributes.data,
					skills: proficiencies.data,
					saves: savingThrows,
					gender: gender.data,
					sr: sr.data,
					description: description,
					abilities: abilityPool.data,
					moves: movePool.data,
					media: originalMedia.data,
				}).data,
			}),
			newMedia: updatedMedia,
		})
	}

	const sizeOptions = Object.values(CreatureSizes).map((it) => ({
		name: capitalize(it),
		value: it,
	}))

	const hitDiceOptions = HitDice.list.map((it) => ({
		name: it,
		value: it,
	}))
</script>

<Form onsubmit={endEdit} {saving}>
	<Fieldset title="Basic Info" columns={2}>
		<TextField label="Species Name" bind:value={speciesName} {disabled} required />
		<IntField label="Min Level" bind:value={minLevel} min={1} max={20} {disabled} />
		<IntField label="AC" bind:value={ac} min={0} max={99} {disabled} />
		<IntField label="HP" bind:value={hp} min={0} {disabled} />
		<SelectField label="Hit Dice" options={hitDiceOptions} bind:value={hitDice} {disabled} />
		<SelectField label="Size" options={sizeOptions} bind:value={size} {disabled} />
		<SrField bind:value={sr} {disabled} />
		<div style:grid-column="span 2">
			<TextareaField label="Description" bind:value={description} {disabled} placeholder="The ______ Pokémon. It is known for this one rather cool thing." />
		</div>
	</Fieldset>
	<SpeciesMediaFieldset originals={originalMedia} bind:updated={updatedMedia} {disabled} />
	<GenderRatioFieldset bind:value={gender} {disabled} />
	<TypeField bind:value={type.data} {disabled} />
	<SpeedsFieldset bind:values={speeds} {disabled} />
	<SensesFieldset bind:values={senses} {disabled} />
	<AttributesFieldset bind:values={attributes} {disabled} />
	<ProficienciesFieldset bind:values={proficiencies} {disabled} noexpertise />
	<SavingThrowsFieldset bind:values={savingThrows} {disabled} />
	<AbilityPoolFieldset bind:value={abilityPool} {disabled} />
	<MovePoolFieldset bind:value={movePool} {disabled} />
	<ActionArea>
		<Button on:click={cancel} variant="ghost" {disabled}>Cancel</Button>
		<Button type="submit" {disabled}>Finish!</Button>
	</ActionArea>
</Form>
