<script lang="ts">
	import { Fieldset, IntField } from "$lib/design/forms"
	import { attributeList } from "$lib/dnd/attributes"
	import type { Attributes } from "$lib/dnd/types"
	
	export let values: Attributes
	export let disabled: boolean
</script>

<Fieldset title="Attributes" columns={3}>
	{#each attributeList as attr}
		<div class="upper">
			<IntField label="{attr.abbr}" min={0} max={30} bind:value={values[attr.abbr]} {disabled} />
		</div>
	{/each}
</Fieldset>
