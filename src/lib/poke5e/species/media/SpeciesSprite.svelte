<script lang="ts">
	import { asset } from "$app/paths"
	import type { PokemonGender } from "$lib/pokemon/gender"
	import type { SpeciesMedia, UploadedMedia } from "./SpeciesMedia"

	export let media: SpeciesMedia<UploadedMedia>
	export let alt: string
	export let shiny: boolean = false
	export let gender: PokemonGender | undefined = undefined

	$: value = media.sprite({ shiny, gender })
	$: isExternal = /^http/.test(value.value?.href)
	$: src = isExternal ? value.value?.href : `${asset(value.value?.href)}`
</script>

{#if value.value?.href != null}
	<img {src} {alt} class:using-fallback={value.portraitFallback} style:--hue-rotate="{value.hueRotate}deg" />
{/if}

<style>
	img {
		display: block;
		inline-size: 100%;
		margin: 0 auto;
		border: none;
		box-shadow: none;
		/* image-rendering: crisp-edges;
		image-rendering: pixelated; */
		filter: hue-rotate(var(--hue-rotate));
		aspect-ratio: 1;
		object-fit: contain;
	}

	.using-fallback {
		padding: 12.5%;
		image-rendering: auto;
	}
</style>
