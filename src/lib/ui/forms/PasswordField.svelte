<script lang="ts">
	import { Button, CopyButton } from "../elements"
	import { kebab } from "./kebab"

	export let label: string
	export let value: string
	export let name: string | undefined = undefined
	export let disabled: boolean = false
	export let required: boolean = false
	export let copiable: boolean = false

	let revealed = false
	$: inputType = revealed ? "text" : "password"
	$: toggleButtonText = revealed ? "Hide" : "Show"
	const toggleRevealed = () => revealed = !revealed

	$: kebabName = name ?? kebab(label)
	$: id = `${kebabName}-input`
</script>

<div class="with-button">
	<div class="flex">
		<div class="password-field">
			<label for="{id}">{label}</label>
			<input type="{inputType}" {id} name="{kebabName}" {value} {disabled} {required} />
		</div>
	</div>
	<div class="end">
		<Button on:click={toggleRevealed}>{toggleButtonText}</Button>
		{#if copiable}
			<CopyButton {value} />
		{/if}
	</div>
</div>

<style>
	.password-field {
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

	.with-button {
		display: flex;
		gap: 0.5em;
	}

	.end {
		align-self: flex-end;
		padding-block: 0.25em;
	}

	.flex { flex: 1; }
</style>
