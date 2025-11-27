<script lang="ts">
	import { Fieldset, RanksField } from "$lib/ui/forms"
	import { SpecializationList, type Specializations } from "$lib/trainers/specializations"

	export let values: Specializations
	export let disabled: boolean = false
</script>

<Fieldset title="Specializations" columns={2} columnsLg={3}>
	{#each Object.values($SpecializationList) as specialization}
		<RanksField max={5} label="{specialization.name} ({specialization.type})" name="specialization-{specialization.type}" bind:value={values[specialization.type]} {disabled} --skin-local-bg="var(--skin-{specialization.type}-bg)" />
	{/each}
</Fieldset>
