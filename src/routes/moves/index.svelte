<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'
    import { assets } from '$app/paths'

    export const load: Load = async ({ fetch }) => {
        const moves = await fetch(`${assets}/data/moves.json`)
            .then(res => res.json())
            .then(data => data.moves)

        return {
            props: { moves },
        }
    }
</script>

<script lang="ts">
    import type { Move } from '$lib/moves/types'
    import Layout from './_layout.svelte'
    import MoveList from '$lib/moves/MoveList.svelte'

    export let moves: Move[]
</script>

<svelte:head>
    <title>Pokemon Moves | Pokemon 5e Reference</title>
</svelte:head>

<Layout>
    <MoveList slot="list" {moves} />
</Layout>
