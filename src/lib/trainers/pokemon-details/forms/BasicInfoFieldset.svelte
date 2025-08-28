<script lang="ts">
	import {
		Fieldset,
		IntField,
		TextField,
		SelectField,
		ToggleSwitchField,
		type IntFieldChangeEvent,
		type ImageInputValue,
		ImageField,
	} from "$lib/design/forms"
	import { FeatureToggles } from "$lib/FeatureToggles"
	import { PokemonTeraType } from "$lib/pokemon/types-2"
	import { Natures, type Nature } from "$lib/trainers/nature"

	const FIVE_HUNDRED_KB = 524288

	export let nickname: string
	export let nature: Nature
	export let natureCustom: string
	export let tera: PokemonTeraType
	export let level: number
	export let ac: number
	export let maxHp: number
	export let maxHitDice: number
	export let isShiny: boolean
	export let originalAvatarSrc: string | undefined
	export let avatar: ImageInputValue | undefined
	export let isValid: boolean = true
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
</script>

{#if FeatureToggles.PokemonCustomImage()}
	<Fieldset title="Basic Info">
		<div class="grid">
			<div style:grid-area="field1"><TextField label="Nickname" bind:value={nickname} {disabled} /></div>
			<div style:grid-area="field2"><SelectField label="Nature" options={natureOptions} bind:value={nature} bind:other={natureCustom} {disabled} /></div>
			<div style:grid-area="field3"><SelectField label="Tera" options={teraOptions} bind:value={tera.data} {disabled} /></div>
			<IntField label="Level" value={level} on:change={onLevelChange} min={1} max={20} {disabled} />
			<IntField label="AC" bind:value={ac} min={0} max={99} {disabled} />
			<IntField label="Max HP" bind:value={maxHp} min={0} {disabled} />
			<IntField label="Max Hit Dice" bind:value={maxHitDice} min={0} max={20} {disabled} />
			<ToggleSwitchField label="Shiny" bind:value={isShiny} {disabled} />
			<div style:grid-area="avatar" class="image-field"><ImageField label="Custom Image" previousValue={originalAvatarSrc} bind:currentValue={avatar} maxbytes={FIVE_HUNDRED_KB} {disabled} bind:isValid /></div>
		</div>
	</Fieldset>
{:else}
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
{/if}

<style>
	.grid {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.image-field {
		padding-block-start: 1.5em;
		max-width: 10em;
		margin: auto;
	}

	@media screen and (min-width: 75rem) {
		.grid {
			display: grid;
			grid-template-columns: 1fr 11.25em;
			grid-auto-rows: 3.75em;
			grid-template-areas:
				"field1 avatar"
				"field2 avatar"
				"field3 avatar";
			gap: 0.75em;
		}

		.image-field {
			padding-block-start: 2.25em;
			margin: 0;
			max-width: none;
		}
	}
</style>