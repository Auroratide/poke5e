<script lang="ts">
	import type { PokemonId, Trainer } from "../types"
	import { MissingNo } from "$lib/ui/elements"

	export let trainer: Trainer
	export let pokemonId: PokemonId
</script>

<div class="centered padded">
	<h1 class="large-font space-bottom">Cannot find pokemon</h1>
	<p>No pokemon with id <strong>{pokemonId}</strong> belongs to {trainer.name}.</p>
	<p class="missingno"><MissingNo /></p>
	<p>Select one of {trainer.name}'s pokemon to view its details.</p>
</div>

<style>
	.padded {
		padding-block: 2rem;
	}

	.centered {
		text-align: center;
	}

	.large-font {
		font-size: var(--font-sz-neptune);
		font-weight: bold;
	}

	.space-bottom {
		margin-bottom: 1em;
	}

	.missingno {
		height: 8rem;
	}
</style>