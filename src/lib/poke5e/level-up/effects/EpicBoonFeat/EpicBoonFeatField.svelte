<script lang="ts">
	import { m } from "$lib/site/i18n"
	import AsiOrFeatFieldTemplate from "../AsiOrFeat/AsiOrFeatFieldTemplate.svelte"
	import type { EpicBoonFeat } from "./EpicBoonFeat"

	let {
		value,
	}: {
		value: EpicBoonFeat,
	} = $props()
</script>

<AsiOrFeatFieldTemplate {value} name={m.epicBoonFeat()} instructions={() => m.epicBoonFeatInstructions()} />
