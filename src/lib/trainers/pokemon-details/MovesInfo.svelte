<script lang="ts">
    import type { LearnedMove, TrainerPokemon } from '../types'
    import MoveDetails from './MoveDetails.svelte'
    import { moves } from '$lib/moves/store'
    import Loader from '$lib/design/Loader.svelte'
    import { proficiencyBonus } from '$lib/dnd/proficiency'
    import { createEventDispatcher } from 'svelte'
    import type { UpdatePpDetail } from './MoveDetails.svelte'

    const dispatch = createEventDispatcher()

    export let pokemon: TrainerPokemon
    export let editable: boolean = false
    $: pb = proficiencyBonus(pokemon.level)

    const onUpdate = (move: LearnedMove) => (e: CustomEvent<UpdatePpDetail>) => {
        dispatch('update', {
            ...move,
            pp: {
                current: e.detail.value,
                max: move.pp.max,
            },
        } as LearnedMove)
    }
</script>

{#if pokemon.moves.length > 0}
    {#if $moves}
        <h2>Moves</h2>
        <ul style:list-style="none" style:padding="0">
            {#each pokemon.moves as move}
                {@const moveData = $moves.find((it) => it.id === move.moveId)}
                <li>
                    <MoveDetails {move} {moveData} {editable} proficiencyBonus={pb} attributes={pokemon.attributes} pokemonType={pokemon.type} on:update={onUpdate(move)} />
                </li>
            {/each}
        </ul>
    {:else}
        <Loader />
    {/if}
{/if}
