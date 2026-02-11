<script lang="ts">
	import type { TrainerInfo } from "../types"
	import { FlatDl } from "$lib/ui/elements"
	import { m } from "$lib/site/i18n"

	export let trainer: TrainerInfo

	$: pb = trainer.level.proficiencyBonus
</script>

<div class="two-columns">
	<div>
		<FlatDl columns={1}>
			<dt><abbr title="{m["universal.armorClass"]()}">{m["universal.ac"]()}</abbr></dt>
			<dd>{trainer.ac}</dd>
			<dt>{m["universal.bonus"]()}</dt>
			<dd>+{pb}</dd>
		</FlatDl>
	</div>
	<div>
		<FlatDl columns={1}>
			{#if trainer.biography.species}
				<dt>{m["universal.species"]()}</dt>
				<dd>{trainer.biography.species}</dd>
			{/if}
			{#if trainer.biography.gender}
				<dt>{m["universal.gender"]()}</dt>
				<dd>{trainer.biography.gender}</dd>
				<dt></dt><dd></dd>
			{/if}
			{#if trainer.biography.age}
				<dt>{m["universal.age"]()}</dt>
				<dd>{trainer.biography.age}</dd>
				<dt></dt><dd></dd>
			{/if}
			{#if trainer.biography.homeRegion}
				<dt>{m["universal.homeRegion"]()}</dt>
				<dd>{trainer.biography.homeRegion}</dd>
				<dt></dt><dd></dd>
			{/if}
			{#if trainer.biography.background}
				<dt>{m["universal.background"]()}</dt>
				<dd>{trainer.biography.background}</dd>
				<dt></dt><dd></dd>
			{/if}
		</FlatDl>
	</div>
</div>

<style>
	.two-columns {
		display: flex;
		flex-direction: row;
		gap: 1em;
	} .two-columns > :first-child {
		flex: 2;
	} .two-columns > :last-child {
		flex: 3;
	}
</style>