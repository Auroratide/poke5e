<script lang="ts" context="module">
	export type UpdateDetail = {
		trainer: TrainerInfo,
		newAvatar?: File,
	}
</script>

<script lang="ts">
	import type { Trainer, TrainerInfo } from "../types"
	import { createEventDispatcher } from "svelte"
	import Button from "$lib/design/Button.svelte"
	import Fieldset from "$lib/design/Form/Fieldset.svelte"
	import ActionArea from "$lib/design/Form/ActionArea.svelte"
	import Saveable from "$lib/design/Saveable.svelte"
	import NameInput from "../form/NameInput.svelte"
	import LevelInput from "../form/LevelInput.svelte"
	import AcInput from "../form/AcInput.svelte"
	import NumberInput from "../form/NumberInput.svelte"
	import GeneralTextarea from "../form/GeneralTextarea.svelte"
	import AttributesFieldset from "../form/AttributesFieldset.svelte"
	import ProficienciesFieldset from "../form/ProficienciesFieldset.svelte"
	import SavingThrowsFieldset from "../form/SavingThrowsFieldset.svelte"
	import BiographyFieldset from "../form/BiographyFieldset.svelte"
	
	const dispatch = createEventDispatcher()

	export let trainer: Trainer
	export let saving: boolean = false
	$: disabled = saving

	let name = trainer.name
	let level = trainer.level
	let ac = trainer.ac
	let maxHp = trainer.hp.max
	let maxHitDice = trainer.hitDice.max
	let attributes = { ...trainer.attributes }
	let proficiencies = [...trainer.proficiencies]
	let savingThrows = [...trainer.savingThrows]
	let description = trainer.description
	let biography = trainer.biography
	let originalAvatar = trainer.avatar
	let avatarToUpload: File | undefined = undefined

	const cancel = () => {
		dispatch("cancel")
	}
	const endEdit = () => {
		dispatch("update", {
			trainer: {
				name,
				description,
				level,
				ac,
				hp: {
					current: trainer.hp.current + (maxHp - trainer.hp.max),
					max: maxHp,
				},
				hitDice: {
					current: trainer.hitDice.current + (maxHitDice - trainer.hitDice.max),
					max: maxHitDice,
				},
				attributes,
				proficiencies,
				savingThrows,
				biography,
				avatar: originalAvatar,
			},
			newAvatar: avatarToUpload,
		})
	}
</script>

<Saveable {saving}>
	<form on:submit|preventDefault={endEdit}>
		<Fieldset title="Basic Info">
			<NameInput label="Name" bind:value={name} {disabled} />
			<LevelInput bind:value={level} bind:maxHitDice={maxHitDice} {disabled} />
			<AcInput bind:value={ac} {disabled} />
			<NumberInput name="max-hp" label="Max HP" bind:value={maxHp} {disabled} />
			<NumberInput name="max-hit-dice" label="Max Hit Dice" bind:value={maxHitDice} {disabled} />
		</Fieldset>
		<BiographyFieldset originalAvatarSrc={originalAvatar?.href} bind:biography={biography} bind:avatar={avatarToUpload} {disabled} />
		<AttributesFieldset bind:values={attributes} {disabled} />
		<ProficienciesFieldset bind:values={proficiencies} {disabled} />
		<SavingThrowsFieldset bind:values={savingThrows} {disabled} />
		<Fieldset title="General">
			<GeneralTextarea name="description" label="Description" bind:value={description} {disabled} placeholder="General info about this trainer..." />
		</Fieldset>
		<ActionArea>
			<Button on:click={cancel} variant="ghost" {disabled}>Cancel</Button>
			<Button type="submit" {disabled}>Finish!</Button>
		</ActionArea>
	</form>
</Saveable>
