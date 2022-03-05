<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const moves = await fetch('/moves.json')
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
    import PokeMove from '$lib/moves/PokeMove.svelte'

    export let moves: Move[]
</script>

<svelte:head>
    <title>Pokemon Moves | Pokemon 5e Tools</title>
</svelte:head>

<main>
    <h1>Pokemon Moves</h1>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Power</th>
            </tr>
        </thead>
        <tbody>
            {#each moves as move}
                <tr>
                    <td><a href="/moves/{move.id}">{move.name}</a></td>
                    <td>{move.type}</td>
                    <td>{move.power.join(', ')}</td>
                </tr>
            {/each}
        </tbody>
    </table>
    <slot></slot>
</main>
