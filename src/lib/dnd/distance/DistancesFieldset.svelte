<script lang="ts" generics="DistanceTypes extends Readonly<Record<string, string>>">
	import { m } from "$lib/site/i18n"
	import { Fieldset, IntField, InstructionText } from "$lib/ui/forms"
	
	export let title: string
	export let types: DistanceTypes
	export let values: Partial<Record<DistanceTypes[keyof DistanceTypes], number>>
	export let disabled: boolean
	export let columns: number
</script>

<Fieldset title="{title}" {columns}>
	<InstructionText>{m.distancesTutorialText()}</InstructionText>
	{#each Object.values(types) as type}
		<div class="cap">
			<IntField label="{type}" min={0} bind:value={values[type]} {disabled} optional />
		</div>
	{/each}
</Fieldset>
