<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { Fieldset, SelectField, ToggleSwitchField } from "$lib/ui/forms"
	import { slide } from "svelte/transition"
	import { Attributes, type Attribute } from "$lib/dnd/attributes"
	import type { MoveJson } from "$lib/srd/moves/schema"

	type Value = NonNullable<MoveJson["save"]>

	let {
		value = $bindable(),
		label = m.savingThrows(),
		name = "move-save",
		disabled = false,
	}: {
		value: Value | undefined,
		label?: string,
		name?: string,
		disabled?: boolean,
	} = $props()

	const DEFAULT_SAVE: Value = {
		attribute: "dex",
	}

	// remembered so that toggling the save off and on again does not lose what was entered
	let draft = $state<Value>(value ?? DEFAULT_SAVE)

	const update = (changes: Partial<Value>) => {
		draft = { ...draft, ...changes }
		value = draft
	}

	const attributeOptions = Attributes.list.map((it) => ({
		value: it.abbr,
		name: it.name,
	}))
</script>

<Fieldset title={label}>
	<ToggleSwitchField label="Requires a saving throw?" name="{name}-enabled" bind:value={
		() => value != null,
		(on) => value = on ? draft : undefined
	} {disabled} />
	{#if value != null}
		<div transition:slide={{ duration: 150 }}>
			<SelectField label="Attribute" name="{name}-attribute" options={attributeOptions} bind:value={
				() => draft.attribute,
				(attribute) => update({ attribute: attribute as Attribute })
			} {disabled} />
		</div>
	{/if}
</Fieldset>
