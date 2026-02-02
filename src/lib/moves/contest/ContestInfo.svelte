<script lang="ts">
	import { FlatDl, VisuallyHidden } from "$lib/ui/elements"
	import type { ContestDetails } from "./ContestDetails"
	import { m } from "$lib/site/i18n"

	export let value: ContestDetails
</script>

<section class="contest" style:--contest-color="var(--skin-contest-{value.contest})">
	<VisuallyHidden><h2>{m["moves.contest"]()}</h2></VisuallyHidden>
	<FlatDl>
		<dt>{m["moves.contest"]()}</dt>
		<dd class="contest-type">{value.contest}</dd>
		<dt>{m["moves.appeal"]()}</dt>
		<dd>{value.appeal}</dd>
		<dt>{m["moves.jam"]()}</dt>
		<dd>{value.jam}</dd>
	</FlatDl>
	<p>{value.effect.name}</p>
	<p>{value.effect.effect}</p>
</section>

<style>
	.contest-type {
		text-transform: capitalize;
	}

	.contest {
		background-color: var(--contest-color);
		padding-block-start: 1em;
		padding-block-end: 0.5em;
	}
</style>
