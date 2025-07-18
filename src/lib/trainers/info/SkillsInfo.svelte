<script lang="ts">
	import { Attributes, type Attribute } from "$lib/dnd/attributes"
	import { skillList } from "$lib/dnd/proficiency"
	import ProficiencyBlock from "$lib/dnd/ProficiencyBlock.svelte"
	import { isExpert, isProficient, type SkillRanks } from "$lib/dnd/types"
	import type { PokeType } from "$lib/pokemon/types"
	import { skillModifiersFromSpecializations, type Specializations } from "../specializations"

	export let level: number
	export let attributes: Attributes
	export let savingThrows: Attribute[]
	export let proficiencies: SkillRanks

	export let type: PokeType[] | undefined = undefined
	export let specializations: Specializations | undefined = undefined

	$: extraModifiers = type != null && specializations != null ? skillModifiersFromSpecializations(specializations, type) : undefined
</script>

<h3>Saves</h3>
<div class="upper">
	<ProficiencyBlock {level} {attributes} values={Attributes.list.map((attr) => ({
		name: attr.abbr,
		attr: attr.abbr,
		proficient: savingThrows.includes(attr.abbr),
		expert: false,
	}))} columnsLg={3} columns={2} />
</div>

<h3>Skills</h3>
<div class="cap">
	<ProficiencyBlock {level} {attributes} values={skillList.map((skill) => ({
		name: skill.name,
		attr: skill.attribute,
		proficient: isProficient(proficiencies, skill.name),
		expert: isExpert(proficiencies, skill.name),
		extraModifiers: extraModifiers,
	}))} columnsLg={2} columns={1} />
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