<script lang="ts" context="module">
	export type UpdateDetail = {
		trainer: TrainerInfo,
		updateAvatar?: ImageInputValue,
	}
</script>

<script lang="ts">
	import type { Trainer, TrainerInfo } from "../types"
	import { createEventDispatcher } from "svelte"
	import {
		Form,
		Fieldset,
		MarkdownField,
		ActionArea,
		type ImageInputValue,
	} from "$lib/design/forms"
	import BasicInfoFieldset from "./forms/BasicInfoFieldset.svelte"
	import BiographyFieldset from "./forms/BiographyFieldset.svelte"
	import { AttributesFieldset, SavingThrowsFieldset } from "$lib/dnd/attributes"
	import { ProficienciesFieldset } from "$lib/dnd/skills"
	import InventoryFieldset from "./forms/InventoryFieldset.svelte"
	import Button from "$lib/design/Button.svelte"
	import { SpecializationsFieldset } from "../specializations"
	import { TrainerPathsFieldset } from "../paths"
	import FeatsFieldset from "$lib/feats/FeatsFieldset.svelte"
	import { DndFeats } from "$lib/feats"
	import { Level } from "$lib/dnd/level"
	
	const dispatch = createEventDispatcher()

	export let trainer: Trainer
	export let saving: boolean = false
	$: disabled = saving

	let name = trainer.name
	let level = trainer.level.data
	let ac = trainer.ac
	let maxHp = trainer.hp.max
	let maxHitDice = trainer.hitDice.max
	let attributes = trainer.attributes.copy()
	let proficiencies = trainer.proficiencies.copy()
	let savingThrows = [...trainer.savingThrows]
	let description = trainer.description
	let biography = trainer.biography
	let originalAvatar = trainer.avatar
	let money = trainer.money
	let specializations = structuredClone(trainer.specializations)
	let trainerPath = structuredClone(trainer.path)
	let feats = trainer.feats.map((it) => structuredClone(it))
	let avatarToUpload: ImageInputValue | undefined = undefined
	let isValid = true

	let inventory = structuredClone(trainer.inventory)

	const cancel = () => {
		dispatch("cancel")
	}
	const endEdit = () => {
		dispatch("update", {
			trainer: {
				name,
				description,
				level: new Level(level),
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
				money,
				inventory,
				avatar: originalAvatar,
				specializations,
				path: trainerPath,
				feats,
			},
			updateAvatar: avatarToUpload,
		})
	}
</script>

<Form onsubmit={endEdit} {saving}>
	<BasicInfoFieldset bind:name bind:level bind:ac bind:maxHp bind:maxHitDice {disabled} />
	<BiographyFieldset bind:biography bind:avatar={avatarToUpload} bind:isValid originalAvatarSrc={originalAvatar?.href} {disabled} />
	<AttributesFieldset bind:values={attributes} {disabled} />
	<ProficienciesFieldset bind:values={proficiencies} {disabled} />
	<SavingThrowsFieldset bind:values={savingThrows} {disabled} />
	<SpecializationsFieldset bind:values={specializations} {disabled} />
	<TrainerPathsFieldset bind:value={trainerPath} {disabled} />
	<FeatsFieldset feats={DndFeats} bind:values={feats} {disabled} />
	<InventoryFieldset bind:money bind:inventory {disabled} />
	<Fieldset title="General">
		<MarkdownField label="Description" bind:value={description} placeholder="General info about this trainer..." {disabled} />
	</Fieldset>
	<ActionArea error={!isValid ? "One or more fields above have an issue." : undefined}>
		<Button on:click={cancel} variant="ghost" {disabled}>Cancel</Button>
		<Button type="submit" disabled={disabled || !isValid}>Finish!</Button>
	</ActionArea>
</Form>
