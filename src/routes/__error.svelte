<script lang="ts" context="module">
    import type { ErrorLoad } from '@sveltejs/kit'

    export const load: ErrorLoad = async ({ status }) => {
        if (status === 404) {
            return {
                props: {
                    title: 'MissingNo.',
                    message: 'Looks like there\'s nothing here!',
                },
            }
        } else {
            return {
                props: {
                    title: 'We\'re sorry!',
                    message: 'A problem seems to have occurred.',
                },
            }
        }
    }
</script>

<script lang="ts">
    export let title: string
    export let message: string
</script>

<svelte:head>
    <title>Pokemon 5e Reference</title>
</svelte:head>

<main>
    <h1>{title}</h1>
    <p>{message}</p>
    <img class="missingno" src="/missingno.png" alt="a nearly random assortment of purple, pink, and black pixels" />
    <p>Try <a href="/">returning to the home page.</a></p>
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