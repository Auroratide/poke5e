<script lang="ts">
	import { Level } from "$lib/ui/elements"
	import CenterStage from "../CenterStage.svelte"
	import FromTo from "../FromTo.svelte"
	import type { IncreaseLevelEffect } from "./IncreaseLevel"

	let {
		value,
	}: {
		value: IncreaseLevelEffect,
	} = $props()
</script>

<section>
	<CenterStage>
		<FromTo>
			{#snippet from()}
				<Level value={value.props.currentLevel.data} />
			{/snippet}
			{#snippet to()}
				<Level value={value.props.currentLevel.next().data} />
			{/snippet}
		</FromTo>
	</CenterStage>
</section>
