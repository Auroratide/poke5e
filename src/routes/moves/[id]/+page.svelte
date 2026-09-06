<script lang="ts">
	import PokeMove from "$lib/moves/PokeMove.svelte"
	import { SpeciesStore } from "$lib/poke5e/species"
	import { RenderChosenEdition } from "$lib/site/edition"
	import { Url } from "$lib/site/url"
	import { Title } from "$lib/ui/layout"
	import type { PageData } from "./$types"

	const pokemon = SpeciesStore.canonList()

	let {
		data,
	}: {
		data: PageData,
	} = $props()
</script>

<Title value={data.value["2024"].name} />

<RenderChosenEdition values={data.value}>
	{#snippet render(move)}
		<PokeMove move={move} pokemon={$pokemon} dismissToHref={Url.moves()} />
	{/snippet}
</RenderChosenEdition>

