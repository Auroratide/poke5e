<script lang="ts">
	export let half = false
</script>

<div class="container" class:half>
	<slot></slot>
</div>

<style>
	.container {
		max-inline-size: var(--container-width);
		margin: auto;
	} .container.half {
		max-inline-size: var(--container-half);
	}
</style>
