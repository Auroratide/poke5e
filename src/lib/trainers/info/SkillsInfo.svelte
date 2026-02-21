<script lang="ts">
	import { Attributes, type Attribute } from "$lib/dnd/attributes"
	import type { Level } from "$lib/dnd/level"
	import { ProficiencyBlock, SkillRanks } from "$lib/dnd/skills"
	import type { PokemonType } from "$lib/pokemon/types"
	import { m } from "$lib/site/i18n"
	import { skillModifiersFromSpecializations, type Specializations } from "../specializations"

	export let level: Level
	export let attributes: Attributes
	export let savingThrows: Attribute[]
	export let proficiencies: SkillRanks

	export let type: PokemonType | undefined = undefined
	export let specializations: Specializations | undefined = undefined

	$: extraModifiers = type != null && specializations != null ? skillModifiersFromSpecializations(specializations, type.data) : undefined
</script>

<h3>{m.saves()}</h3>
<div class="upper">
	<ProficiencyBlock {level} {attributes} values={Attributes.list.map((attr) => ({
		name: attr.abbr,
		attr: attr.abbr,
		proficient: savingThrows.includes(attr.abbr),
		expert: false,
	}))} columnsLg={3} columns={2} />
</div>

<h3>{m.skills()}</h3>
<div class="cap">
	<ProficiencyBlock {level} {attributes} values={SkillRanks.list.map((skill) => ({
		name: skill.name,
		attr: skill.attribute,
		proficient: proficiencies.isProficient(skill.name),
		expert: proficiencies.isExpert(skill.name),
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