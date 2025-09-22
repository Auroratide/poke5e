<script lang="ts">
	import { assets } from "$app/paths"
	import Art from "$lib/design/Art.svelte"
	import type { StorageResource } from "$lib/trainers/data"
	import type { SpeciesMedia, UploadedMedia } from "./SpeciesMedia"

	export let media: SpeciesMedia<UploadedMedia>
	export let avatar: StorageResource | undefined = undefined
	export let alt: string
	export let shiny: boolean = false

	$: value = media.portrait({ shiny })
	$: isExternal = /^http/.test(value.value?.href)
	$: src = isExternal ? value.value?.href : `${assets}${value.value?.href}`
</script>

{#if avatar}
	<Art src="{avatar.href}" {alt} shimmer={shiny} />
{:else if value.value?.href != null}
	<Art {src} {alt} shimmer={shiny} hue={value.hueRotate} />
{/if}
