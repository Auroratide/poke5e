<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'
    import { base } from '$app/paths'

    export const load: Load = async ({ fetch }) => {
        const moves = await fetch(`${base}/moves.json`)
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
    import Title from '$lib/design/Title.svelte'

    export let moves: Move[]
</script>

<Title value="Pokemon Moves" />
<Layout>
    <MoveList slot="list" {moves} />
</Layout>
