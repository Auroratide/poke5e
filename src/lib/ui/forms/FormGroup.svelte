<script lang="ts">
	export let title: string | undefined = undefined
</script>

<div class="form-group">
	{#if title}
		<p><strong>{title}</strong></p>
	{/if}
	<slot></slot>
</div>

<style>
	.form-group {
		border-inline-start: 0.25em solid var(--skin-bg);
		padding-inline-start: 0.75em;
		margin-block-end: 0.75em;
	}
</style>
