<script lang="ts">
    import type { PageData } from './$types'
    import type { PokemonId, Trainer } from '$lib/trainers/types'
    import Loader from '$lib/design/Loader.svelte'
    import PlayerPokemon from '$lib/trainers/PlayerPokemon.svelte'
    import WithPokemonData from './WithPokemonData.svelte'
    import WithMoveData from './WithMoveData.svelte'

    const byId = (trainer: Trainer, id: PokemonId) =>
        trainer.pokemon.find((it) => it.id === id)

    export let data: PageData
    $: trainer = data.trainer
    $: pokemonId = data.pokemonId
    $: pokemon = trainer !== undefined ? byId(trainer, pokemonId) : undefined
</script>

{#if trainer !== undefined}
    <WithPokemonData let:data={pokemonData} pokemon={pokemon.pokemonId}>
        <WithMoveData let:data={moveData} moves={pokemon.moves.map(it => it.moveId)}>
            {#await Promise.all([pokemonData, moveData])}
                <Loader />
            {:then data}
                <PlayerPokemon pokemon={{
                    ...pokemon,
                    pokemonData: data[0],
                    moveData: data[1],
                }} />
            {/await}
        </WithMoveData>
    </WithPokemonData>
{/if}
