<script lang="ts">
    import type { PokemonMedia } from './types'
    import { assets } from '$app/paths'
    import { browser } from '$app/environment'

    export let media: PokemonMedia
    export let alt: string

    $: isExternal = /^http/.test(media.main)
    $: src = isExternal ? media.main : `${assets}${media.main}`

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

{#if media.main}
    <figure>
        <img {src} {alt} class:smaller={attribution != null} />
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
</style>