<script lang="ts">
	import type { TrainerPokemon } from "$lib/trainers/types"
	import { SpeciesSprite } from "$lib/creatures/media"
	import { SpeciesStore } from "$lib/creatures/species"

	export let pokemon: TrainerPokemon[]
	export let darken: boolean = false

	$: allMedia = pokemon.map((fromTrainer) =>
		$SpeciesStore?.find((species) =>
			species.data.id === fromTrainer.pokemonId,
		),
	).filter((it) => it != null).map((it) => it.media)
</script>

<figure aria-hidden="true" class:darken>
	{#each allMedia as media}
		<SpeciesSprite {media} alt="" />
	{/each}
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