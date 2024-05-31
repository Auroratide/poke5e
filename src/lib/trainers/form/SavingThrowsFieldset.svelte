<script lang="ts">
	import Fieldset from "$lib/design/Form/Fieldset.svelte"
	import { attributeList } from "$lib/dnd/attributes"
	import type { Attributes } from "$lib/dnd/types"

	export let values: (keyof Attributes)[]
	export let disabled: boolean
</script>

<Fieldset title="Saving Throws" columns={2}>
	{#each attributeList as attr}
		<input value={attr.abbr} bind:group={values} type="checkbox" id="saves-input-{attr.abbr}" name="saves" {disabled} />
		<label for="saves-input-{attr.abbr}" class="cap">{attr.name}</label>
	{/each}
</Fieldset>
