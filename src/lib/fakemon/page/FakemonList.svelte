<script lang="ts">
	import Button from "$lib/design/Button.svelte"
	import ListHeading from "$lib/design/ListHeading.svelte"
	import { Url } from "$lib/url"
	import { PageAction } from "./actions"

	// export let fakemon: 

	// $: filtered = 

	// const byStringField = (field: (m: Fakemon) => string) =>
	// 	(l: Fakemon, r: Fakemon) => field(l).localeCompare(field(r))
</script>

<ListHeading title="Fakémon" target="/fakemon">
	<a slot="link" href="{Url.fakemon(undefined, PageAction.find)}" class="dark-font">Find by fakémon ID &gt;</a>
	<Button slot="action" href="{Url.fakemon(undefined, PageAction.add)}">+ New Fakémon</Button>
</ListHeading>
<!-- <SortableTable let:item let:cellVisibility items={filtered} bind:currentSorter={$trainerListSorter} headers={[ {
	key: "name", name: "Name", ratio: 1, sort: byStringField(it => it.name),
} ]}>
	<BubbleRow.Row interactive mainBg="var(--skin-bg-dark)">
		<BubbleRow.Cell cellVisibility={cellVisibility[0]} primary><a href="{Url.fakemon(item)}">{item.name}</a></BubbleRow.Cell>
	</BubbleRow.Row>
</SortableTable> -->

<style>
	.space-bottom {
		margin-bottom: 0.5em;
	}

	.dark-font {
		color: var(--skin-content-text);
	}
</style>
