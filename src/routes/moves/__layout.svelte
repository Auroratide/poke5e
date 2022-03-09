<script lang="ts">
    import Theme from '$lib/design/Theme.svelte'
    import MoveList from '$lib/moves/MoveList.svelte'
    import IconShadow from '$lib/design/IconShadow.svelte'
    import Hit from '$lib/design/icon/Hit.svelte'
    import Backdrop from '$lib/design/Backdrop.svelte'
    import Loader from '$lib/design/Loader.svelte'
    import { moves } from '$lib/moves/store'
</script>

<Theme theme="blue">
    <IconShadow>
        <Hit />
    </IconShadow>
    <Backdrop />
    <div class="page">
        <nav class="table" aria-label="Move List">
            {#if $moves !== undefined}
                <MoveList moves={$moves} />
            {:else}
                <Loader />
            {/if}
        </nav>
        <main>
            <slot></slot>
        </main>
    </div>
</Theme>

<style lang="scss">
    .page {
        height: 100%;
        max-width: calc(0.5 * var(--container-width));
        margin: auto;

        nav, main {
            padding: 0.5em;
        }

        nav {
            height: 33%;
        }

        main {
            height: 67%;
        }
    }

    @media screen and (min-width: 75rem) {
        .page {
            display: flex;
            flex-wrap: wrap;
            margin: auto;
            justify-content: center;
            max-width: 75rem;
            height: 100%;

            nav, main {
                flex: 0 1 37.5rem;
                height: 100%;
            }
        }
    }
</style>
