<script lang="ts">
	import { kebab } from "./kebab"

	export let label: string
	export let value: string
	export let name: string | undefined = undefined
	export let disabled: boolean = false
	export let placeholder: string = ""
	export let rows: number = 4

	$: kebabName = name ?? kebab(label)
	$: id = `${kebabName}-input`
</script>

<div class="textarea-field">
	<label for="{id}">{label}</label>
	<textarea {id} name="{kebabName}" {placeholder} {rows} bind:value {disabled}></textarea>
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
