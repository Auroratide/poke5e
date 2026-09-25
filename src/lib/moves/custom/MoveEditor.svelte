<script lang="ts">
	import { m } from "$lib/site/i18n"
	import {
		Form,
		Fieldset,
		TextField,
	} from "$lib/ui/forms"
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
	<Fieldset title={m.basicInfo()} columns={2}>
		<TextField label="Name" value="" {disabled} required/>
		<MoveTypeField value="bug" {disabled} />
		
	</Fieldset>
</Form>
