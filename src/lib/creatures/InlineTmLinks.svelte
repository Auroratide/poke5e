<script lang="ts">
	import { base } from "$app/paths"
	import { tms as allTms } from "../moves/store"

	export let tms: number[]

	const name = (tm: number) => $allTms.find(it => it.id === tm)?.moveInfo?.name
</script>

{#if $allTms !== undefined}
	<ul>
		{#each tms as tm}
			<li><a href="{base}/tms/{tm}">{name(tm)}</a></li>
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

	@media screen and (min-width: 37.5rem) {
		ul { column-count: 3; }
	}

	li {
		display: block;
	}

	.loading {
		opacity: 0.5;
	}
</style>