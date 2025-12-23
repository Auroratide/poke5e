<script lang="ts">
	import type { PokeType } from "$lib/pokemon/types"

	export let color: PokeType | undefined = undefined
	export let width: "auto" | "full" = "auto"
</script>

<span class="tag" style:--color="var(--skin-{color}-bg)" class:full-width={width === "full"}>
	{#if $$slots.icon}
		<span class="icon" aria-hidden="true">
			<slot name="icon"></slot>
		</span>
	{/if}
	<span class="name">
		<slot></slot>
	</span>
</span>

<style>
	.tag {
		font-size: var(--font-sz-venus);
		display: inline-flex;
		flex-direction: row;
		color: var(--skin-bg-text);
		text-transform: capitalize;
		overflow: hidden;
		border-radius: 0.25em;
		line-height: 1;
	}

	.full-width {
		inline-size: 100%;
	}

	.icon {
		background: var(--color);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		inline-size: 1.375em;
	} .icon :global(svg) {
		font-size: 1.2em;
	}

	.name {
		flex: 1;
		display: flex;
		align-items: center;
		background: var(--skin-bg);
		padding-inline: 0.375em;
		padding-block: 0.0625em;
		font-weight: bold;
	}
</style>
