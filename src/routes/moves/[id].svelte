<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ params, stuff }) => {
        const move = stuff.moves.find(it => it.id === params.id)
        if (move !== undefined) {
            return {
                props: { move },
            }
        } else {
            return {
                status: 404,
            }
        }
    }
</script>

<script lang="ts">
    import type { Move } from '$lib/moves/types'
    import PokeMove from '$lib/moves/PokeMove.svelte'

    export let move: Move
</script>

<svelte:head>
    <title>{move.name} | Pokemon 5e Reference</title>
</svelte:head>

<PokeMove move={move} />
