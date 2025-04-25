<script>
	export let label = "Up"
</script>

<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
	<title>{label}</title>
	<path class="stroke" d="M 25 50 L 50 30 L 75 50" />
</svg>

<style>
	svg {
		display: inline-block;
		inline-size: 1em;
		block-size: 1em;
	}

	.stroke {
		fill: none;
		stroke: var(--skin-local-stroke, currentColor);
		stroke-width: 12;
		stroke-linecap: round;
	}
</style>
