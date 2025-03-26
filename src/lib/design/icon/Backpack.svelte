<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
	<title>Backpack</title>
	<path class="stroke main-body" d="
		M 20 50
		L 20 85
		Q 20 90 25 90
		L 75 90
		Q 80 90 80 85
		L 80 50
		A 30 27.5 0 1 0 20 50
		Z
	" />
	<path class="stroke thin handle" d="
		M 30 27.5
		A 15 15 190 1 1 70 27.5
	" />
	<rect class="stroke thin front-pocket"
		width="35"
		height="15"
		x="32.5"
		y="62.5"
		rx="2.5"
		ry="2.5"
	/>
	<rect class="stroke thin left-pocket"
		width="12.5"
		height="30"
		x="7.5"
		y="55"
		rx="5"
		ry="5"
	/>
	<rect class="stroke thin right-pocket"
		width="12.5"
		height="30"
		x="80"
		y="55"
		rx="5"
		ry="5"
	/>
	<path class="stroke thin logo-top" d="
		M 34 50
		A 16 16 0 1 1 66 50
	" />
	<circle class="fill logo-middle"
		r="4"
		cx="50"
		cy="47.5"
	/>
</svg>

<style>
	svg {
		overflow: visible;
	}

	.stroke {
		fill: none;
		stroke: var(--skin-local-stroke);
		stroke-width: 8;
	}

	.fill {
		fill: var(--skin-local-stroke);
	}

	.stroke.thin {
		stroke-width: 5;
	}
</style>
