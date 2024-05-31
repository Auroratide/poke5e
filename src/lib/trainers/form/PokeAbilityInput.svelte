<script lang="ts">
	import type { Ability } from "$lib/pokemon/types"

	export let value: string
	export let abilities: Ability[]
	export let disabled: boolean
</script>

<label for="ability-input">Ability</label>
<select id="ability-input" bind:value {disabled}>
	{#each abilities as a}
		<option value="{a.id}">{a.name}</option>
	{/each}
</select>
