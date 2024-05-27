<script lang="ts">
	import type { Move } from "./types"
	import Card from "../design/Card.svelte"
	import FlatDl from "../design/FlatDl.svelte"
	import TypeTag from "../pokemon/TypeTag.svelte"
	import { powerAsString } from "./string"
	import MoveDescription from "./MoveDescription.svelte"

	export let move: Move
</script>

<Card title={move.name}>
	<TypeTag slot="header-extra" type={[move.type]}></TypeTag>
	<section class="info">
		<FlatDl>
			<dt>Move Power</dt>
			<dd class="power">{powerAsString(move.power)}</dd>
			<dt>Move Time</dt>
			<dd>{move.time}</dd>
			<dt><abbr title="Power Points">PP</abbr></dt>
			<dd>{move.pp}</dd>
			<dt>Duration</dt>
			<dd class="duration">{move.duration}</dd>
			<dt>Range</dt>
			<dd class="range">{move.range}</dd>
		</FlatDl>
	</section>
	<section class="description">
		<MoveDescription {move} />
	</section>
	<slot name="extra"></slot>
	{#if move.contest}
		<section class="contest" style:--contest-color="var(--skin-contest-{move.contest.contest})">
			<FlatDl>
					<dt>Contest</dt>
					<dd class="contest-type">{move.contest.contest}</dd>
					<dt>Appeal</dt>
					<dd>{move.contest.appeal}</dd>
					<dt>Jam</dt>
					<dd>{move.contest.jam}</dd>
					<dt>Effect</dt>
					<dd>{move.contest.effect}</dd>
			</FlatDl>
		</section>
	{/if}
</Card>

<style>
	.power {
		text-transform: uppercase;
	}

	.duration, .range, .contest-type {
		text-transform: capitalize;
	}

	.contest {
		background-color: var(--contest-color);
		padding-block-start: 1em;
		padding-block-end: 0.5em;
	}
</style>
