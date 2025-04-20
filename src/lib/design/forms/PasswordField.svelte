<script lang="ts">
	import { kebab } from "./kebab"
	import WithButton from "./WithButton.svelte"

	export let label: string
	export let value: string
	export let name: string | undefined = undefined
	export let disabled: boolean = false
	export let required: boolean = false

	let revealed = false
	$: inputType = revealed ? "text" : "password"
	$: toggleButtonText = revealed ? "Hide" : "Reveal"
	const toggleRevealed = () => revealed = !revealed

	$: kebabName = name ?? kebab(label)
	$: id = `${kebabName}-input`
</script>

<WithButton label="{toggleButtonText}" on:click={toggleRevealed}>
	<div class="password-field">
		<label for="{id}">{label}</label>
		<input type="{inputType}" {id} name="{kebabName}" {value} {disabled} {required} />
	</div>
</WithButton>

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
</style>
