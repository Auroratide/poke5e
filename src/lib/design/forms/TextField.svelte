<script lang="ts">
	import { kebab } from "./kebab"

	export let label: string
	export let value: string
	export let name: string | undefined = undefined
	export let disabled: boolean = false
	export let required: boolean = false
	export let placeholder: string = ""
	export let maxlength: number | undefined = undefined

	$: kebabName = name ?? kebab(label)
	$: id = `${kebabName}-input`
</script>

<div class="text-field">
	<label for="{id}">{label}</label>
	<input type="text" {id} name="{kebabName}" {placeholder} {maxlength} bind:value {disabled} {required} on:blur on:focus />
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
