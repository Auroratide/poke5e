<script lang="ts">
	import type { Trainer } from "../types"
	import FlatDl from "$lib/design/FlatDl.svelte"
	import Paragraphs from "$lib/design/Paragraphs.svelte"
	import HealthInfo from "../info/HealthInfo.svelte"
	import StatsInfo from "./StatsInfo.svelte"
	import AttributeBlock from "$lib/dnd/AttributeBlock.svelte"
	import SkillsInfo from "../info/SkillsInfo.svelte"

	export let trainer: Trainer
</script>

<section class="info">
	<FlatDl columns={2}>
		<dt>Trainer Id</dt>
		<dd>{trainer.readKey}</dd>
	</FlatDl>
	<div class="column">
		<HealthInfo hp={trainer.hp} hitDice={trainer.hitDice} dieSize="d8" editable={false} />
		<StatsInfo {trainer} />
	</div>
</section>
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