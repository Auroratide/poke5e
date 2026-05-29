<script lang="ts">
	import type { Snippet } from "svelte"

	let {
		id,
		leftvalue,
		leftlabel,
		rightvalue,
		rightlabel,
		group = $bindable(),
		legend,
	}: {
		id: string,
		leftvalue: string,
		leftlabel: string,
		rightvalue: string,
		rightlabel: string,
		group: string,
		legend: Snippet,
	} = $props()
</script>

<fieldset {id}>
	<legend>
		{@render legend?.()}
	</legend>
	<span class="skew-tags">
		<input id="{id}-left-input" bind:group value="{leftvalue}" type="radio" class="visually-hidden" />
		<label for="{id}-left-input" class="skew-tag left">
			<span class="text unskew">{leftlabel}</span>
		</label>
		<input id="{id}-right-input" bind:group value="{rightvalue}" type="radio" class="visually-hidden" />
		<label for="{id}-right-input" class="skew-tag right">
			<span class="text unskew">{rightlabel}</span>
		</label>
	</span>
</fieldset>

<style>
	fieldset {
		border: none;
		padding: 0;
		margin: 0;
		font-size: var(--font-sz-venus);
		display: block;
		block-size: 1.667em;
	}

	legend {
		float: inline-start;
		margin: 0.25em 0.5em;
	}

	legend :global(a) {
		color: var(--theme-light);
	}

	label {
		cursor: pointer;
	}

	.skew-tags {
		transform: translateZ(0); /* Needed to fix a bonkers Safari bug */
		border-radius: 1em;
		filter: var(--elev-stratus-filter);
		display: inline-block;
		overflow: hidden;
	} .skew-tags:has(input:focus-visible) {
		outline: 0.15em solid var(--skin-focus);
	}

	.skew-tag {
		display: inline-block;
		transform: skewX(var(--skew-angle));
		padding: 0.25em 1em;
		background: var(--skin-none-bg);
		border: none;
		color: var(--skin-bg-text);
		cursor: pointer;
	}

	.unskew {
		display: inline-block;
		transform: skewX(var(--skew-undo));
	}

	.left {
		margin-left: -1em;
		padding-left: 2em;
	}

	.right {
		margin-right: -1em;
		padding-right: 2em;
	}

	input + .skew-tag .text {
		font-size: var(--font-sz-venus);
	} input:checked + .skew-tag .text {
		font-size: var(--font-sz-earth);
	}

	input:checked + .skew-tag {
		color: var(--skin-content-text);
		background: var(--skin-content);
		font-weight: bold;
	}

	.visually-hidden {
		clip: rect(1px, 1px, 1px, 1px);
		clip-path: inset(50%);
		height: 1px;
		width: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
	}
</style>
