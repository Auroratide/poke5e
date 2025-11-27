<script lang="ts">
	import { page } from "$app/stores"

	export let title: string
	export let target: string

	$: pathname = $page.url.pathname
	$: numberOfParams = $page.url.searchParams.size
	$: isMainPage = pathname === target && numberOfParams === 0
</script>

<div class="flex-column space-bottom">
	{#if isMainPage}
		<h1 class="large-font space-bottom">{title}</h1>
	{:else}
		<p class="large-font space-bottom">{title}</p>
	{/if}
	<div class="flex-row space-between">
		<p class="indent small-font no-space">
			<slot name="link"></slot>
		</p>
		<slot name="action"></slot>
	</div>
</div>

<style>
	.flex-row {
		display: flex;
		align-items: center;
	}

	.space-between {
		justify-content: space-between;
	}

	.space-bottom {
		margin-bottom: 0.25em;
	}

	.large-font {
		font-size: var(--font-sz-neptune);
		font-weight: bold;
	}

	.small-font {
		font-size: var(--font-sz-venus);
	}

	.indent {
		text-indent: 1em;
	}

	.no-space {
		margin: 0;
	}
</style>