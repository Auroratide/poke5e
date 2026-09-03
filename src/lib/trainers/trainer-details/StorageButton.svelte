<script lang="ts">
	import { ChevronIcon } from "$lib/ui/icons"

	let {
		label,
		destination,
		description,
		disabled = false,
		onclick,
	}: {
		/** The short label under the chevron, naming where the pokemon is going. */
		label: string,
		/** Which way the pokemon travels: down into the Box, up into the party. */
		destination: "box" | "party",
		/** The full sentence for assistive tech and the tooltip. */
		description: string,
		disabled?: boolean,
		onclick: () => void,
	} = $props()
</script>

<!--
	The inline move control on a roster row: a chevron pointing the way the
	pokemon travels, over a label naming where it lands. Both lists use it, so
	the party's "to the Box" and the Box's "to the party" are the same shape
	pointing opposite ways.

	The label is decorative for assistive tech -- on its own "Box" would not say
	what the button does -- so the accessible name is the description instead.
-->
<button
	type="button"
	class="storage-button"
	title={description}
	aria-label={description}
	{disabled}
	{onclick}
>
	<span class="glyph" aria-hidden="true">
		{#if destination === "box"}
			<ChevronIcon.Down label="" />
		{:else}
			<ChevronIcon.Up label="" />
		{/if}
	</span>
	<span class="label" aria-hidden="true">{label}</span>
</button>

<style>
	.storage-button {
		all: unset;
		box-sizing: border-box;
		flex: 0 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.125em;

		/* Grows to fit its label rather than clipping it, so the hit area and the
		   hover background cover the whole control. */
		min-inline-size: 2.75em;
		padding-block: 0.25em;
		padding-inline: 0.375em;
		border-radius: 0.75em;
		color: var(--skin-bg-text);
		cursor: pointer;
	}

	.storage-button:hover, .storage-button:focus-visible {
		background: var(--skin-bg-dark);
	}

	.storage-button:disabled {
		opacity: 0.5;
		cursor: default;
	}

	.glyph {
		display: flex;
		inline-size: 1.25em;
	}

	.label {
		font-size: var(--font-sz-mercury);
		font-weight: bold;
		text-transform: uppercase;
		line-height: 1;
		/* The labels are short, but a nickname-length one must not wrap the row. */
		white-space: nowrap;
	}
</style>
