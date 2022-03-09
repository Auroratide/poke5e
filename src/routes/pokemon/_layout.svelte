<!-- Cannot use named slots with normal layouts -->
<!-- https://github.com/sveltejs/kit/issues/627 -->

<script lang="ts">
    import Theme from '$lib/design/Theme.svelte'
    import PokemonList from '$lib/creatures/PokemonList.svelte'
    import Backdrop from '$lib/design/Backdrop.svelte'
    import IconShadow from '$lib/design/IconShadow.svelte'
    import Pokeball from '$lib/design/icon/Pokeball.svelte'
    import Loader from '$lib/design/Loader.svelte'
    import { pokemon } from '$lib/creatures/store'
</script>

<Theme theme="red">
    <IconShadow>
        <Pokeball />
    </IconShadow>
    <Backdrop />
    <div class="page">
        <nav class="table" aria-label="Pokemon List">
            <slot name="list">
                {#if $pokemon !== undefined}
                    <PokemonList pokemons={$pokemon} />
                {:else}
                    <Loader />
                {/if}
            </slot>
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
