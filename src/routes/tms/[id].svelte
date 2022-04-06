<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'
    import { base } from '$app/paths'

    export const load: Load = async ({ fetch, params }) => {
        return fetch(`${base}/tms/${params.id}.json`).then(async res => {
            if (res.status === 404)
                return { status: 404 }
            else
                return {
                    props: { tm: await res.json() }
                }
            })
    }
</script>

<script lang="ts">
    import type { Tm, Move } from '$lib/moves/types'
    import Layout from './_layout.svelte'
    import PokeMove from '$lib/moves/PokeMove.svelte'
    import Title from '$lib/design/Title.svelte'
    import TeachablePokemon from '$lib/moves/TeachablePokemon.svelte'

    export let tm: Tm
    $: move = tm.moveInfo as Move
</script>

<Title value={move.name} />
<Layout>
    <PokeMove move={move}>
        <section slot="extra">
            <TeachablePokemon pokemon={tm.pokemon} />
        </section>
    </PokeMove>
</Layout>
