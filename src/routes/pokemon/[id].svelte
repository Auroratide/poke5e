<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ params, stuff }) => {
        const pokemon = stuff.pokemons.find(it => it.id === params.id)
        if (pokemon !== undefined) {
            return {
                props: { pokemon },
            }
        } else {
            return {
                status: 404,
            }
        }
    }
</script>

<script lang="ts">
    import type { Pokemon } from '$lib/creatures/types'
    import PokemonStatblock from '$lib/creatures/Pokemon.svelte'

    export let pokemon: Pokemon
</script>

<svelte:head>
    <title>{pokemon.name} | Pokemon 5e Reference</title>
</svelte:head>

<PokemonStatblock {pokemon} />
