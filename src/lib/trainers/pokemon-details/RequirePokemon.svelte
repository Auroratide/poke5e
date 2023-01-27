<script lang="ts">
    import type { PokemonId } from '$lib/trainers/types'
    import NoPokemon from './NoPokemon.svelte'
    import type { TrainerData } from '../data'
    import Title from '$lib/design/Title.svelte'

    export let trainer: TrainerData
    export let id: PokemonId
    export let titlePrefix: string | undefined = undefined

    $: hasPokemon = trainer.pokemon.find((it) => it.id === id)
</script>

{#if hasPokemon}
    <Title value="{titlePrefix ? `${titlePrefix} ` : ''}{hasPokemon.nickname}" />
    <slot></slot>
{:else}
    <Title value="Cannot find pokemon" />
    <NoPokemon trainer={trainer.info} pokemonId={id} />
{/if}
