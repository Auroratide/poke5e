<script lang="ts">
	import { Button } from "$lib/ui/elements"
	import { Tag } from "$lib/ui/elements"
	import type { Move } from "$lib/moves/types"
	import { TypeIcon } from "$lib/pokemon/types/icons"
	import MoveDescription from "$lib/moves/MoveDescription.svelte"


	export let idPrefix: string
	export let value: Move

	let showInfo = false
	$: infoId = `${idPrefix}-${value.id}-info`
</script>

<div class="option">
	<div class="tag">
		<Tag color={value.type}>
			<TypeIcon type={value.type} slot="icon" />
			<span class="full-row">
				<span class="full align-center">{value.name}</span>
				<span class="smaller no-round button-row">
					<Button bind:expanded={showInfo} controls="{infoId}"><span class="smaller">{#if showInfo}-{:else}+{/if} Info</span></Button>
					<slot></slot>
				</span>
			</span>
		</Tag>
	</div>
	<div class="smaller padded" id="{infoId}" hidden={!showInfo}>
		<MoveDescription move={value} />
	</div>
</div>

<style>
	.tag {
		font-size: var(--font-sz-neptune);
	} .tag :global(.name) {
		padding-inline-end: 0;
		padding-block: 0;
	}
	
	.option :global(.tag) {
		inline-size: 100%;
	}
	
	.full-row {
		flex: 1;
		display: flex;
	}

	.full { flex: 1; }
	.align-center {
		display: flex;
		align-items: center;
	}

	.button-row {
		display: flex;
		gap: 0;
	}

	.smaller { font-size: var(--font-sz-venus); }
	.no-round :global(button) {
		border-radius: 0;
	}

	.padded {
		padding-inline: 0.5em;
	}
</style>