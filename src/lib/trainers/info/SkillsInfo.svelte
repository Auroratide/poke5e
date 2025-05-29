<script lang="ts">
	import { attributeList } from "$lib/dnd/attributes"
	import { skillList } from "$lib/dnd/proficiency"
	import ProficiencyBlock from "$lib/dnd/ProficiencyBlock.svelte"
	import type { Attribute, Attributes, Skill } from "$lib/dnd/types"
	import type { PokeType } from "$lib/pokemon/types"
	import { skillModifiersFromSpecializations, type Specializations } from "../specializations"

	export let level: number
	export let attributes: Attributes
	export let savingThrows: Attribute[]
	export let proficiencies: Skill[]

	export let type: PokeType[] | undefined = undefined
	export let specializations: Specializations | undefined = undefined

	$: extraModifiers = type != null && specializations != null ? skillModifiersFromSpecializations(specializations, type) : undefined
</script>

<h3>Saves</h3>
<div class="upper">
	<ProficiencyBlock {level} {attributes} values={attributeList.map((attr) => ({
		name: attr.abbr,
		attr: attr.abbr,
		proficient: savingThrows.includes(attr.abbr),
	}))} columns={3} />
</div>

<h3>Skills</h3>
<div class="cap">
	<ProficiencyBlock {level} {attributes} values={skillList.map((skill) => ({
		name: skill.name,
		attr: skill.attribute,
		proficient: proficiencies.includes(skill.name),
		extraModifiers: extraModifiers,
	}))} columns={2} />
</div>
{#if extraModifiers?.athletics > 0}
	<p class="footnote"><small>+{extraModifiers.athletics} from trainer specialization included</small></p>
{/if}

<style>
	.footnote {
		margin-block-start: -1em;
		padding-inline-start: 0.5em;
		font-style: italic;
	}
</style>