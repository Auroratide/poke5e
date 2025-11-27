<script lang="ts">
	import { kebab } from "./kebab"

	export let label: string
	export let value: number
	export let name: string | undefined = undefined
	export let disabled: boolean = false
	export let placeholder: string = ""
	export let min: number = -2000000000
	export let max: number = 2000000000

	$: kebabName = name ?? kebab(label)
	$: id = `${kebabName}-input`

	const roundOnChange = () => {
		if (value != null) {
			value = Math.round(value)
		}
	}
</script>

<div class="money-field">
	<label for="{id}">{label}</label>
	<span class="row">
		<span class="currency">₽</span>
		<input type="number" {id} name="{kebabName}" {placeholder} min="{min}" max="{max}" step="1" bind:value on:change={roundOnChange} {disabled} />
	</span>
</div>

<style>
	.money-field {
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
		flex: 1;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 0.25em;
	}

	.currency {
		font-size: var(--font-sz-neptune);
	}
</style>
