<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const pokemon = await fetch('/data/pokemon.json')
            .then(res => res.json())
            .then(data => data.items)

        return {
            props: { pokemon },
        }
    }
</script>

<script lang="ts">
    import type { Pokemon } from '$lib/creatures/types'
    import Layout from './_layout.svelte'
    import PokemonList from '$lib/creatures/PokemonList.svelte'

    export let pokemon: Pokemon[]
</script>

<svelte:head>
    <title>Pokemon | Pokemon 5e Reference</title>
</svelte:head>

<Layout>
    <PokemonList slot="list" pokemons={pokemon} />
</Layout>
