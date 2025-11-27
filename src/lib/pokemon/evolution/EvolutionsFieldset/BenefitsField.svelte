<script lang="ts" generics='T extends EvolutionBenefitType["value"]'>
	import type { EvolutionBenefitType, TypedEvolutionBenefitType } from "../EvolutionBenefit"
	import { SingleCheckboxField, type CheckboxFieldChangeEvent } from "$lib/ui/forms"
	import { slide } from "svelte/transition"

	export let id: string
	export let type: EvolutionBenefitType["type"]
	export let label: string
	export let benefits: EvolutionBenefitType[]
	export let defaultValue: T
	export let disabled = false

	$: benefit = benefits.find((it) => it.type === type) as TypedEvolutionBenefitType<T>
	$: hasBenefit = benefit != null

	const toggle = (e: CheckboxFieldChangeEvent) => {
		if (e.detail.checked) {
			const newBenefit = {
				type: type,
				value: defaultValue,
			} as EvolutionBenefitType
			benefits = [...benefits, newBenefit]
		} else {
			benefits = benefits.filter((it) => it.type !== type)
		}
	}
</script>

<div class="benefit-field">
	<div class="checkbox">
		<SingleCheckboxField
			label="{label}"
			name="{id}-confers-{type}"
			checked={hasBenefit}
			on:change={toggle}
			{disabled}
		/>
	</div>
	{#if hasBenefit}
		<div class="details-container" transition:slide={{ duration: 200 }}>
			<slot {benefit}></slot>
		</div>
	{/if}
</div>

<style>
	.benefit-field {
		background: oklch(0 0 0 / 0.025);
		padding: 0.5em;
	}

	.checkbox {
		margin-block-end: 0.5em;
	}
</style>
