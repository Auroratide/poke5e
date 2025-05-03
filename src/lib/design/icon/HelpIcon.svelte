<script lang="ts">
	export let label: string
</script>

<span class="help-icon">
	<span class="visually-hidden">{label}</span>
	<span class="help" aria-hidden="true">?</span>
</span>

<style>
	.help {
		font-size: var(--font-sz-mercury);
		border: 0.25em solid currentColor;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		inline-size: 1.5em;
		block-size: 1.5em;
		border-radius: 1em;
		font-weight: bold;
		line-height: 1;
		margin-block: 0.45em;
		margin-inline-end: 0.375em;
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