<script lang="ts">
	import { m } from "$lib/site/i18n"
	import {
		Form,
		Fieldset,
		TextField,
		IntField,
	} from "$lib/ui/forms"
	import { MoveDurationField } from "../duration"
	import { MoveRangeField } from "../range"
	import { MoveTimeField } from "../time"
	import { MoveTypeField } from "../type"

	let {
		saving = false,
		onsubmit,
	}: {
		saving?: boolean,
		onsubmit: () => void,
	} = $props()

	const disabled = $derived(saving)
	// name
	// type

		// power
		// time
		// pp
		// duration
		// range
		// shape
		// dice
		// attack
		// save
		// description
		// higher levels
		// table????
		// categories???

</script>

<Form {onsubmit} {saving}>
	<section style:margin-block-end="1em">
		<p>This feature is under active development. This is just a preview of what is to come!</p>
	</section>
	<Fieldset title={m.basicInfo()} columns={2}>
		<TextField label="Name" value="" {disabled} required/>
		<MoveTypeField value="bug" {disabled} />
		<IntField label="PP" value={10} />
		<MoveTimeField label="Time" value={{ unit: "action" }} />
		<MoveDurationField label="Duration" value={{ unit: "instantaneous", concentration: false }} />
		<MoveRangeField label="Range" value={{ type: "melee" }} />
	</Fieldset>
</Form>
