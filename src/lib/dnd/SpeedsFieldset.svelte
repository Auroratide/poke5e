<script lang="ts">
	import { type DndSpeeds, DndSpeedTypes } from "./DndSpeeds"
	import DistancesFieldset from "./DistancesFieldset.svelte"
	
	export let values: DndSpeeds
	export let disabled: boolean
</script>

<DistancesFieldset title="Speed Types" types={DndSpeedTypes} {values} {disabled} columns={3} />
