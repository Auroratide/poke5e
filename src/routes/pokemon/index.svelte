<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'
    import { assets } from '$app/paths'

    export const load: Load = async ({ fetch }) => {
        const pokemon = await fetch(`${assets}/data/pokemon.json`)
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
    import Title from '$lib/design/Title.svelte'

    export let pokemon: Pokemon[]
</script>

<Title value="Pokemon" />
<Layout>
    <PokemonList slot="list" pokemons={pokemon} />
</Layout>
