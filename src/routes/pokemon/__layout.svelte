<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const movesFetch = fetch('/data/moves.json')
            .then(res => res.json())
            .then(json => json.moves)

        const pokemonsFetch = fetch('/data/pokemon.json')
            .then(res => res.json())
            .then(json => json.items)

        const [ moves, pokemons ] = await Promise.all([movesFetch, pokemonsFetch])
        
        return {
            props: { pokemons, moves },
            stuff: { pokemons },
        }
    }
</script>

<script lang="ts">
    import type { Pokemon } from '$lib/creatures/types'
    import type { Move } from '$lib/moves/types'
    import Theme from '$lib/design/Theme.svelte'
    import PokemonList from '$lib/creatures/PokemonList.svelte'
    import Backdrop from '$lib/design/Backdrop.svelte'
    import { setMoves } from '$lib/moves/context'

    export let pokemons: Pokemon[]
    export let moves: Move[]

    setMoves(moves)
</script>

<svelte:head>
    <title>Pokemon | Pokemon 5e Tools</title>
</svelte:head>

<Theme theme="red">
    <Backdrop />
    <div class="page">
        <nav class="table" aria-label="Pokemon List">
            <PokemonList {pokemons} />
        </nav>
        <main>
            <slot></slot>
        </main>
    </div>
</Theme>

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
