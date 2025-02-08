<script>
	export let label = "Menu"
</script>

<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
	<title>{label}</title>
	<line class="stroke" x1="10" y1="25" x2="90" y2="25" />
	<line class="stroke" x1="10" y1="50" x2="90" y2="50" />
	<line class="stroke" x1="10" y1="75" x2="90" y2="75" />
</svg>

<style>
	.stroke {
		fill: none;
		stroke: var(--skin-local-stroke);
		stroke-width: 8;
		stroke-linecap: round;
	}
</style>
