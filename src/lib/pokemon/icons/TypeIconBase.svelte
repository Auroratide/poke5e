<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
	<slot></slot>
</svg>

<style>
	svg {
		display: inline-block;
		overflow: visible;
		inline-size: 1em;
		block-size: 1em;
	}

	svg :global(path), svg :global(circle) {
		fill: currentColor;
		fill-rule: evenodd;
	}
</style>
