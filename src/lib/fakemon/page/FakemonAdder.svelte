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
		InstructionText,
		TextField,
		type ImageInputValue,
	} from "$lib/ui/forms"
	import SimpleTypeField from "$lib/pokemon/types/SimpleTypeField.svelte"
	import { createEventDispatcher } from "svelte"
	import { Fakemon } from "../Fakemon"
	import { m } from "$lib/site/i18n"
	import { PokemonSpecies, SpeciesField, type SpeciesFieldChangeEvent } from "$lib/poke5e/species";
	import type { Readable } from "svelte/store";

	const dispatch = createEventDispatcher()

	export let fakemon: Fakemon
	export let allSpecies: Readable<PokemonSpecies[]>
	export let saving = false
	$: disabled = saving
	$: templateSpecies = fakemon.species

	let species = fakemon.species

	let speciesName = species.data.name
	let type = species.type.copy()

	const cancel = () => {
		dispatch("cancel")
	}

	const endEdit = () => {
		dispatch("submit", {
			fakemon: fakemon.copy({
				species: templateSpecies.copy({
					name: speciesName,
					type: type.data,
					media: {
						values: {
							normalPortrait: undefined,
							normalSprite: undefined,
							shinyPortrait: undefined,
							shinySprite: undefined,
						},
						customization: {
							shinyHue: 0,
						},
						attribution: {
							portrait: {
								type: "",
								name: "",
								href: "",
							},
							sprite: {
								type: "",
								name: "",
								href: "",
							},
						},
					},
					habitat: {
						biomes: [],
					},
				}).data,
			}),
		})
	}

	const onSpeciesSelect = (e: SpeciesFieldChangeEvent) => {
		templateSpecies = e.detail.species ?? fakemon.species
	}
</script>

<Form onsubmit={endEdit} {saving}>
	<Fieldset title="{m.initialInfo()}">
		<TextField label="{m.speciesName()}" bind:value={speciesName} {disabled} required />
		<SimpleTypeField bind:value={type.data} {disabled} />
	</Fieldset>
	<Fieldset title="{m["fakemon.templateSpecies"]()}">
		<InstructionText>{m["fakemon.templateSpeciesInstructions"]()}</InstructionText>
		<SpeciesField label="Species" value="" name="species" allSpecies={$allSpecies} {disabled} on:change={onSpeciesSelect} />
	</Fieldset>
	<HintText>{m["fakemon.addFakemonHintText"]()}</HintText>
	<ActionArea>
		<Button on:click={cancel} variant="ghost" {disabled}>{m.cancel()}</Button>
		<Button type="submit" {disabled}>{m.finish()}</Button>
	</ActionArea>
</Form>
