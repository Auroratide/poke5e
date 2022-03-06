<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const moves = await fetch('/data/moves.json')
            .then(res => res.json())
            .then(json => json.moves)
        
        return {
            props: { moves },
            stuff: { moves },
        }
    }
</script>

<script lang="ts">
    import type { Move } from '$lib/moves/types'
    import SortableTable from '$lib/design/SortableTable.svelte'
    import MoveList from '$lib/moves/MoveList.svelte'
    import Backdrop from '$lib/design/Backdrop.svelte'

    export let moves: Move[]
</script>

<svelte:head>
    <title>Pokemon Moves | Pokemon 5e Tools</title>
</svelte:head>

<Backdrop />
<div class="page">
    <nav class="table" aria-label="Move List">
        <MoveList {moves} />
    </nav>
    <main>
        <slot></slot>
    </main>
</div>

<style lang="scss">
    .page {
        display: flex;
        flex-wrap: wrap;
        margin: auto;
        justify-content: center;
        max-width: 75rem;

        & > * {
            flex: 0 0 min(37.5rem, 100%);
            padding: 0.5em;
        }
    }
</style>
