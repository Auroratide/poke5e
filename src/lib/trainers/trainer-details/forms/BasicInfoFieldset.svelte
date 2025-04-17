<script lang="ts">
	import { Fieldset, IntField, TextField, type IntFieldChangeEvent } from "$lib/design/forms"

	export let name: string
	export let level: number
	export let ac: number
	export let maxHp: number
	export let maxHitDice: number
	export let disabled: boolean = false

	// keep level and maxHitDice in sync unless they were different
	const onLevelChange = (e: IntFieldChangeEvent) => {
		if (level === maxHitDice) {
			maxHitDice = e.detail.value
		}
		level = e.detail.value
	}
</script>

<Fieldset title="Basic Info">
	<TextField label="Name" bind:value={name} {disabled} />
	<IntField label="Level" value={level} on:change={onLevelChange} min={1} max={20} {disabled} />
	<IntField label="AC" bind:value={ac} min={0} max={99} {disabled} />
	<IntField label="Max HP" bind:value={maxHp} min={0} {disabled} />
	<IntField label="Max Hit Dice" bind:value={maxHitDice} min={0} max={20} {disabled} />
</Fieldset>
