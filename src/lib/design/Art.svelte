<script lang="ts">
	export let src: string
	export let attribution: undefined | string | {
		author: string,
		link: string,
	} = undefined
	export let alt: string
	export let shimmer: boolean = false
</script>

<figure>
	{#key src}
		<img {src} {alt} class:smaller={attribution != null} class:shimmer={shimmer} />
	{/key}
	{#if attribution}
		{#await attribution}
			<figcaption style:visibility="hidden">Getting attribution...</figcaption>
		{:then attribution}
			{#if attribution != null}
				{#if typeof attribution === "string"}
					<figcaption>{attribution}</figcaption>
				{:else}
					<figcaption>By <a href="{attribution.link}">{attribution.author}</a></figcaption>
				{/if}
			{/if}
		{/await}
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