<script lang="ts">
	import PokeMove from "$lib/moves/PokeMove.svelte"
	import { SpeciesStore } from "$lib/poke5e/species"
	import { Url } from "$lib/site/url"
	import { Title } from "$lib/ui/layout"
	import type { PageData } from "./$types"

	const pokemon = SpeciesStore.canonList()

	let {
		data,
	}: {
		data: PageData,
	} = $props()

	const move = $derived(data.move)
</script>

<Title value={move.name} />
<PokeMove move={move} pokemon={$pokemon} dismissToHref={Url.moves()} />

<!-- <Title value={data.move["2024"].name} />

<RenderChosenEdition values={data.move}>
	{#snippet render(move)}
		<PokeMove move={move} pokemon={$pokemon} dismissToHref={Url.moves()} />
	{/snippet}
</RenderChosenEdition>
 -->
