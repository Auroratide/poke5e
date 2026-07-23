<script lang="ts">
	import type { CuratedEncounter } from "./CuratedEncounter"
	import MiniPokemonStatBlock from "./MiniPokemonStatBlock.svelte"

	let {
		value,
	}: {
		value: CuratedEncounter,
	} = $props()
</script>

{#each value.trainers as trainer}
	<div class="trainer">
		<p class="trainer-name"><strong>{trainer.info.name}</strong></p>
		<div class="pokemon">
			{#each trainer.pokemon as pokemon}
				<MiniPokemonStatBlock species={pokemon.species} info={pokemon.info} />
			{/each}
		</div>
	</div>
{/each}

<style>
	.trainer {
		margin-block: 2em;
	}

	.trainer-name {
		margin-block: 0 0.5em;
	}

	.pokemon {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>