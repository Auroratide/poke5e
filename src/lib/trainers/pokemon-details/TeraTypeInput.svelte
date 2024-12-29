<script lang="ts">
	import { TeraPokeTypes, type TeraPokeType } from "../../pokemon/types"

	export let id: string
	export let value: TeraPokeType | ""
	export let disabled = false
</script>

<label for="{id}">Tera</label>
<select {id} class="cap" bind:value {disabled}>
	{#each TeraPokeTypes as teraOption}
		<option value="{teraOption}">{teraOption}</option>
	{/each}
</select>
