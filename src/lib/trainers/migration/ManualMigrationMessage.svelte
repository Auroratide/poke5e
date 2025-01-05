<script lang="ts">
	import { base } from "$app/paths"
	import { slide } from "svelte/transition"
	import { seenTrainerRecovery } from "./store"

	const dismiss = () => seenTrainerRecovery.set(true)
</script>

{#if !$seenTrainerRecovery}
	<p transition:slide={{ axis: "y", duration: 200 }}>Trainers missing? <a href="{base}/trainer-recovery">Learn how to recover them</a>! Or, <button on:click={dismiss}>dismiss this message.</button></p>
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