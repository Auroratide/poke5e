<script lang="ts">
	import { assets } from "$app/paths"
	import Art from "$lib/design/Art.svelte"
	import type { StorageResource } from "$lib/trainers/data"
	import type { SpeciesMedia, SpeciesMediaType, UploadedMedia } from "./SpeciesMedia"

	export let media: SpeciesMedia<UploadedMedia>
	export let avatar: StorageResource | undefined = undefined
	export let alt: string
	export let shiny: boolean = false

	$: imgKey = (shiny ? "shiny" : "normal") + "Portrait" as SpeciesMediaType
	$: isExternal = /^http/.test(media.data.normalPortrait.href)
	$: sprite = media.data?.[imgKey].href
	$: src = isExternal ? sprite : `${assets}${sprite}`
</script>

{#if avatar}
	<Art src="{avatar.href}" {alt} shimmer={shiny} />
{:else if sprite}
	<Art {src} {alt} shimmer={shiny} />
{/if}
