<script lang="ts">
	import type { PokemonMedia } from "./types"
	import { assets } from "$app/paths"
	import { browser } from "$app/environment"

	export let media: PokemonMedia
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

{#if sprite}
	<figure>
		{#key src}
			<img {src} {alt} class:smaller={attribution != null} class:shimmer={shiny} />
		{/key}
		{#if attribution}
			{#await attribution}
				<figcaption style:visibility="hidden">Getting attribution...</figcaption>
			{:then attribution}
				{#if attribution.main}
					<figcaption>By <a href="{attribution.main.link}">{attribution.main.author}</a></figcaption>
				{/if}
			{/await}
		{/if}
	</figure>
{/if}

<style>
	figure {
		margin: 0;
		display: block;
	}

	img {
		display: block;
		width: 100%;
		margin: 0 auto;
		border: none;
		box-shadow: none;
	}

	.smaller {
		width: 85%;
	}

	figcaption {
		font-size: 0.5rem;
	}

	.shimmer {
		mask: linear-gradient(-60deg, oklch(0% 0 0) 30%, oklch(0% 0 0 / 0.5), oklch(0% 0 0) 70%) right / 350% 100%;
		animation: shimmer 1s forwards;
		animation-delay: 0.5s;
	}

	@keyframes shimmer {
		100% {
			mask-position: left;
		}
	}

	@media (prefers-reduced-motion) {
		.shimmer {
			mask: none;
			animation: none;
		}
	}
</style>