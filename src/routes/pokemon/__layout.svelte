<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const pokemons = await fetch('/data/pokemon.json')
            .then(res => res.json())
            .then(json => json.items)
        
        return {
            props: { pokemons },
            stuff: { pokemons },
        }
    }
</script>

<script lang="ts">
    import type { Pokemon } from '$lib/creatures/types'
    import PokemonList from '$lib/creatures/PokemonList.svelte'
    import Backdrop from '$lib/design/Backdrop.svelte'

    export let pokemons: Pokemon[]
</script>

<svelte:head>
    <title>Pokemon Moves | Pokemon 5e Tools</title>
</svelte:head>

<Backdrop />
<div class="page">
    <nav class="table" aria-label="Pokemon List">
        <PokemonList {pokemons} />
    </nav>
    <main>
        <slot></slot>
    </main>
</div>

<style lang="scss">
    .page {
        height: 100%;
        max-width: calc(0.5 * var(--container-width));
        margin: auto;

        nav, main {
            padding: 0.5em;
        }

        nav {
            height: 33%;
        }

        main {
            height: 67%;
        }
    }

    @media screen and (min-width: 75rem) {
        .page {
            display: flex;
            flex-wrap: wrap;
            margin: auto;
            justify-content: center;
            max-width: 75rem;
            height: 100%;

            nav, main {
                flex: 0 1 37.5rem;
                height: 100%;
            }
        }
    }
</style>
