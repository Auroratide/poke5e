<script lang="ts">
	import type { Snippet } from "svelte"
	import Loader, { type LoaderSize } from "../elements/Loader.svelte"

	let {
		saving,
		caption = "Saving...",
		children,
		size = "auto",
	}: {
		saving: boolean,
		caption?: string,
		children?: Snippet,
		size?: LoaderSize
	} = $props()
</script>

<div class="relative">
	<div class:muted={saving} inert={saving}>
		{@render children?.()}
	</div>
	{#if saving}
		<div class="center-overlay" aria-live="assertive">
			<div class="fixed">
				<Loader {caption} {size} />
			</div>
		</div>
	{/if}
</div>

<style>
	.muted { opacity: 0.5; }
	.relative { position: relative; }
	.fixed { position: fixed; }

	.center-overlay {
		position: absolute;
		top: min(15vh, 10%);
		left: 50%;
	}
	.center-overlay .fixed {
		--skin-local-color: var(--skin-content-text);
		transform: translateX(-50%);
	}
</style>