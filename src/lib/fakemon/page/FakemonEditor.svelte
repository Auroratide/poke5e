<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import Card from "$lib/design/Card.svelte"
	import Title from "$lib/design/Title.svelte"
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

	const dispatch = createEventDispatcher()

	let saving = false
	let disabled = false

	let fakemon: Fakemon = new Fakemon({
		id: "1232343424",
		readKey: "29384902384",
		speciesName: "Belseraph",
		type: ["fairy", "flying"],
		size: "small",
		sr: 14,
		minLevel: 15,
		eggGroups: ["undiscovered"],
		gender: "1:0",
		description: "The Angel Pokémon. One kind of Ultra Beast. Belseraph's song is thought to gradually \"shift\" people into the afterlife if they listen for too long.",
		ac: 18,
		hp: 98,
		hitDice: "d10",
		speed: {
			flying: 30,
		},
		senses: {},
		attributes: {
			str: 12,
			dex: 16,
			con: 11,
			int: 14,
			wis: 20,
			cha: 20,
		},
		skills: {
			"athletics": 0,
			"acrobatics": 0,
			"sleight of hand": 0,
			"stealth": 0,
			"arcana": 0,
			"history": 0,
			"investigation": 0,
			"nature": 0,
			"religion": 1,
			"animal handling": 0,
			"insight": 0,
			"medicine": 0,
			"perception": 0,
			"survival": 0,
			"deception": 0,
			"intimidation": 0,
			"performance": 0,
			"persuasion": 1,
		},
		saves: ["dex", "cha"],
		abilities: [],
		moves: {
			start: [
				"halo-song",
				"mystical-fire",
				"fairy-wind",
				"air-cutter",
				"defog",
				"safeguard",
				"captivate",
				"sing",
			],
			level18: [
				"endeavor",
				"perish-song",
				"hurricane",
			],
		},
	})

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

	const cancel = () => {
		dispatch("cancel")
	}

	const endEdit = () => {}

	const sizeOptions = Object.values(CreatureSizes).map((it) => ({
		name: capitalize(it),
		value: it,
	}))

	const hitDiceOptions = HitDice.list.map((it) => ({
		name: it,
		value: it,
	}))
</script>

<Title value="" />
<Card title="{fakemon.data.speciesName}">
	<Form onsubmit={endEdit} {saving}>
		<Fieldset title="Basic Info" columns={2}>
			<TextField label="Species Name" bind:value={speciesName} {disabled} />
			<!-- <SelectField label="Tera" options={teraOptions} bind:value={tera.data} {disabled} /> -->
			<IntField label="Min Level" bind:value={minLevel} min={1} max={20} {disabled} />
			<IntField label="AC" bind:value={ac} min={0} max={99} {disabled} />
			<IntField label="HP" bind:value={hp} min={0} {disabled} />
			<SelectField label="Hit Dice" options={hitDiceOptions} bind:value={hitDice} {disabled} />
			<SelectField label="Size" options={sizeOptions} bind:value={size} {disabled} />
		</Fieldset>
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
</Card>

<!-- TODOS
* Handle SR correctly
* No expertise on proficiencies here
-->

