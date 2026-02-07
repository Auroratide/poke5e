<script lang="ts" context="module">
	export type ChangeDetail = {
		value: NonVolatileStatus | null
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { NonVolatileStatus } from "$lib/pokemon/status"
	import VisuallyHidden from "../ui/elements/VisuallyHidden.svelte"
	import { m } from "$lib/site/i18n";

	const dispatch = createEventDispatcher()
	const statusList = Object.values(NonVolatileStatus)

	export let id: string
	export let value: NonVolatileStatus | null

	const onChange = (e: Event) => {
		const target = e.target as HTMLSelectElement
		value = target.value ? (target.value) as NonVolatileStatus : null
		dispatch("change", { value } as ChangeDetail)
	}

	// Accessibility
	const onKeyUp = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			const target = e.target as HTMLSelectElement
			if ("showPicker" in HTMLSelectElement.prototype) {
				target.showPicker()
			}
		}
	}
</script>

<div class="overlapping interactive-container">
	<label for="{id}" class="smaller interactive" class:invert={value == null}>
		<span aria-hidden="true">
			{#if value == null} {m["universal.addStatus"]()} {:else} Edit {/if}
		</span>
		<VisuallyHidden>{m["universal.editStatus"]()}</VisuallyHidden>
	</label>
	<select {id} {value} on:change={onChange} class="overlay" on:keyup={onKeyUp}>
		<option value={null}>{m["universal.noneMasculine"]()}</option>
		{#each statusList as status}
			<option value="{status.id}">{status.name}</option>
		{/each}
	</select>
</div>

<style>
	.overlapping {
		position: relative;
	} .overlapping > :last-child {
		position: absolute;
		inset: 0;
	}

	select { cursor: pointer; }

	.interactive {
		padding: 0.0625em 0.5em;
		border-radius: 1em;
	} .interactive.invert {
		background: var(--skin-input-bg);
	}

	.interactive-container:hover .interactive,
	.interactive-container:focus-within .interactive {
		background: var(--skin-input-bg);
	}
	.interactive-container:hover .interactive.invert,
	.interactive-container:focus-within .interactive.invert {
		background: none;
	}

	.overlay { opacity: 0; }
	.smaller { font-size: var(--font-sz-venus); }
</style>
