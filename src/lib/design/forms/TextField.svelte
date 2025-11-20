<script lang="ts" context="module">
	export type TextFieldChangeEvent = CustomEvent<{ value: string }>
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { kebab } from "./kebab"

	const dispatch = createEventDispatcher()

	export let label: string
	export let value: string
	export let name: string | undefined = undefined
	export let disabled: boolean = false
	export let required: boolean = false
	export let placeholder: string = ""
	export let maxlength: number | undefined = undefined
	export let customError: string | undefined = undefined

	let inputElem: HTMLInputElement

	$: kebabName = name ?? kebab(label)
	$: id = `${kebabName}-input`

	$: inputElem?.setCustomValidity(customError ?? "")

	const onChange = (e: Event) => {
		dispatch("change", { value: (e.target as HTMLInputElement).value })
	}
</script>

<div class="text-field">
	<label for="{id}">{label}</label>
	<input bind:this={inputElem} type="text" {id} name="{kebabName}" {placeholder} {maxlength} bind:value {disabled} {required} on:blur on:focus on:change={onChange} />
</div>

<style>
	.text-field {
		display: flex;
		flex-direction: column;
		gap: 0.125em;
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
