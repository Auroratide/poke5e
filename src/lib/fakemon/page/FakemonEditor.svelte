<script lang="ts" context="module">
	export type SubmitDetail = {
		fakemon: Fakemon,
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { Fakemon } from "../Fakemon"
	import { ActionArea, Fieldset, Form, IntField, SelectField, TextField } from "$lib/design/forms"
	import { TypeField } from "$lib/pokemon/types-2"
	import { SpeedsFieldset } from "$lib/dnd/movement"
	import { SensesFieldset } from "$lib/dnd/senses"
	import { CreatureSizes } from "$lib/dnd/CreatureSize"
	import { capitalize } from "$lib/string"
	import { HitDice } from "$lib/dnd/hit-dice"
	import { AttributesFieldset, SavingThrowsFieldset } from "$lib/dnd/attributes"
	import { ProficienciesFieldset } from "$lib/dnd/skills"
	import Button from "$lib/design/Button.svelte"
	import { GenderRatioFieldset } from "$lib/creatures/gender"

	const dispatch = createEventDispatcher()

	export let fakemon: Fakemon
	export let saving = false
	$: disabled = saving

	let speciesName = fakemon.data.speciesName
	let type = fakemon.type.copy()
	let minLevel = fakemon.data.minLevel
	let ac = fakemon.data.ac
	let hp = fakemon.data.hp
	let hitDice = fakemon.hitDice.data
	let size = fakemon.data.size
	let speeds = fakemon.speed.copy()
	let senses = fakemon.senses.copy()
	let attributes = fakemon.attributes.copy()
	let proficiencies = fakemon.skills.copy()
	let savingThrows = fakemon.data.saves
	let gender = fakemon.gender.copy()

	const cancel = () => {
		dispatch("cancel")
	}

	const endEdit = () => {
		dispatch("submit", {
			fakemon: fakemon.copy({
				speciesName,
				type: type.data,
				minLevel,
				ac,
				hp,
				hitDice,
				size,
				speed: speeds.data,
				senses: senses.data,
				attributes: attributes.data,
				skills: proficiencies.data,
				saves: savingThrows,
				gender: gender.data,
			}),
		})
	}

	const sizeOptions = Object.values(CreatureSizes).map((it) => ({
		name: capitalize(it),
		value: it,
	}))

	const hitDiceOptions = HitDice.list.map((it) => ({
		name: it,
		value: it,
	}))
</script>

<Form onsubmit={endEdit} {saving}>
	<Fieldset title="Basic Info" columns={2}>
		<TextField label="Species Name" bind:value={speciesName} {disabled} required />
		<!-- <SelectField label="Tera" options={teraOptions} bind:value={tera.data} {disabled} /> -->
		<IntField label="Min Level" bind:value={minLevel} min={1} max={20} {disabled} />
		<IntField label="AC" bind:value={ac} min={0} max={99} {disabled} />
		<IntField label="HP" bind:value={hp} min={0} {disabled} />
		<SelectField label="Hit Dice" options={hitDiceOptions} bind:value={hitDice} {disabled} />
		<SelectField label="Size" options={sizeOptions} bind:value={size} {disabled} />
	</Fieldset>
	<GenderRatioFieldset bind:value={gender} {disabled} />
	<TypeField bind:value={type.data} {disabled} />
	<SpeedsFieldset bind:values={speeds} {disabled} />
	<SensesFieldset bind:values={senses} {disabled} />
	<AttributesFieldset bind:values={attributes} {disabled} />
	<ProficienciesFieldset bind:values={proficiencies} {disabled} />
	<SavingThrowsFieldset bind:values={savingThrows} {disabled} />
	<ActionArea>
		<Button on:click={cancel} variant="ghost" {disabled}>Cancel</Button>
		<Button type="submit" {disabled}>Finish!</Button>
	</ActionArea>
</Form>

<!-- TODOS
* Handle SR correctly
* No expertise on proficiencies here
-->

