<script>
	export let label = "Pokeball"
</script>

<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
	<title>{label}</title>
	<circle class="stroke" cx="50" cy="50" r="40" />
	<circle class="stroke thin" cx="50" cy="50" r="12.5" />
	<line class="stroke thin" x1="62.5" y1="50" x2="90" y2="50" />
	<line class="stroke thin" x1="37.5" y1="50" x2="10" y2="50" />
</svg>

<style>
	.stroke {
		fill: none;
		stroke: var(--skin-local-stroke);
		stroke-width: 8;
	}

	.stroke.thin {
		stroke-width: 5;
	}
</style>