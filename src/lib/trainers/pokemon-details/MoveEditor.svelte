<script lang="ts">
    import type { LearnedMove } from '../types'
    import { moves } from '$lib/moves/store'
    import { createEventDispatcher } from 'svelte'
    import Button from '$lib/design/Button.svelte'

    const dispatch = createEventDispatcher()

    export let move: LearnedMove
    export let disabled: boolean = false

    const onMoveChange = () => {
        const pp = $moves.find((it) => it.id === move.moveId)?.pp ?? 0
        move.pp.current = pp
        move.pp.max = pp
    }

    const onRemove = () => {
        dispatch('remove')
    }
</script>

<label for="move-name-input-{move.id}">Move</label>
<div class="flex-row">
    <select id="move-name-input-{move.id}" bind:value={move.moveId} on:change={onMoveChange} style:flex="1">
        {#each $moves as moveData}
            <option value={moveData.id}>{moveData.name}</option>
        {/each}
    </select>
    <Button on:click={onRemove}>Remove</Button>
</div>
<label for="move-pp-input-{move.id}">Max PP</label>
<input id="move-pp-input-{move.id}" type="number" bind:value={move.pp.max} {disabled} />
<label for="move-notes-input-{move.id}" style:place-self="start">Notes</label>
<textarea id="move-notes-input-{move.id}" rows="5" bind:value={move.notes} style:margin-block-end="1em"></textarea>

<style>
    .flex-row {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
    }
</style>
