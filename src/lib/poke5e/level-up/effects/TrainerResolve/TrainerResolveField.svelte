<script lang="ts">
	import { Attributes } from "$lib/dnd/attributes"
	import { m } from "$lib/site/i18n"
	import { CheckboxFields, Fieldset } from "$lib/ui/forms"
	import { type TrainerResolveEffect } from "./TrainerResolve"

	let {
		value,
	}: {
		value: TrainerResolveEffect,
	} = $props()

	let values = $derived(value.props.savingThrows)
	let chosen = $derived(values.find((it) => !value.props.savingThrows.includes(it)))

	const attributeNames = $derived(Attributes.list.map((it) => ({
		name: it.name,
		value: it.abbr,
		disabled: value.props.savingThrows.includes(it.abbr) || (chosen != null && chosen !== it.abbr),
	})))

	$effect(() => {
		value.params.savingThrows = values
	})
</script>

<Fieldset title={m.trainerResolve()} columns={2}>
	<div class="description">
		{@html m.trainerResolveDescriptionHtml()}
	</div>
	<CheckboxFields label="Saving Throws" bind:checked={values} values={attributeNames} />
</Fieldset>

<style>
	.description {
		line-height: 1.4;
		grid-column: span 2;
	}

	.description :global(h3) {
		font-weight: bold;
		font-size: var(--font-sz-earth);
		margin-block: 0.25em;
	}
</style>
