<script lang="ts">
	export let id: string
</script>

<tab-panel {id}>
	<slot></slot>
</tab-panel>

<style>
	tab-panel {
		border: none;
		border-block-end: 0.125em solid var(--skin-input-bg);
		padding: 0.75em 0;
	}
</style>