<script lang="ts">
	import type { Pokemon } from "$lib/creatures/types"
	import type { TrainerPokemon } from "../types"
	import GenderIcon from "$lib/design/GenderIcon.svelte"

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
	<span class="level">
		<span class="level-text">Lv.</span>
		<span class="level-number">{pokemon.level}</span>
	</span>
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

	.level {
		justify-self: right;
	}

	.level-text {
		font-size: var(--font-sz-venus);
	}

	.level-number {
		font-size: var(--font-sz-neptune);
	}
</style>