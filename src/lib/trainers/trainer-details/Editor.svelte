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
	} from "$lib/ui/forms"
	import BasicInfoFieldset from "./forms/BasicInfoFieldset.svelte"
	import BiographyFieldset from "./forms/BiographyFieldset.svelte"
	import { AttributesFieldset, SavingThrowsFieldset } from "$lib/dnd/attributes"
	import { ProficienciesFieldset } from "$lib/dnd/skills"
	import InventoryFieldset from "./forms/InventoryFieldset.svelte"
	import { Button } from "$lib/ui/elements"
	import { SpecializationsFieldset } from "../specializations"
	import { TrainerPathsFieldset } from "../paths"
	import { FeatsFieldset } from "$lib/dnd/feats"
	import { DndFeats } from "$lib/dnd/feats"
	import { Level } from "$lib/dnd/level"
	import { m } from "$lib/site/i18n"
	import { Resource } from "$lib/poke5e/resource"
	
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
				hp: Resource.adjustMax(trainer.hp, maxHp),
				hitDice: Resource.adjustMax(trainer.hitDice, maxHitDice),
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
	<Fieldset title="{m.general()}">
		<MarkdownField label="{m.description()}" bind:value={description} placeholder="{m["trainers.generalInfoAboutThisTrainer"]()}..." {disabled} />
	</Fieldset>
	<ActionArea error={!isValid ? "One or more fields above have an issue." : undefined}>
		<Button on:click={cancel} variant="ghost" {disabled}>{m.cancel()}</Button>
		<Button type="submit" disabled={disabled || !isValid}>{m.finish()}</Button>
	</ActionArea>
</Form>
