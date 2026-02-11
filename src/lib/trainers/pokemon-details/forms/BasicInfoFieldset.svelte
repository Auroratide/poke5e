<script lang="ts">
	import {
		Fieldset,
		ImageField,
		IntField,
		SelectField,
		TextField,
		ToggleSwitchField,
		type ImageInputValue,
		type IntFieldChangeEvent,
	} from "$lib/ui/forms"
	import { Nature, NatureField } from "$lib/pokemon/nature"
	import { PokemonTeraType } from "$lib/pokemon/types"
	import { m } from "$lib/site/i18n"

	const FIVE_HUNDRED_KB = 524288

	export let nickname: string
	export let nature: Nature
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

	const teraOptions = PokemonTeraType.list.map((it) => ({
		name: it,
		value: it,
	}))
</script>

<Fieldset title="{m["universal.basicInfo"]()}">
	<div class="grid">
		<div style:grid-area="field1"><TextField label="{m["universal.nickname"]()}" bind:value={nickname} {disabled} /></div>
		<div style:grid-area="field2"><SelectField label="{m["universal.tera"]()}" options={teraOptions} bind:value={tera.data} {disabled} /></div>
		<div style:grid-area="field3"><NatureField bind:value={nature} {disabled} /></div>
		<IntField label="{m["universal.level"]()}" value={level} on:change={onLevelChange} min={1} max={20} {disabled} />
		<IntField label="{m["universal.ac"]()}" bind:value={ac} min={0} max={99} {disabled} />
		<IntField label="{m["universal.maxHp"]()}" bind:value={maxHp} min={0} {disabled} />
		<IntField label="{m["universal.maxHitDice"]()}" bind:value={maxHitDice} min={0} max={20} {disabled} />
		<ToggleSwitchField label="{m["universal.shiny"]()}" bind:value={isShiny} {disabled} />
		<div style:grid-area="avatar" class="image-field"><ImageField label="{m["universal.customImage"]()}" previousValue={originalAvatarSrc} bind:currentValue={avatar} maxbytes={FIVE_HUNDRED_KB} {disabled} bind:isValid /></div>
	</div>
</Fieldset>

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
			grid-template-rows: 3.75em 3.75em 5em;
			grid-auto-rows: 3.75em;
			grid-template-areas:
				"field1 avatar"
				"field2 avatar"
				"field3 avatar";
			gap: 0.75em;
		}

		.image-field {
			padding-block-start: 1.25em;
			margin: 0;
			max-width: none;
		}
	}
</style>