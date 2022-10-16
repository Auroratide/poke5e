<script lang="ts">
    import type { PageData } from './$types'
    import Layout from './_layout.svelte'
    import MoveList from '$lib/moves/MoveList.svelte'
    import Title from '$lib/design/Title.svelte'

    export let data: PageData
    $: moves = data.moves
</script>

<Title value="Pokemon Moves" />
<Layout>
    <MoveList slot="list" {moves} />
</Layout>
