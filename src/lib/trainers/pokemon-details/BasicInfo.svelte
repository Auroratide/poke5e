<script lang="ts">
	import type { Pokemon } from "$lib/creatures/types"
	import type { TrainerPokemon } from "../types"
	import GenderIcon from "$lib/design/GenderIcon.svelte"
	import Level from "$lib/design/Level.svelte"

	export let pokemon: TrainerPokemon
	export let species: Pokemon
</script>

<div class="grid">
	<span class="name">
		<span>{species.name}</span>
		<span class="gender">
			<GenderIcon gender={pokemon.gender} />
		</span>
	</span>
	<Level value={pokemon.level} />
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
	}

	.name {
		display: flex;
		align-items: center;
	}

	.gender {
		display: flex;
		align-items: center;
		margin-left: 0.25em;
	}
</style>