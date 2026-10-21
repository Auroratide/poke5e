<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { SelectField, TextField } from "$lib/ui/forms"
	import { slide } from "svelte/transition"
	import { DiceClass, type DiceTiers } from "./DiceClass"
	import type { MoveDice } from "./MoveDice"

	type Value = Pick<MoveDice, "class" | "tiers">

	let {
		value = $bindable(),
		label = "Dice",
		name = "move-dice",
		disabled = false,
	}: {
		value: Value,
		label?: string,
		name?: string,
		disabled?: boolean,
	} = $props()

	const CUSTOM_OPTION = "custom"
	const TIER_LEVELS = [1, 5, 10, 17] as const

	const options = [
		...DiceClass.list().map((it) => ({
			value: it,
			name: `${it} BP (${DiceClass.getTier(it).join(", ")})`,
		})),
		{ value: CUSTOM_OPTION, name: m.custom() },
	]

	const setTier = (index: number, roll: string) => {
		const tiers = [...value.tiers] as string[]
		tiers[index] = roll
		value = { class: CUSTOM_OPTION, tiers: tiers as unknown as DiceTiers }
	}
</script>

<SelectField bind:value={
	() => value.class,
	(v) => value = v === CUSTOM_OPTION
		? { class: CUSTOM_OPTION, tiers: value.tiers }
		: { class: v as DiceClass, tiers: DiceClass.getTier(v as DiceClass) }
} {options} {label} {name} {disabled} />
{#if value.class === CUSTOM_OPTION}
	<div class="tiers" transition:slide={{ duration: 150 }}>
		{#each TIER_LEVELS as level, i}
			{@const roll = value.tiers[i]}
			<TextField
				label="{m.level()} {level}"
				name="{name}-level-{level}"
				bind:value={() => roll, (v) => setTier(i, v)}
				placeholder="1d6"
				customError={DiceClass.isDiceRoll(roll) ? undefined : "Must be dice, like 2d6"}
				required
				{disabled}
			/>
		{/each}
	</div>
{/if}

<style>
	.tiers {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.5em;
	}
</style>
