<script lang="ts">
    import type { PageData } from './$types'
    import type { Pokemon } from '$lib/creatures/types'
    import Layout from './_layout.svelte'
    import PokemonList from '$lib/creatures/PokemonList.svelte'
    import Title from '$lib/design/Title.svelte'

    export let data: PageData
    $: pokemon = data.pokemon
</script>

<Title value="Pokemon" />
<Layout>
    <PokemonList slot="list" pokemons={pokemon} />
</Layout>
