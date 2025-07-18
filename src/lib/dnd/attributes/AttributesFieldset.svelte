<script lang="ts">
	import { Fieldset, IntField } from "$lib/design/forms"
	import { Attributes } from "./Attributes"
	
	export let values: Attributes
	export let disabled: boolean
</script>

<Fieldset title="Attributes" columns={3}>
	{#each Attributes.list as attr}
		<div class="upper">
			<IntField label="{attr.abbr}" min={0} max={30} bind:value={values.data[attr.abbr]} {disabled} />
		</div>
	{/each}
</Fieldset>
