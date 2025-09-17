<script lang="ts">
	import type { TrainerPokemon } from "$lib/trainers/types"
	import { SpeciesSprite } from "$lib/creatures/media"
	import { WithSpecies } from "$lib/creatures/species"

	export let pokemon: TrainerPokemon[]
	export let darken: boolean = false

	$: ids = pokemon.map((it) => it.pokemonId)
</script>

<figure aria-hidden="true" class:darken>
	<WithSpecies let:species {ids}>
		<SpeciesSprite media={species.media} alt="" />
	</WithSpecies>
</figure>

<style>
	figure {
		block-size: 72px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	figure.darken {
		filter: grayscale(1);
		opacity: 0.75;
	}

	figure :global(img) {
		inline-size: 72px;
		margin: 0;
	}
</style>