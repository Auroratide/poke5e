<script lang="ts">
	import { IntField, SelectField, SingleCheckboxField } from "$lib/ui/forms"
	import { m } from "$lib/site/i18n"
	import { MoveDuration } from "./MoveDuration"
	import { slide } from "svelte/transition"

	let {
		value = $bindable(),
		label = m.type(),
		name,
		disabled = false,
		defaultable = false,
	}: {
		value: MoveDuration | undefined,
		label?: string,
		name?: string,
		disabled?: boolean,
		defaultable?: boolean,
	} = $props()

	let isCustom = $state(value != null)

	const DEFAULT_OPTION = ""

	const options = $derived(defaultable ? [ {
		value: DEFAULT_OPTION,
		name: `- ${m.defaultText()} -`,
	} ].concat(MoveDuration.unitOptions()) : MoveDuration.unitOptions())
</script>

<SelectField bind:value={
	() => value?.unit ?? DEFAULT_OPTION,
	(v) => {
		value = v === DEFAULT_OPTION ? undefined : MoveDuration.fromTypeAndValue(v, 0, false)
		isCustom = v !== DEFAULT_OPTION && v !== "instantaneous"
	}
} {options} {label} {name} {disabled} />
{#if isCustom && value?.value != null && value?.concentration != null}
	<div class="space" transition:slide={{ duration: 150 }}>
		<SingleCheckboxField label="Concentration?" bind:checked={value.concentration} />
		<IntField label="Duration Length" bind:value={value.value} />
	</div>
{/if}

<style>
	.space {
		display: flex;
		flex-direction: column;
		gap: 0.75em;
	}
</style>
