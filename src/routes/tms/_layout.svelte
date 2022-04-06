<!-- Cannot use named slots with normal layouts -->
<!-- https://github.com/sveltejs/kit/issues/627 -->

<script lang="ts">
    import Page from '$lib/design/Page.svelte'
    import MoveList from '$lib/moves/MoveList.svelte'
    import Pokeball from '$lib/design/icon/Pokeball.svelte'
    import Loader from '$lib/design/Loader.svelte'
    import type { Move } from '$lib/moves/types'
    import { tms } from '$lib/moves/store'

    $: moves = $tms?.map(it => it.moveInfo as Move)
</script>

<Page theme="purple">
    <Pokeball slot="icon" />
    <nav slot="side" aria-label="TM List">
        <slot name="list">
            {#if moves !== undefined}
                <MoveList moves={moves} />
            {:else}
                <Loader />
            {/if}
        </slot>
    </nav>
    <slot></slot>
</Page>

<style lang="scss">
    nav {
        height: 100%;
    }
</style>
