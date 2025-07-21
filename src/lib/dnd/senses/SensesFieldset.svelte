<script lang="ts">
	import { DistancesFieldset } from "../distance"
	import { Senses } from "./Senses"
	
	export let values: Senses
	export let disabled: boolean
</script>

<DistancesFieldset title="Sense Types" types={Senses.types} values={values.data} {disabled} columns={2} />
