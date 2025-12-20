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
	import SimpleTypeField from "$lib/pokemon/types-2/SimpleTypeField.svelte"
	import { createEventDispatcher } from "svelte"
	import { Fakemon } from "../Fakemon"

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
	<Fieldset title="Initial Info">
		<TextField label="Species Name" bind:value={speciesName} {disabled} required />
		<SimpleTypeField bind:value={type.data} {disabled} />
	</Fieldset>
	<HintText>Once your fakémon is created, you will be able to edit their stats, images, and details!</HintText>
	<ActionArea>
		<Button on:click={cancel} variant="ghost" {disabled}>Cancel</Button>
		<Button type="submit" {disabled}>Finish!</Button>
	</ActionArea>
</Form>
