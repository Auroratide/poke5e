<script lang="ts">
	import type { TrainerPokemon } from "../types"
	import { Level } from "$lib/ui/elements"
	import { GenderIcon } from "$lib/creatures/gender"
	import type { PokemonSpecies } from "$lib/creatures/species"

	export let pokemon: TrainerPokemon
	export let species: PokemonSpecies
</script>

<div class="grid">
	<span class="name">
		<span>{species.data.name}</span>
		<span class="gender">
			<GenderIcon gender={pokemon.gender} />
		</span>
	</span>
	<Level value={pokemon.level.data} />
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