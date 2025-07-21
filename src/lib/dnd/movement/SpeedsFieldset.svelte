<script lang="ts">
	import { DistancesFieldset } from "../distance"
	import { Speeds } from "./Speeds"
	
	export let values: Speeds
	export let disabled: boolean
</script>

<DistancesFieldset title="Speed Types" types={Speeds.types} values={values.data} {disabled} columns={3} />
