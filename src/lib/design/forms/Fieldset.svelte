<script lang="ts">
	export let title: string
	export let columns: number = 1
	export let columnsLg: number = columns
</script>

<fieldset style:--columns="{columns}" style:--columns-lg="{columnsLg}">
	<legend><span class="unskew">{title}</span></legend>
	<div class="grid">
		<slot></slot>
	</div>
</fieldset>

<style>
	fieldset {
		border: none;
		padding: 0.5em 1em;
		margin-block-end: 1.5em;
		margin-inline: 0;
		inline-size: 100%;
	}

	legend {
		display: block;
		background-color: var(--skin-bg);
		color: var(--skin-bg-text);
		margin-left: -4em;
		padding: 0.25em 1em 0.25em 4em;
		transform: skewX(var(--skew-angle));
	}

	legend .unskew {
		display: inline-block;
		transform: skewX(var(--skew-undo));
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(var(--columns), 1fr);
		column-gap: 0.5em;
		row-gap: 1em;
	}

	@media screen and (min-width: 75rem) {
		.grid {
			grid-template-columns: repeat(var(--columns-lg), 1fr);
		}
	}
</style>