<script lang="ts">
    import type { PageData } from './$types'
    import type { PokemonId, Trainer } from '$lib/trainers/types'
    import Loader from '$lib/design/Loader.svelte'
    import PlayerPokemon from '$lib/trainers/PlayerPokemon.svelte'
    import WithPokemonData from './WithPokemonData.svelte'

    const byId = (trainer: Trainer, id: PokemonId) =>
        trainer.pokemon.find((it) => it.id === id)

    export let data: PageData
    $: trainer = data.trainer
    $: pokemonId = data.pokemonId
    $: pokemon = trainer !== undefined ? byId(trainer, pokemonId) : undefined
</script>

{#if trainer !== undefined}
    <WithPokemonData let:data pokemon={pokemon.pokemonId}>
        {#await data}
            <Loader />
        {:then data}
            <PlayerPokemon pokemon={{
                ...pokemon,
                pokemonData: data,
            }} />
        {/await}
    </WithPokemonData>
{:else}
    <h1>No trrainer</h1>
{/if}
