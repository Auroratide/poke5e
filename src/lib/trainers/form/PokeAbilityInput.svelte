<script lang="ts">
	import type { Ability } from "$lib/pokemon/types"
	import { abilities as allAbilities } from "$lib/pokemon/store"

	export let value: string
	export let abilities: Ability[]
	export let disabled: boolean

	$: myAbilityIds = abilities.map((it) => it.id)
	$: nonstandardAbilities = $allAbilities?.filter((it) => !myAbilityIds.includes(it.id))
</script>

<label for="ability-input">Ability</label>
<select id="ability-input" bind:value {disabled}>
	<optgroup label="Learnable Abilities">
		{#each abilities as a}
			<option value="{a.id}">{a.name}</option>
		{/each}
	</optgroup>
	<optgroup label="All Other Abilities">
		{#each nonstandardAbilities as a}
			<option value="{a.id}">{a.name}</option>
		{/each}
	</optgroup>
</select>
