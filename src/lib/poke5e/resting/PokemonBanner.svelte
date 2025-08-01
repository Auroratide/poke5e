<script lang="ts">
	import type { TrainerPokemon } from "$lib/trainers/types"
	import { pokemon as allPokemon } from "$lib/creatures/store"
	import PokemonSprite from "$lib/creatures/PokemonSprite.svelte"

	export let pokemon: TrainerPokemon[]
	export let darken: boolean = false

	$: allMedia = pokemon.map((fromTrainer) =>
		$allPokemon.find((species) =>
			species.id === fromTrainer.pokemonId,
		),
	).filter((it) => it != null).map((it) => it.media)
</script>

<figure aria-hidden="true" class:darken>
	{#each allMedia as media}
		<PokemonSprite {media} alt="" />
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