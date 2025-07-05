<script lang="ts">
	import DistancesFieldset from "./DistancesFieldset.svelte"
	import { DndSenseTypes, type DndSenses } from "./DndSenses"
	
	export let values: DndSenses
	export let disabled: boolean
</script>

<DistancesFieldset title="Sense Types" types={DndSenseTypes} {values} {disabled} columns={2} />
