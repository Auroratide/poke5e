<script lang='ts'>
    import type { TrainerPokemon } from '../types'

    export let pokemon: TrainerPokemon
</script>

<h2>General Notes</h2>
<div class="font-sm">
    {#each pokemon.notes.split('\n') as line}
        {#if line.length > 0}
            <p class="no-space-last">{line}</p>
        {/if}
    {/each}
</div>

<style>
    .font-sm {
        font-size: var(--font-sz-venus);
    }

    .no-space-last:last-child {
        margin: 0;
    }
</style>