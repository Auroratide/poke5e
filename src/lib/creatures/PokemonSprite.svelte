<script lang="ts">
	import type { PokemonMedia } from "./types"
	import { assets } from "$app/paths"

	export let media: PokemonMedia
	export let alt: string
	export let shiny: boolean = false

	$: imgKey = "sprite" + (shiny ? "Shiny" : "")
	$: isExternal = /^http/.test(media?.sprite)
	$: sprite = media?.[imgKey] ?? media?.sprite
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
