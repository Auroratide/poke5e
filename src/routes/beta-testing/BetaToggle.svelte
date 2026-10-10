<script lang="ts">
	import { ToggleSwitchField } from "$lib/ui/forms"
	import { setFeatureActive, type FeatureToggle } from "$lib/site/FeatureToggles"
	import { Tag } from "$lib/ui/elements"

	let {
		feature,
	}: {
		feature: FeatureToggle,
	} = $props()

	let isActive = $derived(feature.isActive())

	const handleChange = (e: CustomEvent<{ value: boolean }>) => {
		setFeatureActive(feature.id, e.detail.value)
		isActive = e.detail.value

		window.location.reload()
	}
</script>

<div class="beta-toggle" class:active={isActive} class:hidden={feature.status === "Hidden"}>
	<ToggleSwitchField label={feature.name} value={isActive} on:change={handleChange} />
	<p><Tag color={feature.status === "Ready" ? "success" : feature.status === "Early" ? "danger" : undefined}>{feature.status}</Tag> {feature.description}</p>
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

	.beta-toggle p {
		font-size: var(--font-sz-mars);
		padding: 0 1em;
		margin-block: 0 1em;
		line-height: 1.5;
	}

	.hidden {
		display: none;
	}
</style>
