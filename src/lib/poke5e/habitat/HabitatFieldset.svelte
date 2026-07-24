<script lang="ts">
	import { BiomeField, type Habitat } from "."
	import RegionsField from "./RegionsField.svelte"

	let {
		value = $bindable(),
		disabled = false,
	}: {
		value: Habitat,
		disabled?: boolean,
	} = $props()
</script>

<RegionsField bind:nativeRegion={value.nativeRegion} bind:regions={value.regions} {disabled} />
<BiomeField bind:value={value.biomes} {disabled} />
