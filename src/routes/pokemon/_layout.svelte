<!-- Cannot use named slots with normal layouts -->
<!-- https://github.com/sveltejs/kit/issues/627 -->

<script lang="ts">
    import Page from '$lib/design/Page.svelte'
    import PokemonList from '$lib/creatures/PokemonList.svelte'
    import Pokeball from '$lib/design/icon/Pokeball.svelte'
    import Loader from '$lib/design/Loader.svelte'
    import { pokemon } from '$lib/creatures/store'
</script>

<Page theme="red">
    <Pokeball slot="icon" />
    <nav slot="side" class="table" aria-label="Pokemon List">
        <slot name="list">
            {#if $pokemon !== undefined}
                <PokemonList pokemons={$pokemon} />
            {:else}
                <Loader />
            {/if}
        </slot>
    </nav>
    <slot></slot>
</Page>

<style lang="scss">
    nav {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
</style>
