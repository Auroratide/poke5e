<script lang="ts">
	import { browser } from "$app/environment"
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

	let attribution = undefined
	$: {
		if (browser && media.data.attribution?.href) {
			attribution = fetch(`${assets}${media.data.attribution.href}`)
				.then((res) => res.json())
		} else {
			attribution = undefined
		}
	}
</script>

{#if avatar}
	<Art src="{avatar.href}" {alt} shimmer={shiny} />
{:else if value.value?.href != null}
	{#if attribution}
		{#await attribution}
			<Art {src} {alt} attribution="Getting attribution..." shimmer={shiny} hue={value.hueRotate} />
		{:then attribution}
			<Art {src} {alt} attribution={attribution.main} shimmer={shiny} hue={value.hueRotate} />
		{/await}
	{:else}
		<Art {src} {alt} shimmer={shiny} hue={value.hueRotate} />
	{/if}
{/if}
