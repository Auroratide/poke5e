<script lang="ts">
	import type { SpeciesMediaTypeAttribution } from "$lib/creatures/media"
	import { isNotBlank } from "$lib/string"
	import ArtAttribution from "./ArtAttribution.svelte"

	export let src: string
	export let attribution: undefined | string | SpeciesMediaTypeAttribution = undefined
	export let alt: string
	export let shimmer: boolean = false
	export let hue: number = 0

	$: hasAttribution = attribution != null && attribution !== "" && (typeof attribution === "string" || attribution.type === "ai" || isNotBlank(attribution.name))
</script>

<figure>
	{#key src}
		<img {src} {alt} class:smaller={hasAttribution} class:shimmer={shimmer} style:--hue-rotate="{hue}deg" />
	{/key}
	{#if hasAttribution}
		{#if typeof attribution === "string"}
			<figcaption>{attribution}</figcaption>
		{:else}
			<figcaption><ArtAttribution value={attribution} /></figcaption>
		{/if}
	{/if}
</figure>

<style>
	figure {
		margin: 0;
		display: flex;
		flex-direction: column;
		inline-size: 100%;
		block-size: 100%;
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
		filter: hue-rotate(var(--hue-rotate));
	}

	.smaller {
		width: 90%;
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