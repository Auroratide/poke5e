<script lang="ts">
	import { m } from "$lib/site/i18n"
	import AsiOrFeatFieldTemplate from "../AsiOrFeat/AsiOrFeatFieldTemplate.svelte"
	import type { PeakPowerEffect } from "./PeakPower"

	let {
		value,
	}: {
		value: PeakPowerEffect,
	} = $props()
</script>

<AsiOrFeatFieldTemplate {value} name={m.peakPower()} instructions={() => m.peakPowerInstructions()} />
