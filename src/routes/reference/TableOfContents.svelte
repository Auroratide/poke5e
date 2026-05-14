<script lang="ts">
	import type { ReferenceInfo } from "./references"
	import { m } from "$lib/site/i18n"

	let {
		items,
	}: {
		items: ReferenceInfo[],
	} = $props()

	let [_, ...rest] = $derived(items)
</script>

<nav class="table-of-contents" aria-label="{m.tableOfContents()}">
	<ol>
		{#each rest as item}
			<li><a href="{item.url}">{item.name}</a></li>
		{/each}
	</ol>
</nav>

<style>
	.table-of-contents {
		line-height: 1.5;
	}
</style>