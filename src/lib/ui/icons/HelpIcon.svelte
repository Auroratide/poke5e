<script lang="ts">
	export let label: string
</script>

<span class="help-icon">
	<span class="visually-hidden">{label}</span>
	<span class="help" aria-hidden="true">
		<span class="small">?</span>
	</span>
</span>

<style>
	.help {
		border: 0.2em solid currentColor;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		inline-size: 1.2em;
		block-size: 1.2em;
		border-radius: 1em;
		font-weight: bold;
		line-height: 1;
	}

	.small {
		font-size: 0.875em;
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