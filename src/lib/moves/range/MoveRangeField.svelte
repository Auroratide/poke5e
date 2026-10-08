<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { IntField, SelectField } from "$lib/ui/forms"
	import { MoveRange } from "./MoveRange"

	let {
		value = $bindable(),
		label,
		name,
		disabled = false,
		defaultable = false,
	}: {
		value: MoveRange | undefined,
		label: string,
		name?: string,
		disabled?: boolean,
		defaultable?: boolean,
	} = $props()

	let customType = $state<string | undefined>(undefined)

	const DEFAULT_OPTION = ""

	const options = $derived(defaultable ? [ {
		value: DEFAULT_OPTION,
		name: `- ${m.defaultText()} -`,
	} ].concat(MoveRange.unitOptions()) : MoveRange.unitOptions())
</script>

<SelectField bind:value={
	() => value?.type ?? DEFAULT_OPTION,
	(v) => {
		value = v === DEFAULT_OPTION ? undefined : MoveRange.fromTypeAndValue(v, 0)
		customType = v === DEFAULT_OPTION ? undefined : v
	}
} {options} {label} {name} {disabled} />
{#if customType === "distance" && value?.type === "distance" && value?.value != null}
	<IntField label="Feet" name="{name}-feet" bind:value={value.value} {disabled} />
{/if}
