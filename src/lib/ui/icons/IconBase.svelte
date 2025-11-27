<script lang="ts">
	export let title: string
	export let size: number = 100
</script>

<svg viewBox="0 0 {size} {size}" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<slot></slot>
</svg>

<style>
	svg {
		overflow: visible;
		display: inline-block;
	}

	svg :global(.stroke) {
		fill: none;
		stroke: currentcolor;
		stroke-width: 8;
	}

	svg :global(.fill) {
		fill: currentcolor;
	}

	svg :global(.stroke.thick) {
		stroke-width: 12;
	}

	svg :global(.stroke.thin) {
		stroke-width: 5;
	}

	svg :global(.stroke.round) {
		stroke-linecap: round;
	}
</style>
