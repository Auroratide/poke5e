<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const moves = await fetch('/data/moves.json')
            .then(res => res.json())
            .then(json => json.moves)
        
        return {
            props: { moves },
            stuff: { moves },
        }
    }
</script>

<script lang="ts">
    import type { Move } from '$lib/moves/types'
    import Theme from '$lib/design/Theme.svelte'
    import MoveList from '$lib/moves/MoveList.svelte'
    import Backdrop from '$lib/design/Backdrop.svelte'

    export let moves: Move[]
</script>

<Theme theme="blue">
    <Backdrop />
    <div class="page">
        <nav class="table" aria-label="Move List">
            <MoveList {moves} />
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
