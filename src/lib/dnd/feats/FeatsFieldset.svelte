<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { Button } from "$lib/ui/elements"
	import { Fieldset, focusInputField } from "$lib/ui/forms"
	import type { ChosenFeat } from "./ChosenFeat"
	import type { Feat } from "./Feat"
	import FeatEditor from "./FeatEditor.svelte"

	export let values: ChosenFeat[]
	export let disabled: boolean
	export let feats: Feat[]

	$: options = feats.map((it) => ({
		name: it.name,
		value: it.name,
		placeholder: it.description,
		deprecated: it.removed ?? false,
	}))

	let newId = -1001
	const nextNewId = () => (--newId).toString()

	const removeFeat = (id: string) => () => {
		values = values.filter((it) => it.id !== id)
	}

	const addStandardFeat = () => {
		const nextId = nextNewId()
		values = [...values, {
			id: nextId,
			name: feats[0].name,
			description: "",
			isCustom: false,
		} ]
		focusInputField(`feat-name-${nextId}`)
	}

	const addCustomFeat = () => {
		const nextId = nextNewId()
		values = [...values, {
			id: nextId,
			name: "",
			description: "",
			isCustom: true,
		} ]
		focusInputField(`feat-name-${nextId}`)
	}
</script>

<Fieldset title="{m["universal.feats"]()}">
	{#each values as value}
		<FeatEditor {value} options={options} {disabled} custom={value.isCustom} on:remove={removeFeat(value.id)} />
	{/each}
	<div class="row">
		<Button on:click={addStandardFeat}>{m["universal.addFeat"]()}</Button>
		<Button on:click={addCustomFeat}>{m["universal.addCustomFeat"]()}</Button>
	</div>
</Fieldset>

<style>
	.row {
		display: flex;
		gap: 0.5em;
	} .row > :global(*) {
		flex: 1;
	}
</style>
