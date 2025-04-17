<script lang="ts">
	export let error: string | undefined = undefined
</script>

<div class="action-area">
	{#if error != null}
		<p class="error">{error}</p>
	{/if}
	<div class="row">
		<slot></slot>
	</div>
</div>

<style>
	.action-area {
		margin: 0 1em;
		padding: 0.5em 0.25em 0.75em;
		border-block-start: 0.0625em solid var(--skin-input-bg);
	}

	.row {
		display: flex;
		gap: 0.5em;
		justify-content: flex-end;
	}

	.error {
		color: var(--red-text);
		font-weight: bold;
		font-size: var(--font-sz-venus);
		text-align: end;
	}
</style>
