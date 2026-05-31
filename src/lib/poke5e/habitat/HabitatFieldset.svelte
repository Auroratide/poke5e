<script lang="ts">
	import { BiomeField, type Habitat } from "."

	let {
		value = $bindable(),
		disabled = false,
	}: {
		value: Habitat,
		disabled?: boolean,
	} = $props()
</script>

<BiomeField bind:value={value.biomes} {disabled} />
