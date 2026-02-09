<script lang="ts">
	import { m } from "$lib/site/i18n";
	import { DistancesFieldset } from "../distance"
	import { Speeds } from "./Speeds"
	
	export let values: Speeds
	export let disabled: boolean
</script>

<DistancesFieldset title="{m["universal.speedTypes"]()}" types={Speeds.types} values={values.data} {disabled} columns={3} />
