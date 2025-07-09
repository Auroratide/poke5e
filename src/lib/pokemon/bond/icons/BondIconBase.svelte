<script lang="ts">
	export let name: string
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" style:--bg="var(--skin-bond-{name}-bg)">
	<title>{name}</title>
	<slot></slot>
</svg>

<style>
	svg {
		display: inline-block;
		overflow: visible;
		inline-size: 1em;
		block-size: 1em;
		filter: drop-shadow(0 0 0.0625em var(--bg));
	}

	svg :global(path), svg :global(circle), svg :global(rect) {
		fill: var(--bg);
		fill-rule: evenodd;
	}

	svg :global(path.face-feature),
	svg :global(circle.face-feature),
	svg :global(rect.face-feature) {
		fill: var(--bg);
		filter: brightness(0.5);
	}
</style>
