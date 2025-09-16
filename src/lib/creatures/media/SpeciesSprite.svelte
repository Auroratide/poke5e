<script lang="ts">
	import { assets } from "$app/paths"
	import type { SpeciesMedia, SpeciesMediaType, UploadedMedia } from "./SpeciesMedia"

	export let media: SpeciesMedia<UploadedMedia>
	export let alt: string
	export let shiny: boolean = false

	$: imgKey = (shiny ? "shiny" : "normal") + "Sprite" as SpeciesMediaType
	$: isExternal = /^http/.test(media?.data.normalSprite.href)
	$: sprite = media?.data?.[imgKey].href
	$: src = isExternal ? sprite : `${assets}${sprite}`
</script>

{#if sprite}
	<img {src} {alt} />
{/if}

<style>
	img {
		display: block;
		width: 100%;
		margin: 0 auto;
		border: none;
		box-shadow: none;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
	}
</style>
