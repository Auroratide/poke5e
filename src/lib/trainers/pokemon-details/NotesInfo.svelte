<script lang='ts'>
	import Markdown from "$lib/rendering/Markdown.svelte"
	import type { TrainerPokemon } from "../types"

	export let pokemon: TrainerPokemon
</script>

<h2>General Notes</h2>
<div class="font-sm">
	<Markdown value={pokemon.notes} />
</div>

<style>
	.font-sm {
		font-size: var(--font-sz-venus);
	}
</style>