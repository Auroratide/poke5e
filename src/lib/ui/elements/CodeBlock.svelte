<script lang="ts">
	import { browser } from "$app/environment"
	import type { Snippet } from "svelte"

	let {
		title,
		copiable = false,
		maxHeight = "none",
		children,
	}: {
		title: string,
		copiable?: boolean,
		maxHeight?: string,
		children?: Snippet,
	} = $props()

	let preElem: HTMLPreElement
	let recentlyCopied = $state(false)

	const canCopy = browser ? "clipboard" in navigator : false

	const onCopy = () => {
		navigator.clipboard.writeText(preElem?.textContent)
		recentlyCopied = true
		setTimeout(() => recentlyCopied = false, 2000)
	}
</script>

<div class="code-block" style:--max-height="{maxHeight}">
	<div class="header">
		<span class="title">{title}</span>
		{#if copiable && canCopy}
			<menu>
				<li><button onclick={onCopy}>
					{#if recentlyCopied}
						✓ Copied!
					{:else}
						Copy
					{/if}
				</button></li>
			</menu>
		{/if}
	</div>
	<pre bind:this={preElem}><code class="max-height">{@render children?.()}</code></pre>
</div>

<style>
	.code-block {
		border-radius: 0.25em;
		margin-block-end: 1em;
		tab-size: 2;
	}

	@media screen and (min-width: 37.5rem) {
		.code-block {
			tab-size: 3;
		}
	}

	menu {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	pre {
		opacity: 0.925;
		background: var(--skin-input-bg);
		border: 0.0625em solid var(--skin-bg-light);
		border-block-start: none;
		box-shadow: 0 0 0.25em oklch(0 0 0 / 0.25) inset;
		overflow-x: auto;
		padding: 0.5em;
		max-block-size: var(--max-height);
		border-radius: 0 0 0.25em 0.25em;
		min-block-size: 4em;
	}

	code {
		display: block;
		font-size: var(--font-sz-venus);
		line-height: 1.25;
	}

	button {
		all: unset;
		font-size: var(--font-sz-venus);
		cursor: pointer;
		border: 0.125em solid currentColor;
		border-radius: 1em;
		padding: 0.125em 0.5em;
		background: var(--skin-input-bg);
		color: var(--skin-content-text);
	} button:hover, button:focus {
		background: var(--skin-bg);
		color: var(--skin-bg-text);
	} button:active {
		filter: brightness(0.667);
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: var(--skin-bg);
		color: var(--skin-bg-text);
		border-radius: 0.25em 0.25em 0 0;
		padding: 0.375em 0.5em;
	}
</style>