<script lang="ts">
	import { CustomNatureIdentifier, Natures } from "../nature"

	export let id: string
	export let value: string
	export let custom: string
	export let disabled = false
</script>

<label for="{id}">Nature</label>
<select {id} class="cap" bind:value {disabled}>
	{#each Natures as natureOption}
		<option value="{natureOption}">{natureOption}</option>
	{/each}
	<option value="{CustomNatureIdentifier}">Other</option>
</select>
{#if value === CustomNatureIdentifier}
	<span></span>
	<span class="hrow">
		<label for="{id}-custom">Specify:</label>
		<input class="full-width" id="{id}-custom" type="text" bind:value={custom} {disabled} />
	</span>
{/if}
