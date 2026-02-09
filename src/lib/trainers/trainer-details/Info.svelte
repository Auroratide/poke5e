<script lang="ts">
	import type { InventoryItem, Trainer, TrainerInfo } from "../types"
	import { createEventDispatcher } from "svelte"
	import { FlatDl } from "$lib/ui/elements"
	import { Paragraphs } from "$lib/ui/rendering"
	import HealthInfo, { type UpdateDetail as HealthUpdateDetail } from "../info/HealthInfo.svelte"
	import StatsInfo from "./StatsInfo.svelte"
	import { AttributeBlock } from "$lib/dnd/attributes"
	import SkillsInfo from "../info/SkillsInfo.svelte"
	import { Art } from "$lib/ui/elements"
	import { SideArtCardSection } from "$lib/ui/page"
	import InventoryInfo, { type UpdateDetail as InventoryUpdateDetail } from "./InventoryInfo.svelte"
	import SpecializationsInfo from "../specializations/SpecializationsInfo.svelte"
	import { TrainerPathsInfo, type PathResourceUpdateDetail } from "../paths"
	import { hasSpecialization } from "../specializations"
	import { trainerHitDiceSize } from "../hit-dice"
	import { FeatsInfo } from "$lib/dnd/feats"
	import { AllFeats } from "$lib/poke5e/feats"
	import { m } from "$lib/site/i18n";

	const dispatch = createEventDispatcher()

	export let trainer: Trainer
	export let editable: boolean

	$: hasImage = trainer.avatar != null

	const onUpdateHealth = (e: CustomEvent<HealthUpdateDetail>) => {
		dispatch("update", {
			...trainer,
			hp: {
				current: e.detail.currentHp,
				max: trainer.hp.max,
			},
			hitDice: {
				current: e.detail.currentHitDice,
				max: trainer.hitDice.max,
			},
		} as TrainerInfo)
	}

	const onUpdateMoney = (e: CustomEvent<InventoryUpdateDetail>) => {
		dispatch("update", {
			...trainer,
			money: e.detail.money,
		} as TrainerInfo)
	}

	const onUpdatePathResource = (e: CustomEvent<PathResourceUpdateDetail>) => {
		dispatch("update", {
			...trainer,
			path: {
				...trainer.path,
				resource: e.detail.resource,
			},
		} as TrainerInfo)
	}

	const onUpdateItem = (e: CustomEvent<InventoryItem>) => {
		dispatch("update-item", e.detail)
	}
</script>

<SideArtCardSection {hasImage}>
	<FlatDl columns={2}>
		<dt>{m["trainers.trainerId"]()}</dt>
		<dd>{trainer.readKey}</dd>
	</FlatDl>
	<div class="column">
		<HealthInfo hp={trainer.hp} hitDice={trainer.hitDice} dieSize={$trainerHitDiceSize} {editable} on:update={onUpdateHealth} status={null} level={trainer.level} exp={0} />
		<StatsInfo {trainer} />
	</div>
	<Art slot="art" src="{trainer.avatar.href}" alt="Trainer Avatar" />
</SideArtCardSection>
<section class="stats">
	<AttributeBlock attributes={trainer.attributes} />
	<SkillsInfo level={trainer.level} attributes={trainer.attributes} savingThrows={trainer.savingThrows} proficiencies={trainer.proficiencies} />
	{#if hasSpecialization(trainer.specializations)}
		<h3>Specializations</h3>
		<SpecializationsInfo specializations={trainer.specializations} />
	{/if}
</section>
<TrainerPathsInfo value={trainer.path} level={trainer.level} on:update={onUpdatePathResource} {editable} />
{#if trainer.feats.length > 0}
	<section>
		<h2>Feats</h2>
		<FeatsInfo allFeats={$AllFeats} values={trainer.feats} />
	</section>
{/if}
<section>
	<InventoryInfo money={trainer.money} inventory={trainer.inventory} {editable} on:update={onUpdateMoney} on:update-item={onUpdateItem} />
</section>
{#if trainer.description}
	<section>
		<h2>About</h2>
		<Paragraphs value={trainer.description} />
	</section>
{/if}

<style>
	.column {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
</style>