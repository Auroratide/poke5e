<script lang="ts">
	import { page } from "$app/stores"
	import VisuallyHidden from "./VisuallyHidden.svelte"

	export let title: string
	export let target: string

	$: pathname = $page.url.pathname
	$: isMainRefPage = pathname === target
</script>

<VisuallyHidden>
	{#if isMainRefPage} <h1 class="title">{title}</h1> {:else} <p class="title">{title}</p> {/if}
</VisuallyHidden>

<style>
	.title {
		font-size: var(--font-sz-neptune);
		font-weight: bold;
		margin-block-end: 0.5em;
	}
</style>