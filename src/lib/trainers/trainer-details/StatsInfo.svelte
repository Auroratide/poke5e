<script lang="ts">
	import type { TrainerInfo } from "../types"
	import FlatDl from "$lib/design/FlatDl.svelte"
	import { proficiencyBonus } from "$lib/dnd/proficiency"

	export let trainer: TrainerInfo

	$: pb = proficiencyBonus(trainer.level)
</script>

<div class="two-columns">
	<div>
		<FlatDl columns={1}>
			<dt><abbr title="Armor Class">AC</abbr></dt>
			<dd>{trainer.ac}</dd>
			<dt>Bonus</dt>
			<dd>+{pb}</dd>
		</FlatDl>
	</div>
	<div>
		<FlatDl columns={1}>
			{#if trainer.biography.species}
				<dt>Species</dt>
				<dd>{trainer.biography.species}</dd>
			{/if}
			{#if trainer.biography.gender}
				<dt>Gender</dt>
				<dd>{trainer.biography.gender}</dd>
				<dt></dt><dd></dd>
			{/if}
			{#if trainer.biography.age}
				<dt>Age</dt>
				<dd>{trainer.biography.age}</dd>
				<dt></dt><dd></dd>
			{/if}
			{#if trainer.biography.homeRegion}
				<dt>Home Region</dt>
				<dd>{trainer.biography.homeRegion}</dd>
				<dt></dt><dd></dd>
			{/if}
			{#if trainer.biography.background}
				<dt>Background</dt>
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
		flex: 1;
	} .two-columns > :last-child {
		flex: 2;
	}
</style>