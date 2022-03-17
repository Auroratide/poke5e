<!-- Cannot use named slots with normal layouts -->
<!-- https://github.com/sveltejs/kit/issues/627 -->

<script lang="ts">
    import Page from '$lib/design/Page.svelte'
    import MoveList from '$lib/moves/MoveList.svelte'
    import Pokeball from '$lib/design/icon/Pokeball.svelte'
    import Loader from '$lib/design/Loader.svelte'
    import { moves } from '$lib/moves/store'
</script>

<Page theme="blue">
    <Pokeball slot="icon" />
    <nav slot="side" class="table" aria-label="Pokemon List">
        <slot name="list">
            {#if $moves !== undefined}
                <MoveList moves={$moves} />
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
