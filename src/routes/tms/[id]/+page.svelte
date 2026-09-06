<script lang="ts">
	import PokeMove from "$lib/moves/PokeMove.svelte"
	import { Move } from "$lib/moves/Move"
	import { SpeciesStore } from "$lib/poke5e/species"
	import { DEFAULT_SRD_EDITION, RenderChosenEdition } from "$lib/site/edition"
	import { Url } from "$lib/site/url"
	import { Title } from "$lib/ui/layout"
	import type { PageData } from "./$types"

	const pokemon = SpeciesStore.canonList()

	let {
		data,
	}: {
		data: PageData,
	} = $props()

	const title = $derived(Move.fromJson(data.value[DEFAULT_SRD_EDITION]!.move, {
		tm: data.value[DEFAULT_SRD_EDITION]?.tm,
	}).tmName())
</script>

<Title value={title} />

<RenderChosenEdition values={data.value}>
	{#snippet render(value)}
		{#if value != null}
			<PokeMove move={Move.fromJson(value.move, {
				contest: value.contest,
				contestEffect: value.effect,
				tm: value.tm,
			})} pokemon={$pokemon} tm dismissToHref={Url.tms()} />
		{/if}
	{/snippet}
</RenderChosenEdition>
