<script lang="ts">
	import {
		Fieldset,
		IntField,
		TextField,
		SelectField,
		ToggleSwitchField,
		type IntFieldChangeEvent,
	} from "$lib/design/forms"
	import { PokemonTeraType } from "$lib/pokemon/types-2"
	import { Natures, type Nature } from "$lib/trainers/nature"

	export let nickname: string
	export let nature: Nature
	export let natureCustom: string
	export let tera: PokemonTeraType
	export let level: number
	export let ac: number
	export let maxHp: number
	export let maxHitDice: number
	export let isShiny: boolean
	export let disabled: boolean = false

	// keep level and maxHitDice in sync unless they were different
	const onLevelChange = (e: IntFieldChangeEvent) => {
		if (level === maxHitDice) {
			maxHitDice = e.detail.value
		}
		level = e.detail.value
	}

	const natureOptions = Natures.map((it) => ({
		name: it,
		value: it,
	}))

	const teraOptions = PokemonTeraType.list.map((it) => ({
		name: it,
		value: it,
	}))

	$: console.log(tera.data)
</script>

<Fieldset title="Basic Info" columns={2}>
	<TextField label="Nickname" bind:value={nickname} {disabled} />
	<SelectField label="Nature" options={natureOptions} bind:value={nature} bind:other={natureCustom} {disabled} />
	<SelectField label="Tera" options={teraOptions} bind:value={tera.data} {disabled} />
	<IntField label="Level" value={level} on:change={onLevelChange} min={1} max={20} {disabled} />
	<IntField label="AC" bind:value={ac} min={0} max={99} {disabled} />
	<IntField label="Max HP" bind:value={maxHp} min={0} {disabled} />
	<IntField label="Max Hit Dice" bind:value={maxHitDice} min={0} max={20} {disabled} />
	<ToggleSwitchField label="Shiny" bind:value={isShiny} {disabled} />
</Fieldset>