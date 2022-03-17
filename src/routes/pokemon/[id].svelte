<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'
    import { base } from '$app/paths'

    export const load: Load = async ({ fetch, params }) => {
        return fetch(`${base}/pokemon/${params.id}.json`).then(async res => {
            if (res.status === 404)
                return { status: 404 }
            else
                return {
                    props: { pokemon: await res.json() }
                }
            })
    }
</script>

<script lang="ts">
    import type { Pokemon } from '$lib/creatures/types'
    import PokemonStatblock from '$lib/creatures/Pokemon.svelte'
    import Layout from './_layout.svelte'
    import Title from '$lib/design/Title.svelte'

    export let pokemon: Pokemon
</script>

<Title value={pokemon.name} />
<Layout>
    <PokemonStatblock {pokemon} />
</Layout>
