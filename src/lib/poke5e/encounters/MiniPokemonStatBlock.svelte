<script lang="ts">
	import { AttributeBlock } from "$lib/dnd/attributes"
	import { DistancesDlItem } from "$lib/dnd/distance"
	import { LearnedMovesListInfo } from "$lib/moves/learned"
	import { KnownAbilitiesInfo } from "$lib/pokemon/ability"
	import { TypeEffectiveness, TypeTag } from "$lib/pokemon/types"
	import { m } from "$lib/site/i18n"
	import type { TrainerPokemon } from "$lib/trainers/types"
	import { FlatDl, Level } from "$lib/ui/elements"
	import { slide } from "svelte/transition"
	import type { PokemonSpecies } from "../species"

	let {
		info,
		species,
	}: {
		info: TrainerPokemon,
		species: PokemonSpecies
	} = $props()

	const uid = $props.id()
	const detailsId = $derived(`${uid}-details`)

	let showDetails = $state(false)

	const toggleDetails = () => {
		showDetails = !showDetails

		if (showDetails) {
			setTimeout(() => document.querySelector<HTMLElement>(`#${detailsId}`)?.focus(), 50)
		}
	}
</script>

<article class="mini-pokemon-stat-block">
	<div class="content">
		<header>
			<div class="title-row">
				<p class="name-and-level">
					<span class="name">{info.nickname ? info.nickname : species.name}</span>
					<span class="level"><Level value={info.level.data} />, <span class="cap">{species.size}</span> Pokémon</span>
				</p>
				<p class="type"><TypeTag type={info.type.data} /></p>
			</div>
		</header>
	</div>
	{#if showDetails}
		<div id="{detailsId}" tabindex="-1"></div>
		<div class="content" transition:slide={{ duration: 500 }}>
			<FlatDl>
				<dt>{m.ac()}</dt>
				<dd>{info.ac}</dd>
				<dt>{m.hp()}</dt>
				<dd>{info.hp.max}</dd>
				<DistancesDlItem label={m.speed()} values={info.speeds} />
				<DistancesDlItem label={m.senses()} values={info.senses} />
			</FlatDl>
			<AttributeBlock attributes={info.attributes} />
			<FlatDl>
				<dt>{m.proficiencies()}</dt>
				<dd class="cap">{info.proficiencies.toString()}</dd>
				<dt>{m.savingThrows()}</dt>
				<dd class="upper">{info.savingThrows.length > 0 ? info.savingThrows.join(", ") : "none"}</dd>
				<TypeEffectiveness type={info.type} />
			</FlatDl>
			<p class="subsection"><span>{m.abilities()}</span></p>
			<KnownAbilitiesInfo value={info.abilities} />
			<p class="subsection"><span>{m.moves()}</span></p>
			<LearnedMovesListInfo pokemon={info} />
		</div>
	{/if}
	<button aria-expanded="{showDetails}" class="details-button" onclick={toggleDetails}>{#if showDetails}- Hide{:else}+ Show{/if} Details</button>
</article>

<style>
	.mini-pokemon-stat-block {
		overflow: hidden;
	}

	.content {
		padding: 0.5em;
		background: var(--skin-input-bg);
	}

	.mini-pokemon-stat-block::before,
	.mini-pokemon-stat-block::after {
		content: "";
		display: block;
		block-size: 0.5em;
		background-color: var(--skin-bg);
	}

	.mini-pokemon-stat-block::before {
		clip-path: polygon(0.5em 0, calc(100% - 0.5em) 0, 100% 100%, 0 100%);
	}

	.mini-pokemon-stat-block::after {
		clip-path: polygon(0 0, 100% 0, calc(100% - 0.5em) 100%, 0.5em 100%);
	}

	header {
		margin-block-end: 0.25em;
	}

	.title-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.name-and-level {
		display: flex;
		flex-direction: column;
		margin: 0;
		line-height: 1;
	}

	.name {
		font-size: var(--font-sz-neptune);
		font-weight: bold;
		margin: 0 0 0.125em 0;
	}

	.type {
		font-size: var(--font-sz-venus);
		margin: 0;
	}

	.level {
		font-size: var(--font-sz-venus);
		margin: 0;
	}

	.details-button {
		display: block;
		inline-size: 100%;
		background-color: var(--skin-bg);
		color: var(--skin-bg-text);
		border: none;
		padding: 0.375em 0.5em;
		text-align: start;
		cursor: pointer;
		font-weight: bold;
	}

	.subsection {
		font-weight: bold;
		margin-block: 1em 0.75em;
		background: var(--skin-bg);
		color: var(--skin-bg-text);
		display: inline-block;
		margin-inline-start: -1.5em;
		padding-inline: 1.5em 1.5em;
		transform: skewX(var(--skew-angle));
	}

	.subsection span {
		display: inline-block;
		transform: skewX(var(--skew-undo));
	}
</style>