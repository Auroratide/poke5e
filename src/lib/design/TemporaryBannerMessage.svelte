<script lang="ts">
	import type { Writable } from "svelte/store"
	import { slide } from "svelte/transition"

	export let condition: Writable<boolean>

	const dismiss = () => condition.set(true)
</script>

{#if !$condition}
	<p transition:slide={{ axis: "y", duration: 200 }}><slot></slot> <button on:click={dismiss}>Dismiss this message.</button></p>
{/if}

<style>
	p {
		font-size: var(--font-sz-venus);
		text-align: center;
		background: var(--skin-content);
		padding-block: 0.5em;
		border-radius: 1em;
	}

	button {
		all: unset;
		color: var(--theme-text);
		text-decoration: underline;
		cursor: pointer;
	} button:hover, button:focus {
		text-decoration: none;
	}
</style>