<script lang="ts">
	import { kebab } from "./kebab"

	export let label: string
	export let value: boolean
	export let name: string | undefined = undefined
	export let disabled: boolean = false

	$: kebabName = name ?? kebab(label)
	$: id = `${kebabName}-input`

	const handleChange = (e: CustomEvent<{ checked: boolean }>) => {
		value = e.detail.checked
	}
</script>

<div class="toggle-switch-field">
	<label for="{id}">{label}</label>
	<toggle-switch {id} name="{kebabName}" checked={value} on:change={handleChange} {disabled}></toggle-switch>
</div>

<style>
	.toggle-switch-field {
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

	toggle-switch {
		--shadow-on: 0 0 0.0625em oklch(0% 0 0 / 0.5);
		--transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
		display: flex;
		gap: 1em;
	}

	toggle-switch::part(track),
	toggle-switch::part(slider) {
		display: none;
	}

	toggle-switch::before {
		content: "On";
		opacity: 0.4;
		text-shadow: none;
		transition: var(--transition);
	} toggle-switch[checked]::before {
		text-shadow: var(--shadow-on);
		opacity: 1;
	}
	
	toggle-switch::after {
		content: "Off";
		opacity: 1;
		text-shadow: var(--shadow-on);
		color: var(--skin-bg-dark);
		transition: var(--transition);
	} toggle-switch[checked]::after {
		text-shadow: none;
		opacity: 0.4;
	}
</style>
