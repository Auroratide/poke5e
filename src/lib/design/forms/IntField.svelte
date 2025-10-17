<script lang="ts" context="module">
	export type IntFieldChangeEvent = CustomEvent<{ value: number }>
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { kebab } from "./kebab"

	export let label: string
	export let value: number
	export let name: string | undefined = undefined
	export let disabled: boolean = false
	export let required: boolean = false
	export let placeholder: string = ""
	export let min: number | undefined = undefined
	export let max: number | undefined = undefined
	export let optional: boolean = false
	export let span: number = 1

	const dispatch = createEventDispatcher()

	$: kebabName = name ?? kebab(label)
	$: id = `${kebabName}-input`

	const roundOnChange = (e: Event) => {
		const v = parseFloat((e.target as HTMLInputElement).value)
		if (!isNaN(v)) {
			value = Math.round(v)
		} else {
			value = optional ? undefined : value
		}

		dispatch("change", { value })
	}
</script>

<div class="int-field" style:--span="{span}">
	<label for="{id}">{label}</label>
	<input type="number" {id} name="{kebabName}" {placeholder} {min} {max} step="1" {value} on:change={roundOnChange} {disabled} {required} />
</div>

<style>
	.int-field {
		display: flex;
		flex-direction: column;
		gap: 0.125em;
		grid-column: span var(--span);
	}

	label {
		display: block;
		font-weight: bold;
		font-size: var(--font-sz-venus);
		letter-spacing: -0.04em;
	}

	input {
		inline-size: 100%;
	}
</style>
