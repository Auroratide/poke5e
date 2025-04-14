<script>
	export let label = "More"
</script>

<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
	<title>{label}</title>
	<path class="stroke" d="M 20 45 L 50 25 L 80 45" />
	<path class="stroke" d="M 20 70 L 50 50 L 80 70" />
</svg>

<style>
	.stroke {
		fill: none;
		stroke: var(--skin-local-stroke);
		stroke-width: 8;
		stroke-linecap: round;
	}
</style>
