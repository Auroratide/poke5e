<script lang="ts">
    import type { TrainerPokemon } from '../types'
    import MoveDetails from './MoveDetails.svelte'
    import { moves } from '$lib/moves/store'
    import Loader from '$lib/design/Loader.svelte'
    import { proficiencyBonus } from '$lib/dnd/proficiency'

    export let pokemon: TrainerPokemon
    $: pb = proficiencyBonus(pokemon.level)
</script>

{#if pokemon.moves.length > 0}
    {#if $moves}
        <h2 style:font-size="var(--font-sz-neptune)" style:margin-bottom="0.5em">Moves</h2>
        <ul style:list-style="none" style:padding="0">
            {#each pokemon.moves as move}
                {@const moveData = $moves.find((it) => it.id === move.moveId)}
                <li>
                    <MoveDetails {move} {moveData} proficiencyBonus={pb} attributes={pokemon.attributes} />
                </li>
            {/each}
        </ul>
    {:else}
        <Loader />
    {/if}
{/if}
