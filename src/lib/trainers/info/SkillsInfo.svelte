<script lang="ts">
	import FlatDl from "$lib/design/FlatDl.svelte"
	import { proficiencyBonus, proficiencyModifier } from "$lib/dnd/proficiency"
	import { modifierForScore } from "$lib/dnd/attributes"
	import type { Attribute, Attributes, Skill } from "$lib/dnd/types"

	export let level: number
	export let attributes: Attributes
	export let savingThrows: Attribute[]
	export let proficiencies: Skill[]

	$: pb = proficiencyBonus(level)
</script>

<FlatDl columns={2}>
	<dt>Saves</dt>
	<div class="upper">
		{#each savingThrows as savingThrow}
			<dd>{savingThrow} +{modifierForScore(attributes[savingThrow]) + pb}</dd>
		{/each}
	</div>
	<dt>Proficiencies</dt>
	<div class="cap">
		{#each proficiencies as proficiency}
			<dd>{proficiency} +{proficiencyModifier(proficiency, attributes, pb)}</dd>
		{/each}
	</div>
</FlatDl>
