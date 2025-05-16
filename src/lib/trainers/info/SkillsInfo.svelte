<script lang="ts">
	import { attributeList } from "$lib/dnd/attributes";
	import { skillList } from "$lib/dnd/proficiency";
	import ProficiencyBlock from "$lib/dnd/ProficiencyBlock.svelte";
	import type { Attribute, Attributes, Skill } from "$lib/dnd/types";
	import { capitalizeAll } from "$lib/string";

	export let level: number
	export let attributes: Attributes
	export let savingThrows: Attribute[]
	export let proficiencies: Skill[]
</script>

<h3>Saves</h3>
<ProficiencyBlock {level} {attributes} values={attributeList.map((attr) => ({
	name: attr.abbr.toLocaleUpperCase(),
	attr: attr.abbr,
	proficient: savingThrows.includes(attr.abbr),
}))} columns={3} />

<h3>Skills</h3>
<ProficiencyBlock {level} {attributes} values={skillList.map((skill) => ({
	name: capitalizeAll(skill.name),
	attr: skill.attribute,
	proficient: proficiencies.includes(skill.name),
}))} columns={2} />
