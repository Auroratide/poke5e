<script lang="ts">
	import type { PageData } from "./$types"
	import { Title } from "$lib/ui/layout"
	import { PokemonSpeciesCard } from "$lib/poke5e/species"
	import { RenderChosenEdition } from "$lib/site/edition"
	import { Url } from "$lib/site/url"

	let {
		data,
	}: {
		data: PageData,
	} = $props()
</script>

<Title value={data.pokemon["2024"].name} />

<RenderChosenEdition values={data.pokemon}>
	{#snippet render(pokemon)}
		<PokemonSpeciesCard value={pokemon} dismissToHref={Url.pokemon()} />
	{/snippet}
</RenderChosenEdition>
