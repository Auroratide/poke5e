<script lang="ts">
	import type { Snippet } from "svelte"
	import { onMount } from "svelte"

	let {
		children,
	}: {
		children?: Snippet,
	} = $props()

	let rowElem: HTMLElement

	// the CSS is easier if this is NOT wrapping, hence the negative condition
	let isNotWrapping = $state(true)

	onMount(() => {
		const resizer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const container = entry.target
				const items = [...container.children]
				const top = items[0]
				if ("offsetTop" in top) {
					isNotWrapping = !items.some((el) => "offsetTop" in el && el.offsetTop !== top.offsetTop)
				}
			}
		})

		if (rowElem) {
			resizer.observe(rowElem)
		}

		return () => {
			resizer.disconnect()
		}
	})
</script>

<div bind:this={rowElem} class="button-row" class:is-not-wrapping={isNotWrapping}>
	{@render children?.()}
</div>

<style>
	.button-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
		inline-size: 100%;
		text-align: center;
	}

	.button-row :global(> *) {
		flex: 1;
	}

	.is-not-wrapping {
		&.button-row {
			gap: 0.5em 0.125em;
		}

		&.button-row :global(button),
		&.button-row :global(a) {
			border-radius: 0;
		}
	
		&.button-row :global(button:first-child),
		&.button-row :global(a:first-child) {
			border-start-start-radius: 1em;
			border-end-start-radius: 1em;
		}
	
		&.button-row :global(button:last-child),
		&.button-row :global(a:last-child) {
			border-end-end-radius: 1em;
			border-start-end-radius: 1em;
		}
	}
</style>