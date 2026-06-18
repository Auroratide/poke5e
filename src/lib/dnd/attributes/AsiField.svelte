<script lang="ts">
	import { AbilityScoreImprovement } from "./AbilityScoreImprovement"
	import { type Attribute, Attributes } from "./Attributes"


	let {
		attributes,
		pointsToSpend,
		pointsSpent = $bindable(),
	}: {
		attributes: Attributes,
		pointsToSpend: number,
		pointsSpent: AbilityScoreImprovement,
	} = $props()

	let totalSpent = $derived(Object.values(pointsSpent).reduce((sum, cur) => sum + cur, 0))

	const decrease = (attr: Attribute) => () => {
		pointsSpent = AbilityScoreImprovement.decrease(pointsSpent, attr)
	}

	const increase = (attr: Attribute) => () => {
		pointsSpent = AbilityScoreImprovement.increase(pointsSpent, attr)
	}
</script>

<div class="asi-field">
	<div class="asi-grid">
		{#each Attributes.list as attribute}
			{@const abbr = attribute.abbr}
			{@const spent = pointsSpent[abbr]}
			{@const total = attributes[abbr].score + spent}
			<div class="asi-row">
				<strong>{abbr}</strong>
				<div></div>
				<button aria-label="Decrease {attribute.name}" class="subtract" onclick={decrease(abbr)} disabled={spent <= 0}>-</button>
				<span class="score" class:increased={spent > 0}>{total}</span>
				<button aria-label="Increase {attribute.name}" class="add" onclick={increase(abbr)} disabled={totalSpent >= pointsToSpend || total >= Attributes.MAX_ABSOLUTE_VALUE}>+</button>
				<div></div>
			</div>
		{/each}
	</div>
	<p class="points-spent"><strong>Points Spent:</strong> {totalSpent} / {pointsToSpend}</p>
</div>

<style>
	.asi-field {
		container-type: inline-size;
		container-name: asi-field;
	}

	.asi-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5em 0;
	}

	.asi-row {
		display: grid;
		grid-template-columns: 1fr auto 3ch auto 1fr;
		gap: 0.25em 0.5em;
		text-align: center;
		place-content: center;
	}

	.asi-row strong {
		grid-column: span 5;
		text-transform: uppercase;
	}

	.asi-row .score {
		font-size: var(--font-sz-uranus);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.asi-row .score.increased {
		font-weight: bold;
	}

	.points-spent {
		text-align: center;
		margin-block-start: 2em;
	}

	button {
		border-radius: 0.25em;
		border: none;
		font-weight: bold;
		display: inline-block;
		font-size: var(--font-sz-neptune);
		padding: 0.125em;
		aspect-ratio: 1;
		cursor: pointer;
	}

	button.subtract {
		background: var(--skin-danger-bg);
		color: var(--skin-danger-light);
	}

	button.add {
		background: var(--skin-success-bg);
		color: var(--skin-success-light);
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@container asi-field (width > 400px) {
		.asi-grid {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>