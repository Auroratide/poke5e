<script lang="ts">
	import type { PokemonMedia } from "./types"
	import { assets } from "$app/paths"
	import { browser } from "$app/environment"
	import { Art } from "$lib/ui/elements"
	import type { StorageResource } from "$lib/trainers/data"

	export let media: PokemonMedia
	export let avatar: StorageResource | undefined = undefined
	export let alt: string
	export let shiny: boolean = false

	$: imgKey = "main" + (shiny ? "Shiny" : "")
	$: isExternal = /^http/.test(media.main)
	$: sprite = media?.[imgKey] ?? media?.sprite
	$: src = isExternal ? sprite : `${assets}${sprite}`

	let attribution = undefined
	$: {
		if (browser && media.attribution) {
			attribution = fetch(`${assets}${media.attribution}`)
				.then((res) => res.json())
		} else {
			attribution = undefined
		}
	}
</script>

{#if avatar}
	<Art src="{avatar.href}" {alt} shimmer={shiny} />
{:else if sprite}
	{#if attribution}
		{#await attribution}
			<Art {src} {alt} attribution="Getting attribution..." shimmer={shiny} />
		{:then attribution}
			<Art {src} {alt} attribution={attribution.main} shimmer={shiny} />
		{/await}
	{:else}
		<Art {src} {alt} shimmer={shiny} />
	{/if}
{/if}
