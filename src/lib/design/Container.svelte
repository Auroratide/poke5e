<script lang="ts">
	export let half = false
	export let height: "full" | "auto" = "auto"
</script>

<div class="container" class:half class:full-height={height === "full"}>
	<slot></slot>
</div>

<style>
	.container {
		max-inline-size: var(--container-width);
		margin: auto;
	} .container.half {
		max-inline-size: var(--container-half);
	}

	.full-height {
		block-size: 100%;
	}
</style>
