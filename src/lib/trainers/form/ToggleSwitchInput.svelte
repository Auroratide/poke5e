<script lang="ts">
	export let name: string
	export let label: string
	export let value: boolean
	export let disabled: boolean

	const handleChange = (e: CustomEvent<{ checked: boolean }>) => {
		value = e.detail.checked
	}
</script>

<label for="{name}-input">{label}</label>
<toggle-switch id="{name}-input" {name} checked={value} on:change={handleChange} {disabled}></toggle-switch>

<style>
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
