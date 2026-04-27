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
	import { m } from "$lib/site/i18n"
	import { formatMoney } from "$lib/pokemon/money"

	export let move: Move
	export let pokemon: PokemonSpecies[] = []
	export let tm: boolean = false
	export let dismissToHref: string

	$: pokemonWhoLearnThisMove = move.pokemonWhoLearnThis(pokemon)
</script>

<Card title={tm ? move.tmName() : move.name} {dismissToHref}>
	<TypeTag slot="header-extra" type={[move.type]}></TypeTag>
	<section class="info">
		{#if move.beta}
			<p class="beta"><Tag>New!</Tag><span>This move is being playtested. If you have <a href="{Url.feedback()}">feedback</a>, let us know!</span></p>
		{/if}
		<VisuallyHidden><h2>Info</h2></VisuallyHidden>
		<FlatDl>
			<dt>{m.movePower()}</dt>
			<dd class="power">{move.power.toString()}</dd>
			<dt>{m.moveTime()}</dt>
			<dd>{move.time}</dd>
			<dt><abbr title="{m.powerPoints()}">{m.pp()}</abbr></dt>
			<dd>{move.pp}</dd>
			<dt>{m.duration()}</dt>
			<dd class="duration">{move.duration}</dd>
			<dt>{m.range()}</dt>
			<dd class="range">{move.range}</dd>
			{#if tm}
				<dt>{m.cost()}</dt>
				<dd>{formatMoney(move.tm?.cost ?? 0)}</dd>
			{/if}
		</FlatDl>
	</section>
	<section class="description">
		<MoveDescription {move} />
	</section>
	{#if move.contest}
		<section class="contest">
			<h2>{m["movesSection.contest"]()}</h2>
			<ContestInfo value={move.contest} />
		</section>
	{/if}
	{#if !tm && pokemonWhoLearnThisMove.level.length > 0}
		<section>
			<h2>{m.learnsByLevelUp()}:</h2>
			<SimplePokemonList pokemon={pokemonWhoLearnThisMove.level.map((it) => ({
				id: it.id,
				name: it.name,
			}))} />
		</section>
	{/if}
	{#if pokemonWhoLearnThisMove.tm.length > 0}
		<section>
			<h2>{m.learnsByTM()}:</h2>
			<SimplePokemonList pokemon={pokemonWhoLearnThisMove.tm.map((it) => ({
				id: it.id,
				name: it.name,
			}))} />
		</section>
	{/if}
	{#if !tm && pokemonWhoLearnThisMove.egg.length > 0}
		<section>
			<h2>{m.learnsByEggMove()}:</h2>
			<SimplePokemonList pokemon={pokemonWhoLearnThisMove.egg.map((it) => ({
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
