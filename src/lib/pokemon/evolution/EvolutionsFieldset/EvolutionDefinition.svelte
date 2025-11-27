<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import type { Evolution } from "../Evolution"
	import {
		TextField,
		IntField,
		FormGroup,
		TextareaField,
		SelectField,
	} from "$lib/ui/forms"
	import ConditionField from "./ConditionField.svelte"
	import { PokemonGender } from "$lib/creatures/gender"
	import { TimesOfDay, type TypedEvolutionConditionType } from "../EvolutionCondition"
	import { capitalize } from "$lib/string"
	import { PokemonSpecies, SpeciesField, SpeciesIdentifier, type SpeciesFieldChangeEvent } from "$lib/creatures/species"
	import Button from "$lib/design/Button.svelte"
	import { fakemonStore } from "$lib/fakemon/store"
	import BenefitsField from "./BenefitsField.svelte"
	import type { TypedEvolutionBenefitType } from "../EvolutionBenefit"
	import { MoveField } from "$lib/moves"
	import { moves } from "$lib/moves/store"

	const dispatch = createEventDispatcher()

	export let id: string
	export let species: SpeciesIdentifier
	export let value: Evolution
	export let allSpecies: PokemonSpecies[]
	export let direction: "from" | "to"
	export let disabled = false

	const isSpeciesDisabled = (proposedSpecies: PokemonSpecies) => {
		if (proposedSpecies.id.data === species.data) {
			return "Fakémon cannot evolve into themselves."
		}

		if (proposedSpecies.id.isFakemon()) {
			const writeKey = fakemonStore.getWriteKey(proposedSpecies.id.toFakemonReadKey())
			if (writeKey == null) {
				return "Must own the fakemon to evolve to/from it."
			}
		}

		return false
	}

	const onSpeciesChange = (e: SpeciesFieldChangeEvent) => {
		value.data[direction] = e.detail.species.id.data
	}

	const onRemove = () => dispatch("remove")

	const updateCondition = <T extends string | number>(condition: TypedEvolutionConditionType<T>) => (e: CustomEvent<{ value: T}>) => {
		condition.value = e.detail.value
	}

	const updateBenefit = <T extends string | number>(benefit: TypedEvolutionBenefitType<T>) => (e: CustomEvent<{ value: T}>) => {
		benefit.value = e.detail.value
	}
</script>

<div class="evolution-definition">
	<FormGroup>
		<SpeciesField label="Evolves {capitalize(direction)}..." value={value.data[direction]} name="{id}" {allSpecies} {isSpeciesDisabled} on:change={onSpeciesChange} />
		<p class="title">Conditions</p>
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
				<IntField label="Required Level" name="{id}-level" value={condition.value} min={1} max={20} on:change={updateCondition(condition)} {disabled} required />
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
				<TextField label="Required Item" name="{id}-item" value={condition.value} on:change={updateCondition(condition)} {disabled} required />
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
				<IntField label="Required Bond Level" name="{id}-loyalty" value={condition.value} min={-3} max={3} on:change={updateCondition(condition)} {disabled} required />
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
				<MoveField label="Required Move" name="{id}-move" value={condition.value} {disabled} moves={$moves} on:change={(e) => condition.value = e.detail.move.id} />
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
					<TextareaField label="Custom Condition" name="{id}-special" value={condition.value} placeholder="after fainting from recoil damage" on:change={updateCondition(condition)} {disabled} required />
				</ConditionField>
			</div>
		</div>
		<p class="title">Benefits</p>
			<div class="columns">
				<div class="span">
					<BenefitsField
						{id}
						type="asi"
						label="Grants ASI?"
						bind:benefits={value.data.effects}
						defaultValue={8}
						let:benefit
						{disabled}
					>
						<IntField label="ASI Granted" name="{id}-asi" value={benefit.value} min={0} on:change={updateBenefit(benefit)} {disabled} required />
					</BenefitsField>
				</div>
				<div class="span">
					<BenefitsField
						{id}
						type="special"
						label="Grants Custom Benefit?"
						bind:benefits={value.data.effects}
						defaultValue=""
						let:benefit
						{disabled}
					>
						<TextareaField label="Custom Benefit" name="{id}-special-benefit" value={benefit.value} placeholder="the pokemon gains a new skill proficiency" on:change={updateBenefit(benefit)} {disabled} required />
					</BenefitsField>
				</div>
			</div>
		<p class="title">Actions</p>
		<Button variant="danger" width="full" on:click={onRemove}>Remove Evolution</Button>
	</FormGroup>
</div>

<style>
	.evolution-definition {
		margin-block-end: 1.5em;
	}

	.title {
		background: var(--skin-bg);
		color: var(--skin-bg-text);
		margin-inline-start: -1em;
		margin-block: 1.5em 0.5em;
		display: inline-block;
		padding: 0.125em 1em;
		clip-path: polygon(0 0, 100% 0, calc(100% - 0.667em) 100%, 0 100%);
		font-size: var(--font-sz-venus);
	}

	.columns {
		display: grid;
		gap: 0.5em;
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