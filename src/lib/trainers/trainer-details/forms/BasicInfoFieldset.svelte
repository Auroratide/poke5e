<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { Fieldset, IntField, TextField, type IntFieldChangeEvent } from "$lib/ui/forms"

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

<Fieldset title="{m.basicInfo()}" columns={2}>
	<TextField label={m.name()} bind:value={name} {disabled} />
	<IntField label={m.level()} value={level} on:change={onLevelChange} min={1} max={20} {disabled} />
	<IntField label={m.ac()} bind:value={ac} min={0} max={99} {disabled} />
	<IntField label={m.maxHp()} bind:value={maxHp} min={0} {disabled} />
	<IntField label={m.maxHitDice()} bind:value={maxHitDice} min={0} max={20} {disabled} />
</Fieldset>
