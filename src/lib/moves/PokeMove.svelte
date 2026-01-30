<script lang="ts">
	import { Card } from "$lib/ui/page"
	import { FlatDl, Tag } from "$lib/ui/elements"
	import MoveDescription from "./MoveDescription.svelte"
	import { VisuallyHidden } from "$lib/ui/elements"
	import SimplePokemonList from "$lib/pokemon/SimplePokemonList.svelte"
	import { TypeTag } from "$lib/pokemon/types"
	import { PokemonSpecies } from "$lib/poke5e/species"
	import type { Move } from "./Move"
	import { Url } from "$lib/site/url"

	export let move: Move
	export let pokemon: PokemonSpecies[] = []
	export let tm: boolean = false

	$: pokemonWhoLearnThisMove = tm
		? move.pokemonWhoLearnThisViaTm(pokemon)
		: move.pokemonWhoLearnThis(pokemon)
</script>

<Card title={tm ? move.tmName() : move.name}>
	<TypeTag slot="header-extra" type={[move.type]}></TypeTag>
	<section class="info">
		{#if move.beta}
			<p class="beta"><Tag>New!</Tag><span>This move is being playtested. If you have <a href="{Url.feedback()}">feedback</a>, let us know!</span></p>
		{/if}
		<VisuallyHidden><h2>Info</h2></VisuallyHidden>
		<FlatDl>
			<dt>Move Power</dt>
			<dd class="power">{move.power.toString()}</dd>
			<dt>Move Time</dt>
			<dd>{move.time}</dd>
			<dt><abbr title="Power Points">PP</abbr></dt>
			<dd>{move.pp}</dd>
			<dt>Duration</dt>
			<dd class="duration">{move.duration}</dd>
			<dt>Range</dt>
			<dd class="range">{move.range}</dd>
		</FlatDl>
	</section>
	<section class="description">
		<MoveDescription {move} />
	</section>
	{#if pokemonWhoLearnThisMove.length > 0}
		<section>
			<h2>Can learn this move:</h2>
			<SimplePokemonList pokemon={pokemonWhoLearnThisMove.map((it) => ({
				id: it.id,
				name: it.name,
			}))} />
		</section>
	{/if}
	<slot name="extra"></slot>
	{#if move.contest}
		<section class="contest" style:--contest-color="var(--skin-contest-{move.contest.contest})">
			<VisuallyHidden><h2>Context</h2></VisuallyHidden>
			<FlatDl>
				<dt>Contest</dt>
				<dd class="contest-type">{move.contest.contest}</dd>
				<dt>Appeal</dt>
				<dd>{move.contest.appeal}</dd>
				<dt>Jam</dt>
				<dd>{move.contest.jam}</dd>
				<dt>Effect</dt>
				<dd>{move.contest.effect}</dd>
			</FlatDl>
		</section>
	{/if}
</Card>

<style>
	.power {
		text-transform: uppercase;
	}

	.duration, .range, .contest-type {
		text-transform: capitalize;
	}

	.contest {
		background-color: var(--contest-color);
		padding-block-start: 1em;
		padding-block-end: 0.5em;
	}

	.beta {
		font-size: var(--font-sz-venus);
	} .beta span {
		padding-inline-start: 0.25em;
	}
</style>
