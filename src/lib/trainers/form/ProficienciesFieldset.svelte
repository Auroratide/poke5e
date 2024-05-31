<script lang="ts">
	import type { Skill } from "$lib/dnd/types"
	import { skillList } from "$lib/dnd/proficiency"
	import Fieldset from "$lib/design/Form/Fieldset.svelte"

	const noSpaces = (s: string) => s.replace(/\s/g, "")

	export let values: Skill[]
	export let disabled: boolean
</script>

<Fieldset title="Proficiencies" columns={2}>
	{#each skillList as skill}
		{@const nameId = noSpaces(skill.name)}
		<input value={skill.name} bind:group={values} type="checkbox" id="proficiencies-input-{nameId}" name="proficiencies" {disabled} />
		<label for="proficiencies-input-{nameId}" class="cap">{skill.name}</label>
	{/each}
</Fieldset>
