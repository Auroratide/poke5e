<script lang="ts">
	import { browser } from "$app/environment"
	import Button from "./Button.svelte"

	export let value: string
	export let disabled: boolean = false

	const canCopy = browser ? "clipboard" in navigator : false

	let recentlyCopied = false
	const copy = () => {
		navigator.clipboard.writeText(value)
		recentlyCopied = true
		setTimeout(() => recentlyCopied = false, 2000)
	}
</script>

<Button on:click={copy} disabled={disabled || !canCopy}>
	<span class="fixed-width">
		{#if recentlyCopied}
			✓ Copied!
		{:else}
			Copy
		{/if}
	</span>
</Button>

<style>
	.fixed-width {
		display: inline-block;
		min-inline-size: 8ch;
	}
</style>
