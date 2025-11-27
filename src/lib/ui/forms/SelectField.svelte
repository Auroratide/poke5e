<script lang="ts" context="module">
	export type SelectFieldOption = {
		name: string,
		value: string,
		disabled?: boolean,
	}

	export type SelectFieldOptionGroup = {
		name: string,
		values: SelectFieldOption[],
	}

	export const SelectFieldOther = "other"

	export type SelectFieldChangeEvent = CustomEvent<{ value: string, other?: string }>
</script>

<script lang="ts">
	import { slide } from "svelte/transition"
	import { kebab } from "./kebab"
	import { createEventDispatcher } from "svelte"
	import ChevronDown from "$lib/design/icon/ChevronDown.svelte"

	export let label: string
	export let value: string
	export let options: SelectFieldOptionGroup[] | SelectFieldOption[]
	export let name: string | undefined = undefined
	export let disabled: boolean = false
	export let other: string | undefined = undefined

	const dispatch = createEventDispatcher()

	const isGroups = (options: SelectFieldOptionGroup[] | SelectFieldOption[]): options is SelectFieldOptionGroup[] =>
		"values" in options[0]

	$: kebabName = name ?? kebab(label)
	$: id = `${kebabName}-input`

	const handleChange = () => {
		dispatch("change", { value, other })
	}
</script>

<div class="select-field">
	<label for="{id}">{label}</label>
	<div class="select-container">
		<select class="cap" {id} bind:value {disabled} on:change={handleChange}>
			{#if isGroups(options)}
				{#each options as group}
					<optgroup label="{group.name}">
						{#each group.values as option (option.value)}
							<option value="{option.value}" disabled={option.disabled}>{option.name}</option>
						{/each}
					</optgroup>
				{/each}
			{:else}
				{#each options as option (option.value)}
					<option value="{option.value}" disabled={option.disabled}>{option.name}</option>
				{/each}
				{#if other != null}
					<option value="{SelectFieldOther}">Other</option>
				{/if}
			{/if}
		</select>
		<span class="select-indicator" aria-hidden="true"><ChevronDown /></span>
	</div>
	{#if value === SelectFieldOther}
		<div class="other-field" transition:slide>
			<label for="{id}-other">Specify:</label>
			<input type="text" id="{id}-other" name="{kebabName}-other" bind:value={other} {disabled} on:change={handleChange} />
		</div>
	{/if}
</div>

<style>
	.select-field {
		display: flex;
		flex-direction: column;
		gap: 0.125em;
	}

	.select-container {
		flex: 1;
		position: relative;
	}

	.select-indicator {
		position: absolute;
		pointer-events: none;
		user-select: none;
		inset-block: 0;
		inset-inline-end: 0;
		display: inline-flex;
		align-items: center;
		padding-inline: 0.125em;
	}

	.other-field {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
		align-items: center;
		margin-block-start: 0.25em;
	}

	.other-field input {
		padding: 0.25em 0.5em;
		flex: 1;
	}

	label {
		display: block;
		font-weight: bold;
		font-size: var(--font-sz-venus);
		letter-spacing: -0.04em;
	}

	select {
		appearance: none;
		border-radius: 0;
		cursor: pointer;
	}

	select, input {
		inline-size: 100%;
	}
</style>
