<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { Fieldset, InstructionText, SelectField } from "$lib/ui/forms"
	import type { MoveJson } from "$lib/srd/moves/schema"

	type Value = NonNullable<MoveJson["attack"]>

	let {
		value = $bindable(),
		label = m.attack(),
		name = "move-attack",
		disabled = false,
	}: {
		value: Value | undefined,
		label?: string,
		name?: string,
		disabled?: boolean,
	} = $props()

	const NONE_OPTION = ""

	const options = [
		{ value: NONE_OPTION, name: "No Attack Roll" },
		{ value: "melee", name: m.melee() },
		{ value: "ranged", name: "Ranged" },
	]
</script>

<Fieldset title={label}>
	<InstructionText>If this move has an attack roll, choose whether it is Melee or Ranged.</InstructionText>
	<SelectField label="Attack Roll" name="{name}-scope" {options} bind:value={
		() => value?.scope ?? NONE_OPTION,
		(v) => value = v === NONE_OPTION ? undefined : { scope: v as Value["scope"] }
	} {disabled} />
</Fieldset>
