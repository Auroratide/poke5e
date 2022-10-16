<script lang="ts">
    import { page } from '$app/stores'
    import { base, assets } from '$app/paths'
    import Title from '$lib/design/Title.svelte'

    const title = $page.status === 404
        ? 'MissingNo.'
        : 'We\'re sorry!'
    
    const message = $page.status === 404
        ? 'Looks like there\'s nothing here!'
        : 'A problem seems to have occurred.'
</script>

<Title />
<main>
    <h1>{title}</h1>
    <p>{message}</p>
    <img class="missingno" src="{assets}/missingno.png" alt="a nearly random assortment of purple, pink, and black pixels" />
    <p>Try <a href="{base}">returning to the home page.</a></p>
</main>

<style>
    main {
        max-width: calc(0.5 * var(--container-width));
        margin: auto;
        overflow: auto;
        height: 100%;
        padding: 2em 1em;
        text-align: center;
    }

    h1 {
        font-size: var(--font-sz-jupiter);
        margin-bottom: 0.5em;
    }

    p {
        font-size: var(--font-sz-neptune);
        line-height: 1.5;
        margin-bottom: 3em;
    }

    p:last-child {
        margin: 0;
    }

    .missingno {
        image-rendering: crisp-edges;
        image-rendering: pixelated;
        height: 33vh;
        margin-bottom: 3em;
        display: block;
        margin: 0 auto 3em;
    }
</style>