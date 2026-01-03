<script lang="ts">
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
		disabled: it.removed ?? false,
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

	/**
	 * This function exists because Skill Expert was previously named Skill Master on accident.
	 * For backward compatibilitiy, we will allow it to exist but not be selectable.
	 * In the future, a migration will be run to rename all "Skill Master" values in the DB
	 * to the corrected version. We MUST do this compatibility step first to ensure the
	 * transition is smooth.
	 */
	function removeDisabledFeatsIfNotCurrent(opts: typeof options, chosenFeat: ChosenFeat): typeof options {
		return opts.filter((it) => !it.disabled || chosenFeat.name === it.name)
	}
</script>

<Fieldset title="Feats">
	{#each values as value}
		<FeatEditor {value} options={removeDisabledFeatsIfNotCurrent(options, value)} {disabled} custom={value.isCustom} on:remove={removeFeat(value.id)} />
	{/each}
	<div class="row">
		<Button on:click={addStandardFeat}>Add Feat</Button>
		<Button on:click={addCustomFeat}>Add Custom Feat</Button>
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
