<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'
    import { base } from '$app/paths'

    export const load: Load = async ({ fetch }) => {
        const tms = await fetch(`${base}/tms.json`)
            .then(res => res.json())
            .then(data => data.items)

        return {
            props: { tms },
        }
    }
</script>

<script lang="ts">
    import type { Tm } from '$lib/moves/types'
    import Layout from './_layout.svelte'
    import TmList from '$lib/moves/TmList.svelte'
    import Title from '$lib/design/Title.svelte'

    export let tms: Tm[]
</script>

<Title value="TMs" />
<Layout>
    <TmList slot="list" tms={tms} />
</Layout>
