<script lang="ts">
	import { Level } from "$lib/ui/elements";
	import type { IncreaseLevelEffect } from "./IncreaseLevel";

	let {
		value,
	}: {
		value: IncreaseLevelEffect,
	} = $props()
</script>

<section>
	<p class="center-stage"><Level value={value.props.currentLevel.data} /> → <Level value={value.props.currentLevel.next().data} /></p>
</section>

<style>
	.center-stage {
		font-size: var(--font-sz-neptune);
		text-align: center;
		font-weight: bold;
		margin-block: 1.5em;
	}
</style>
