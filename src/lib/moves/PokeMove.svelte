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
	import { ContestInfo } from "./contest"

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
	{#if move.contest}
		<ContestInfo value={move.contest} />
	{/if}
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
</Card>

<style>
	.power {
		text-transform: uppercase;
	}

	.duration, .range {
		text-transform: capitalize;
	}

	.beta {
		font-size: var(--font-sz-venus);
	} .beta span {
		padding-inline-start: 0.25em;
	}
</style>
