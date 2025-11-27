<script lang="ts">
	import { page } from "$app/stores"
	import { VisuallyHidden } from "../elements"

	export let title: string
	export let target: string

	$: pathname = $page.url.pathname
	$: isMainPage = pathname === target
</script>

<VisuallyHidden>
	{#if isMainPage} <h1 class="title">{title}</h1> {:else} <p class="title">{title}</p> {/if}
</VisuallyHidden>

<style>
	.title {
		font-size: var(--font-sz-neptune);
		font-weight: bold;
		margin-block-end: 0.5em;
	}
</style>