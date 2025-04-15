<script lang="ts">
	import { modifierForScore } from "./attributes"

	export let attributes: {
		str: number,
		dex: number,
		con: number,
		int: number,
		wis: number,
		cha: number,
	}

	const modifierAsString = (n: number) => n >= 0 ? `+${n}` : `${n}`
</script>

<dl>
	<dt><abbr title="Strength">str</abbr></dt>
	<dd>{attributes.str} ({modifierAsString(modifierForScore(attributes.str))})</dd>
	<dt><abbr title="Dexterity">dex</dt>
	<dd>{attributes.dex} ({modifierAsString(modifierForScore(attributes.dex))})</dd>
	<dt><abbr title="Constitution">con</dt>
	<dd>{attributes.con} ({modifierAsString(modifierForScore(attributes.con))})</dd>
	<dt><abbr title="Intelligence">int</dt>
	<dd>{attributes.int} ({modifierAsString(modifierForScore(attributes.int))})</dd>
	<dt><abbr title="Wisdom">wis</dt>
	<dd>{attributes.wis} ({modifierAsString(modifierForScore(attributes.wis))})</dd>
	<dt><abbr title="Charisma">cha</dt>
	<dd>{attributes.cha} ({modifierAsString(modifierForScore(attributes.cha))})</dd>
</dl>

<style>
	dl {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		grid-template-rows: auto 1fr;
		grid-auto-flow: column;
		font-size: var(--font-sz-venus);
		text-align: center;
	}

	dt {
		font-weight: 700;
		text-transform: uppercase;
		background-color: var(--skin-bg-dark);
		color: var(--skin-bg-text);
		padding: 0.25em 0;
	}

	dd {
		margin: 0;
		background-color: var(--skin-bg);
		color: var(--skin-bg-text);
		padding-inline: 0.25em;
		padding-block-end: 0.25em;
	}
</style>