<script lang="ts">
	import type { TrainerInfo } from "../types"
	import { FlatDl } from "$lib/ui/elements"
	import { m } from "$lib/site/i18n"
	import { SpeciesRating } from "$lib/poke5e/sr"
	import { Pokeslots } from "$lib/poke5e/pokeslots"

	let {
		trainer,
	}: {
		trainer: TrainerInfo
	} = $props()

	let pb = $derived(trainer.level.proficiencyBonus)
	let maxSr = $derived(SpeciesRating.maxAllowed(trainer.level))
	let maxPokeslots = $derived(Pokeslots.maxAllowed(trainer.level))
</script>

<div class="two-columns">
	<div>
		<FlatDl columns={1}>
			<dt><abbr title="{m.armorClass()}">{m.ac()}</abbr></dt>
			<dd>{trainer.ac}</dd>
			<dt>{m.bonus()}</dt>
			<dd>+{pb}</dd>
			<dt>{m.maxSr()}</dt>
			<dd>{maxSr.toString()}</dd>
			<dt>{m.pokeslots()}</dt>
			<dd>{maxPokeslots}</dd>
		</FlatDl>
	</div>
	<div>
		<FlatDl columns={1}>
			{#if trainer.biography.species}
				<dt>{m.species()}</dt>
				<dd>{trainer.biography.species}</dd>
			{/if}
			{#if trainer.biography.gender}
				<dt>{m.gender()}</dt>
				<dd>{trainer.biography.gender}</dd>
				<dt></dt><dd></dd>
			{/if}
			{#if trainer.biography.age}
				<dt>{m.age()}</dt>
				<dd>{trainer.biography.age}</dd>
				<dt></dt><dd></dd>
			{/if}
			{#if trainer.biography.homeRegion}
				<dt>{m.homeRegion()}</dt>
				<dd>{trainer.biography.homeRegion}</dd>
				<dt></dt><dd></dd>
			{/if}
			{#if trainer.biography.background}
				<dt>{m.background()}</dt>
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