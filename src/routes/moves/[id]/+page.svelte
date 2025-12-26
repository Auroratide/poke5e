<script lang="ts">
	import type { PageData } from "./$types"
	import PokeMove from "$lib/moves/PokeMove.svelte"
	import { Title } from "$lib/ui/layout"
	import { SpeciesStore } from "$lib/poke5e/species"

	const pokemon = SpeciesStore.canonList()

	export let data: PageData
	$: move = data.move
</script>

<Title value={move.name} />
<PokeMove move={move} pokemon={$pokemon} />
