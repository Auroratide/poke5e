<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import type { Evolution } from "../Evolution"
	import {
		TextField,
		IntField,
		FormGroup,
		TextareaField,
	} from "$lib/design/forms"
	import ConditionField from "./ConditionField.svelte"
	import { PokemonGender } from "$lib/creatures/gender"
	import SelectField from "$lib/design/forms/SelectField.svelte"
	import { TimesOfDay, type TypedEvolutionConditionType } from "../EvolutionCondition"
	import { capitalize } from "$lib/string"
	import { PokemonSpecies, SpeciesField } from "$lib/creatures/species"
	import Button from "$lib/design/Button.svelte"
	import { fakemonStore } from "$lib/fakemon/store"
	import type { SpeciesFieldChangeEvent } from "$lib/creatures/species/SpeciesField.svelte"

	const dispatch = createEventDispatcher()

	export let id: string
	export let value: Evolution
	export let allSpecies: PokemonSpecies[]
	export let disabled = false

	const isSpeciesDisabled = (species: PokemonSpecies) => {
		if (species.id.isFakemon()) {
			const writeKey = fakemonStore.getWriteKey(species.id.toFakemonReadKey())
			if (writeKey == null) {
				return "Must own the fakemon to evolve to/from it."
			}
		}

		return false
	}

	const onSpeciesChange = (e: SpeciesFieldChangeEvent) => {
		value.data.to = e.detail.species.id.data
	}

	const onRemove = () => dispatch("remove")

	const updateCondition = <T extends string | number>(condition: TypedEvolutionConditionType<T>) => (e: CustomEvent<{ value: T}>) => {
		condition.value = e.detail.value
	}
</script>

<div>
	<SpeciesField label="Evolves To..." value={value.data.to} name="{id}" {allSpecies} {isSpeciesDisabled} on:change={onSpeciesChange} />
	<Button variant="danger" width="full" on:click={onRemove}>Remove Evolution</Button>
</div>

<FormGroup title="Conditions">
	<div class="columns">
		<ConditionField
			{id}
			type="level"
			label="Requires Level?"
			bind:conditions={value.data.conditions}
			defaultValue={8}
			let:condition
			{disabled}
		>
			<IntField label="Required Level" name="{id}-level" value={condition.value} min={1} max={20} on:change={updateCondition(condition)} {disabled} />
		</ConditionField>
		<ConditionField
			{id}
			type="item"
			label="Requires Item?"
			bind:conditions={value.data.conditions}
			defaultValue="Leaf Stone"
			let:condition
			{disabled}
		>
			<TextField label="Required Item" name="{id}-item" value={condition.value} on:change={updateCondition(condition)} {disabled} />
		</ConditionField>
		<ConditionField
			{id}
			type="loyalty"
			label="Requires Bond?"
			bind:conditions={value.data.conditions}
			defaultValue={2}
			let:condition
			{disabled}
		>
			<IntField label="Required Bond Level" name="{id}-loyalty" value={condition.value} min={-3} max={3} on:change={updateCondition(condition)} {disabled} />
		</ConditionField>
		<ConditionField
			{id}
			type="move"
			label="Requires Move?"
			bind:conditions={value.data.conditions}
			defaultValue="tackle"
			let:condition
			{disabled}
		>
			<TextField label="Required Move" name="{id}-move" value={condition.value} on:change={updateCondition(condition)} {disabled} />
		</ConditionField>
		<ConditionField
			{id}
			type="gender"
			label="Requires Gender?"
			bind:conditions={value.data.conditions}
			defaultValue={PokemonGender.Female}
			let:condition
			{disabled}
		>
			<SelectField label="Required Gender" name="{id}-gender" value={condition.value} options={Object.values(PokemonGender).map((it) => ({
				name: capitalize(it),
				value: it,
			}))} on:change={updateCondition(condition)} {disabled} />
		</ConditionField>
		<ConditionField
			{id}
			type="time"
			label="Requires Time of Day?"
			bind:conditions={value.data.conditions}
			defaultValue="day"
			let:condition
			{disabled}
		>
			<SelectField label="Time of Day" name="{id}-time" value={condition.value} options={TimesOfDay.map((it) => ({
				name: capitalize(it),
				value: it,
			}))} on:change={updateCondition(condition)} {disabled} />
		</ConditionField>
		<div class="span">
			<ConditionField
				{id}
				type="special"
				label="Custom Condition?"
				bind:conditions={value.data.conditions}
				defaultValue=""
				let:condition
				{disabled}
			>
				<TextareaField label="Custom Condition" name="{id}-special" value={condition.value} placeholder="after fainting from recoil damage" on:change={updateCondition(condition)} {disabled} />
			</ConditionField>
		</div>
	</div>
</FormGroup>

<style>
	.columns {
		display: grid;
		gap: 1.5em 0.75em;
	}

	@media screen and (min-width: 75rem) {
		.columns {
			grid-template-columns: 1fr 1fr;
		}

		.span {
			grid-column: span 2;
		}
	}
</style>