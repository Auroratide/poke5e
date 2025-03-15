<script lang="ts">
	import type { Trainer, TrainerInfo } from "../types"
	import { createEventDispatcher } from "svelte"
	import FlatDl from "$lib/design/FlatDl.svelte"
	import Paragraphs from "$lib/design/Paragraphs.svelte"
	import HealthInfo, { type UpdateDetail as HealthUpdateDetail } from "../info/HealthInfo.svelte"
	import StatsInfo from "./StatsInfo.svelte"
	import AttributeBlock from "$lib/dnd/AttributeBlock.svelte"
	import SkillsInfo from "../info/SkillsInfo.svelte"
	import Art from "$lib/design/Art.svelte"
	import SideArtCardSection from "$lib/design/SideArtCardSection.svelte"

	const dispatch = createEventDispatcher()

	export let trainer: Trainer
	export let editable: boolean

	$: hasImage = trainer.avatar != null

	const onUpdateHealth = (e: CustomEvent<HealthUpdateDetail>) => {
		dispatch("update-health", {
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
</script>

<SideArtCardSection {hasImage}>
	<FlatDl columns={2}>
		<dt>Trainer Id</dt>
		<dd>{trainer.readKey}</dd>
	</FlatDl>
	<div class="column">
		<HealthInfo hp={trainer.hp} hitDice={trainer.hitDice} dieSize="d8" {editable} on:update={onUpdateHealth} status={null} />
		<StatsInfo {trainer} />
	</div>
	<Art slot="art" src="{trainer.avatar.href}" alt="Trainer Avatar" />
</SideArtCardSection>
<section class="stats">
	<AttributeBlock attributes={trainer.attributes} />
	<SkillsInfo level={trainer.level} attributes={trainer.attributes} savingThrows={trainer.savingThrows} proficiencies={trainer.proficiencies} />
</section>
<hr />
<section>
	<Paragraphs value={trainer.description} />
</section>

<style>
	.column {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
</style>