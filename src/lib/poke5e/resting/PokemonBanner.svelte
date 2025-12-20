<script lang="ts">
	import type { TrainerPokemon } from "$lib/trainers/types"
	import { SpeciesSprite } from "$lib/poke5e/species/media"
	import { WithSpecies } from "$lib/poke5e/species"

	export let pokemon: TrainerPokemon[]
	export let darken: boolean = false

	$: ids = pokemon.map((it) => it.pokemonId)
</script>

<figure aria-hidden="true" class:darken>
	<WithSpecies let:species {ids}>
		<div class="img-container">
			<SpeciesSprite media={species.media} alt="" />
		</div>
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
		margin: 0;
	}

	figure .img-container {
		inline-size: 72px;
	}
</style>