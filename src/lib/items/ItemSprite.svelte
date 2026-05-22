<script lang="ts">
	import { Art } from "$lib/ui/elements"

	export let src: string
	export let alt: string
</script>

<div class="pixelated">
	<img {src} {alt} />
</div>

<style>
	.pixelated {
		image-rendering: crisp-edges;
		image-rendering: pixelated;
	}

	img {
		display: block;
		inline-size: 100%;
		block-size: 100%;
		margin: 0 auto;
		border: none;
		box-shadow: none;
		object-fit: contain;
		flex: 1;
	}
</style>
