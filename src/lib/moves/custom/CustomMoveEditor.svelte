<script lang="ts">
	import { m } from "$lib/site/i18n"
	import {
		Form,
		Fieldset,
		TextField,
		IntField,
		MarkdownField,
	} from "$lib/ui/forms"
	import MoveAttackFieldset from "../MoveAttackFieldset.svelte"
	import MoveHigherLevelsField from "../MoveHigherLevelsField.svelte"
	import MovePowerFieldset from "../MovePowerFieldset.svelte"
	import MoveSaveFieldset from "../MoveSaveFieldset.svelte"
	import { MoveDiceFieldset, type MoveDice } from "../dice"
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

	let dice = $state<MoveDice | undefined>(undefined)
	let higherLevels = $state<string | undefined>(undefined)

		// CHECKLIST:
		// DONE name
		// DONE type
		// DONE power
		// DONE time
		// DONE pp
		// DONE duration
		// DONE range
		// shape
		// DONE dice
		// DONE attack
		// DONE save
		// DONE description
		// DONE higher levels
	
		// NOT NOW
		// table
		// categories
</script>

<Form {onsubmit} {saving}>
	<section style:margin-block-end="1em">
		<p>This feature is under active development. This is just a preview of what is to come!</p>
	</section>
	<Fieldset title={m.basicInfo()} columns={2}>
		<TextField label={m.name()} value="" {disabled} required />
		<MoveTypeField value="bug" {disabled} />
		<IntField label={m.pp()} value={10} />
		<MoveTimeField value={{ unit: "action" }} />
		<div class="col-span">
			<MoveDurationField value={{ unit: "instantaneous", concentration: false }} />
		</div>
		<div class="col-span">
			<MoveRangeField value={{ type: "melee" }} />
		</div>
	</Fieldset>
	<MovePowerFieldset value={[ "str", "dex" ]} {disabled} />
	<MoveDiceFieldset bind:value={dice} {disabled} />
	<MoveAttackFieldset value={undefined} {disabled} />
	<MoveSaveFieldset value={undefined} {disabled} />
	<Fieldset title={m.description()}>
		<MarkdownField label={m.description()} value="describe" placeholder="Describe what the move does" {disabled} />
		<MoveHigherLevelsField bind:value={higherLevels} {dice} {disabled} />
	</Fieldset>
</Form>

<style>
	.col-span {
		grid-column: span 2;
	}
</style>