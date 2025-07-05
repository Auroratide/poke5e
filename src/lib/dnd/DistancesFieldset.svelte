<script lang="ts" generics="DistanceTypes extends Readonly<Record<string, string>>">
	import { Fieldset, IntField, InstructionText } from "$lib/design/forms"
	
	export let title: string
	export let types: DistanceTypes
	export let values: Partial<Record<DistanceTypes[keyof DistanceTypes], number>>
	export let disabled: boolean
	export let columns: number
</script>

<Fieldset title="{title}" {columns}>
	<InstructionText>Distance is in feet. Leave a field blank to use this Pokémon's default for that type, or use 0 disable that type.</InstructionText>
	{#each Object.values(types) as type}
		<div class="cap">
			<IntField label="{type}" min={0} bind:value={values[type]} {disabled} optional />
		</div>
	{/each}
</Fieldset>
