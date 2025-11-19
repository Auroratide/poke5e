<script lang="ts" generics='T extends EvolutionConditionType["value"]'>
	import { SingleCheckboxField, type CheckboxFieldChangeEvent } from "$lib/design/forms"
	import { slide } from "svelte/transition"
	import type { EvolutionConditionType, TypedEvolutionConditionType } from "../EvolutionCondition"

	export let id: string
	export let type: EvolutionConditionType["type"]
	export let label: string
	export let conditions: EvolutionConditionType[]
	export let defaultValue: T
	export let disabled = false

	$: condition = conditions.find((it) => it.type === type) as TypedEvolutionConditionType<T>
	$: hasCondition = condition != null

	const toggle = (e: CheckboxFieldChangeEvent) => {
		if (e.detail.checked) {
			const newCondition = {
				type: type,
				value: defaultValue,
			} as EvolutionConditionType
			conditions = [...conditions, newCondition]
		} else {
			conditions = conditions.filter((it) => it.type !== type)
		}
	}
</script>

<div class="condition-field">
	<div class="checkbox">
		<SingleCheckboxField
			label="{label}"
			name="{id}-requires-{type}"
			checked={hasCondition}
			on:change={toggle}
			{disabled}
		/>
	</div>
	{#if hasCondition}
		<div class="details-container" transition:slide>
			<slot {condition}></slot>
		</div>
	{/if}
</div>

<style>
	.checkbox {
		margin-block-end: 0.5em;
	}
</style>