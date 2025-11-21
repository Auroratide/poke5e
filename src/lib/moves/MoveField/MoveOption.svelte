<script lang="ts">
	import { Tag } from "$lib/design/Tag"
	import type { Move } from "$lib/moves/types"
	import { TypeIcon } from "$lib/pokemon/types-2/icons"

	export let value: Move
	export let disabled = false
</script>

<button class="move-option" on:click aria-label="{value.name}" type="button" {disabled}>
	<Tag color={value.type} width="full">
		<TypeIcon type={value.type} slot="icon" />
		<span class="full-row">
			<span class="full align-center">{value.name}</span>
		</span>
	</Tag>
</button>

<style>
	button {
		all: unset;
		cursor: pointer;
		display: block;
		inline-size: 100%;
	}

	.full-row {
		flex: 1;
		display: flex;
	}

	.full { flex: 1; padding-block: 0.25em; }
	.align-center {
		display: flex;
		align-items: center;
	}
</style>