<script lang="ts" context="module">
	export type TextareaFieldChangeEvent = CustomEvent<{ value: string }>
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { kebab } from "./kebab"

	const dispatch = createEventDispatcher()

	export let label: string
	export let value: string
	export let name: string | undefined = undefined
	export let disabled: boolean = false
	export let placeholder: string = ""
	export let rows: number = 4

	$: kebabName = name ?? kebab(label)
	$: id = `${kebabName}-input`

	const onChange = (e: Event) => {
		dispatch("change", { value: (e.target as HTMLInputElement).value })
	}
</script>

<div class="textarea-field">
	<label for="{id}">{label}</label>
	<textarea {id} name="{kebabName}" {placeholder} {rows} bind:value {disabled} on:change={onChange}></textarea>
</div>

<style>
	.textarea-field {
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

	textarea {
		inline-size: 100%;
		font-size: var(--font-sz-venus);
	}
</style>
