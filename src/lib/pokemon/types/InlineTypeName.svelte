<script lang="ts">
	import type { PokeType } from "./PokemonType"
	import { TypeIcon } from "./icons"

	export let value: PokeType
</script>

<span class="inline-type-name" style:--color="var(--skin-{value}-bg)">
	<span class="icon" aria-hidden="true">
		<TypeIcon type={value} />
	</span>
	<span class="name">
		{value}
	</span>
</span>

<style>
	.inline-type-name {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		color: var(--skin-bg-text);
		text-transform: capitalize;
		overflow: hidden;
		border-radius: 0.25em;
	}

	.icon {
		background: var(--color);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		inline-size: 1.375em;
		block-size: 1.375em;
	} .icon :global(svg) {
		font-size: 1.2em;
	}

	.name {
		background: var(--skin-bg);
		padding-inline: 0.375em;
		padding-block: 0.0625em;
	}
</style>
