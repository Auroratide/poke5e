<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { type AsiOrFeatEffect } from "./AsiOrFeat"
	import AsiOrFeatFieldTemplate from "./AsiOrFeatFieldTemplate.svelte"

	let {
		value,
	}: {
		value: AsiOrFeatEffect,
	} = $props()
</script>

<AsiOrFeatFieldTemplate {value} name={m.asiOrFeat()} instructions={(pointsToSpend) => m.asiOrFeatInstructions({ number: pointsToSpend })} />
