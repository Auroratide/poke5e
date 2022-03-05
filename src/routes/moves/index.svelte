<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'


    export const load: Load = async ({ fetch }) => {
        const moves = await fetch('/moves.json')
            .then(res => res.json())
            .then(json => json.moves)
        
        return {
            props: { moves },
        }
    }
</script>

<script lang="ts">
    import type { Move } from '$lib/moves/types'
    import PokeMove from '$lib/moves/PokeMove.svelte'

    export let moves: Move[]
</script>

<PokeMove move={moves[0]} />
