<script lang="ts">
	import { SpecializationList } from "./specializations"
	import { TypeIcon } from "$lib/pokemon/icons"
	import type { PokeType } from "$lib/pokemon/types"

	export let specializations: Record<PokeType, number>
</script>

<ul>
	{#each Object.values($SpecializationList) as specialization}
		{@const amount = specializations[specialization.type]}
		{#if amount > 0}
			<li>
				<span class="tag" style:--skin-local-bg="var(--skin-{specialization.type}-bg)">
					<span class="header">
						<span class="type-icon"><TypeIcon type={specialization.type} /></span>
						<span class="type-name">{specialization.type}</span>
					</span>
					<span class="main">
						<span class="specialization-name">{specialization.name}</span>
						<span class="specialization-count"><strong>&times;{amount}</strong></span>
					</span>
				</span>
			</li>
		{/if}
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
		padding: 0;
		font-size: var(--font-sz-venus);
		column-count: 2;
	} li {
		display: flex;
		align-items: center;
		gap: 0.25em;
	} li :global(.type-tag) {
		font-size: var(--font-sz-venus);
	}

	.tag {
		display: flex;
		flex-direction: column;
		border-radius: 1em;
		overflow: hidden;
	}

	.tag .header {
		display: flex;
		background: var(--skin-local-bg);
		color: var(--skin-bg-text);
		padding: 0.125em 1.5em;
		align-items: center;
		justify-content: center;
	}

	.tag .type-name {
		text-transform: capitalize;
		font-size: var(--font-sz-venus);
	}

	.tag .type-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25em;
	}

	.tag .main {
		background: var(--skin-bg);
		color: var(--skin-bg-text);
		padding: 0.25em 1.5em;
	}
</style>