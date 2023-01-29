<script lang="ts">
    import type { PokemonMedia } from './types'
    import { assets } from '$app/paths'

    export let media: PokemonMedia
    export let alt: string

    $: isExternal = /^http/.test(media?.sprite)
    $: src = isExternal ? media?.sprite : `${assets}${media?.sprite}`
</script>

{#if media?.sprite}
    <img {src} {alt} />
{/if}

<style>
    img {
        display: block;
        width: 100%;
        margin: 0 auto;
        border: none;
        box-shadow: none;
    }
</style>
