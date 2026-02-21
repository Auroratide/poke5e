<script lang="ts" context="module">
	export type SubmitDetail = {
		fakemon: Fakemon,
		newMedia: SpeciesMedia<ImageInputValue>,
	}
</script>

<script lang="ts">
	import { SpeciesMedia } from "$lib/poke5e/species/media"
	import { Button } from "$lib/ui/elements"
	import {
		ActionArea,
		Fieldset,
		Form,
		HintText,
		TextField,
		type ImageInputValue,
	} from "$lib/ui/forms"
	import SimpleTypeField from "$lib/pokemon/types/SimpleTypeField.svelte"
	import { createEventDispatcher } from "svelte"
	import { Fakemon } from "../Fakemon"
	import { m } from "$lib/site/i18n"

	const dispatch = createEventDispatcher()

	export let fakemon: Fakemon
	export let saving = false
	$: disabled = saving

	let species = fakemon.species

	let speciesName = species.data.name
	let type = species.type.copy()

	const cancel = () => {
		dispatch("cancel")
	}

	const endEdit = () => {
		dispatch("submit", {
			fakemon: fakemon.copy({
				species: fakemon.species.copy({
					name: speciesName,
					type: type.data,
				}).data,
			}),
		})
	}
</script>

<Form onsubmit={endEdit} {saving}>
	<Fieldset title="{m.initialInfo()}">
		<TextField label="{m.speciesName()}" bind:value={speciesName} {disabled} required />
		<SimpleTypeField bind:value={type.data} {disabled} />
	</Fieldset>
	<HintText>{m["fakemon.addFakemonHintText"]()}</HintText>
	<ActionArea>
		<Button on:click={cancel} variant="ghost" {disabled}>{m.cancel()}</Button>
		<Button type="submit" {disabled}>{m.finish()}</Button>
	</ActionArea>
</Form>
