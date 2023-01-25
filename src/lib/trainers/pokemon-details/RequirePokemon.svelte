<script lang="ts">
    import type { PokemonId } from '$lib/trainers/types'
    import NoPokemon from './NoPokemon.svelte'
    import type { TrainerData } from '../data'

    export let trainer: TrainerData
    export let id: PokemonId

    $: hasPokemon = trainer.pokemon.find((it) => it.id === id)
</script>

{#if hasPokemon}
    <slot></slot>
{:else}
    <NoPokemon trainer={trainer.info} pokemonId={id} />
{/if}
