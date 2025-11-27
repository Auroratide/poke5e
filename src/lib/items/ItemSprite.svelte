<script lang="ts">
	import { Art } from "$lib/ui/elements"

	export let src: string
	export let alt: string
</script>

<div class="pixelated">
	<Art {src} {alt} />
</div>

<style>
	.pixelated {
		image-rendering: crisp-edges;
		image-rendering: pixelated;
	}
</style>
