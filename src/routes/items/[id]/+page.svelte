<script lang="ts">
	import type { PageData } from "./$types"
	import { Title } from "$lib/ui/layout"
	import { PokeItem } from "$lib/items"
	import { RenderChosenEdition } from "$lib/site/edition"

	let {
		data,
	}: {
		data: PageData,
	} = $props()
</script>

<Title value={data.item["2024"].name} />

<RenderChosenEdition values={data.item}>
	{#snippet render(item)}
		<PokeItem {item} />
	{/snippet}
</RenderChosenEdition>
