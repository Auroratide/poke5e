<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'
    import { base } from '$app/paths'

    export const load: Load = async ({ fetch, params }) => {
        return fetch(`${base}/moves/${params.id}.json`).then(async res => {
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
    import Title from '$lib/design/Title.svelte'

    export let move: Move
</script>

<Title value={move.name} />
<Layout>
    <PokeMove move={move} />
</Layout>
