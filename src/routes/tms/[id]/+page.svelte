<script lang="ts">
	import type { PageData } from "./$types"
	import PokeMove from "$lib/moves/PokeMove.svelte"
	import { Title } from "$lib/ui/layout"
	import { SpeciesStore } from "$lib/poke5e/species"

	const pokemon = SpeciesStore.canonList()

	export let data: PageData
	$: tm = data.tm
</script>

<Title value={tm.tmName()} />
<PokeMove move={tm} pokemon={$pokemon} tm />
