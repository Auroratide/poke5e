<script lang="ts">
    import type { LearnedMove } from '../types'
    import { moves } from '$lib/moves/store'

    export let move: LearnedMove
    export let disabled: boolean = false
</script>

<label for="move-name-input-{move.id}">Move</label>
<select id="move-name-input-{move.id}" bind:value={move.moveId}>
    {#each $moves as moveData}
        <option value={moveData.id}>{moveData.name}</option>
    {/each}
</select>
<label for="move-pp-input-{move.id}">Max PP</label>
<input id="move-pp-input-{move.id}" type="number" bind:value={move.pp.max} {disabled} />
<label for="move-notes-input-{move.id}" style:place-self="start">Notes</label>
<textarea id="move-notes-input-{move.id}" rows="5" bind:value={move.notes}></textarea>
