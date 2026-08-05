<script lang="ts">
	import { kebab } from "./kebab"

	let {
		label,
		value = $bindable(),
		name,
		disabled = false,
		required = false,
	}: {
		label: string,
		value: string,
		name?: string,
		disabled?: boolean
		required?: boolean,
	} = $props()

	const kebabName = $derived(name ?? kebab(label))
	const id = $derived(`${kebabName}-input`)
</script>

<div class="color-field">
	<label for="{id}">{label}</label>
	<input type="color" {id} name="{kebabName}" bind:value {disabled} {required} />
</div>

<style>
	.color-field {
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
		block-size: 3em;
		padding: 0.25em;
	}
</style>
