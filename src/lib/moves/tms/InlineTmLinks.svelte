<script lang="ts">
	import { TmsStore as allTms } from "../store"
	import { Url } from "$lib/site/url"

	export let tms: number[]

	const name = (tm: number) => $allTms.find(it => it.tm.id === tm)?.tmName()
</script>

{#if $allTms !== undefined}
	<ul>
		{#each tms as tm}
			<li><a href="{Url.tms(tm.toString())}">{name(tm)}</a></li>
		{/each}
	</ul>
{:else}
	<span class="loading" aria-label="Loading">...</span>
{/if}

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		column-count: 2;
	}

	@media screen and (min-width: 75rem) {
		ul { column-count: 3; }
	}

	li {
		display: block;
	}

	.loading {
		opacity: 0.5;
	}
</style>