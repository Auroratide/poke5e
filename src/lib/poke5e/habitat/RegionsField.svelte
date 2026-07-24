<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { Fieldset, InstructionText, TextField, TextareaField } from "$lib/ui/forms"
	import type { TextareaFieldChangeEvent } from "$lib/ui/forms/TextareaField.svelte"
	import * as list from "$lib/utils/list"

	let {
		nativeRegion = $bindable(),
		regions = $bindable(),
		disabled = false,
	}: {
		nativeRegion: string,
		regions: string[],
		disabled?: boolean,
	} = $props()

	let regionField = $state(regions.join(", "))

	const onRegionsChange = (e: TextareaFieldChangeEvent) => {
		regions = list.fromCommaOrNewlineString(e.detail.value)
	}
</script>

<Fieldset title="Regions">
	<InstructionText>{m.regionsInstructions()}</InstructionText>
	<TextField label={m.nativeRegion()} bind:value={nativeRegion} placeholder={m.nativeRegionPlaceholder()} {disabled} />
	<TextareaField label={m.allRegionsCommaSeparated()} value={regionField} on:change={onRegionsChange} placeholder={m.regionsPlaceholder()} {disabled} />
</Fieldset>
