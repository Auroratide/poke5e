<script lang="ts">
	import type { ReadWriteKey, TrainerPokemon } from "../types"
	import { ResourceBar } from "$lib/ui/elements"
	import { Url } from "$lib/site/url"
	import { items } from "$lib/items/store"
	import { getItemDetails } from "$lib/pokemon/held-items"
	import StatusTag from "$lib/pokemon/StatusTag.svelte"
	import ItemSprite from "$lib/items/ItemSprite.svelte"
	import { GenderIcon } from "$lib/pokemon/gender"
	import { SpeciesSprite } from "$lib/poke5e/species/media"
	import { WithSpecies } from "$lib/poke5e/species"

	export let trainer: ReadWriteKey
	export let pokemon: TrainerPokemon

	$: heldItem = pokemon.items.length > 0 ? getItemDetails(pokemon.items[0], $items) : undefined
</script>

<a href="{Url.trainers(trainer, pokemon.id)}" class="selectable-bubble gridded">
	<span style:grid-area="sprite" class="max-height holding-item jumping-animation">
		<WithSpecies let:species ids={[pokemon.pokemonId]}>
			<div slot="loader"></div>
			<SpeciesSprite media={species?.media} alt={species?.data.name} shiny={pokemon.isShiny} />
			{#if species?.media.sprite().value != null}
				<span class="shadow"></span>
			{/if}
		</WithSpecies>
		{#if heldItem != null}
			<span class="held-item">
				<ItemSprite src="{heldItem.media.sprite}" alt="Holding {heldItem.name}" />
			</span>
		{/if}
	</span>
	<span style:grid-area="name">{pokemon.nickname}</span>
	<span style:grid-area="gender" class="right away-from-edge flex"><GenderIcon gender={pokemon.gender} /></span>
	<span style:grid-area="hpbar" class="away-from-edge"><ResourceBar current={pokemon.hp.current} max={pokemon.hp.max} /></span>
	<span style:grid-area="hp">{pokemon.hp.current}/{pokemon.hp.max}</span>
	<span style:grid-area="status" class="smaller-text">{#if pokemon.status != null}<StatusTag abbr value={pokemon.status} />{/if}</span>
	<span style:grid-area="lv" class="right">Lv. {pokemon.level.data}</span>
</a>

<style>
	.gridded {
		display: grid;
		grid-template-columns: 3em 1fr auto auto;
		grid-template-areas:
			"sprite name name gender"
			"sprite hpbar hpbar hpbar"
			"sprite hp status lv";
		gap: 0.125em;
	}

	.right {
		place-self: center end;
	}

	.away-from-edge {
		padding-right: 1.5em;
	}

	.flex {
		display: flex;
		align-items: center;
	}

	.max-height {
		max-height: 3em;
	}

	.selectable-bubble {
		background-color: var(--skin-content);
		padding: 0.375em 1.5em 0.375em 0.5em;
		border-radius: 3em;
		text-decoration: none;
		color: var(--skin-content-text);
		box-shadow: var(--elev-cumulus);
	}

	.selectable-bubble:hover,
	.selectable-bubble:focus {
		background-color: var(--skin-bg);
		color: var(--skin-bg-text);
	}

	.smaller-text { font-size: var(--font-sz-venus); }

	.holding-item {
		position: relative;
	}

	.held-item {
		display: inline-block;
		position: absolute;
		inset: auto 0 0 auto;
		inline-size: 1.375em;
		block-size: 1.375em;
		z-index: 3;
	}

	.shadow {
		display: block;
		position: absolute;
		inset: auto 0.5em 0.25em 0.5em;
		block-size: 1em;
		background: oklch(0% 0 0 / 0.2);
		border-radius: 100%;
		z-index: 1;
	}

	.jumping-animation > :global(img) {
		position: relative;
		z-index: 2;
	}

	a:hover .jumping-animation > :global(img),
	a:focus .jumping-animation > :global(img) {
		animation: jump 0.75s infinite;
	}

	@keyframes jump {
		0% { inset-block-start: 0; }
		15% { inset-block-start: -0.5em; }
		30% { inset-block-start: 0; }
		100% { inset-block-start: 0; }
	}

	@media (prefers-reduced-motion) {
		.jumping-animation > :global(img) {
			animation: none !important;
		}
	}

	/* Literally cannot work with the scrollbar */
	/* .selectable-bubble:hover::before,
	.selectable-bubble:focus::before {
		content: '>';
		color: var(--skin-bg-dark);
		font-weight: 900;
		position: absolute;
		left: -0.325em;
		font-size: 4em;
		-webkit-text-stroke: 0.03em var(--skin-bg-text);
		transform: translateY(-0.225em);
	} */
</style>