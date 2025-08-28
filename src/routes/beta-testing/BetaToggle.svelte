<script lang="ts">
	import { ToggleSwitchField } from "$lib/design/forms"
	import { isFeatureActive, setFeatureActive } from "$lib/FeatureToggles"

	export let feature: string

	$: nameWithSpaces = feature.replace(/([A-Z])/g, " $1").trim()

	let isActive = isFeatureActive(feature)

	const handleChange = (e: CustomEvent<{ value: boolean }>) => {
		setFeatureActive(feature, e.detail.value)
		isActive = e.detail.value
	}
</script>

<div class="beta-toggle" class:active={isActive}>
	<ToggleSwitchField label={nameWithSpaces} value={isActive} on:change={handleChange} />
</div>

<style>
	.beta-toggle {
		background: var(--skin-content);
		border-radius: 2em;
		font-size: var(--font-sz-neptune);
		box-shadow: var(--elev-cumulus);
		border: 0.125em solid transparent;
		transition: border-color 0.125s ease-in-out;
	}

	.beta-toggle :global(div) {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.beta-toggle :global(label) {
		flex: 1;
		padding: 1em 0 1em 1em;
		cursor: pointer;
	}

	.beta-toggle :global(toggle-switch) {
		padding: 0 1em;
	}

	.beta-toggle.active {
		border-color: var(--skin-bg);
	}
</style>
