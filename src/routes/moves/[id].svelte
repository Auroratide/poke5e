<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch, params }) => {
        return fetch(`/moves/${params.id}.json`).then(async res => {
            if (res.status === 404)
                return { status: 404 }
            else
                return {
                    props: { move: await res.json() }
                }
            })
    }
</script>

<script lang="ts">
    import type { Move } from '$lib/moves/types'
    import Layout from './_layout.svelte'
    import PokeMove from '$lib/moves/PokeMove.svelte'

    export let move: Move
</script>

<svelte:head>
    <title>{move.name} | Pokemon 5e Reference</title>
</svelte:head>

<Layout>
    <PokeMove move={move} />
</Layout>
