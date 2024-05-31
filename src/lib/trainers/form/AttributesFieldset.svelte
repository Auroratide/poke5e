<script lang="ts">
	import Fieldset from "$lib/design/Form/Fieldset.svelte"
	import { attributeList } from "$lib/dnd/attributes"
	import type { Attributes } from "$lib/dnd/types"
	
	export let values: Attributes
	export let disabled: boolean
</script>

<Fieldset title="Attributes" columns={3}>
	{#each attributeList as attr}
		<label for="{attr.abbr}-input" class="upper">{attr.abbr}</label>
		<input name="{attr.abbr}" id="{attr.abbr}-input" min="0" max="30" type="number" bind:value={values[attr.abbr]} style:max-width="4em" {disabled} />
	{/each}
</Fieldset>