<script lang="ts">
    import Page from '$lib/design/Page.svelte'
    import Pokeball from '$lib/design/icon/Pokeball.svelte'
    import Title from '$lib/design/Title.svelte'
    import PlayerPokemon from '$lib/player/PlayerPokemon.svelte'
    import { inMemoryPokemon } from '$lib/player/data'
    import { pokemon } from '$lib/creatures/store'
    import Loader from '$lib/design/Loader.svelte'
</script>

<Title value="My Pokemon" />
<Page theme="purple">
    <Pokeball slot="icon" />
    <nav slot="side" class="table" aria-label="Pokemon List">
        <p>Something</p>
    </nav>
    {#if $pokemon === undefined}
        <Loader />
    {:else}
        <PlayerPokemon pokemon={Object.assign({}, inMemoryPokemon[0], {
            pokemonData: $pokemon.find(it => it.id === inMemoryPokemon[0].pokemonId)
        })} />
    {/if}
</Page>

<style lang="scss">
    nav {
        height: 100%;
    }
</style>