<script lang="ts">
	export let activation: "automatic" | "manual" = "automatic"
</script>

<tab-list {activation}>
	<slot></slot>
</tab-list>

<style>
	tab-list {
		inline-size: 100%;
		display: flex;
		background: var(--skin-input-bg);
		border-radius: 0.25em;
		padding: 0.125em;
	}
</style>