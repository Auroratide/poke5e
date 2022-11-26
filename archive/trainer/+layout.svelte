<script lang="ts">
    import type { LayoutData } from './$types'
    import Page from '$lib/design/Page.svelte'
    import Pokeball from '$lib/design/icon/Pokeball.svelte'
    import Title from '$lib/design/Title.svelte'
    import PokemonList from '$lib/trainers/PokemonList.svelte'
    import Loader from '$lib/design/Loader.svelte'

    export let data: LayoutData
    $: trainer = data.trainer
</script>

<Title value="Trainer" />
<Page theme="green">
    <Pokeball slot="icon" />
    <nav slot="side" class="table" aria-label="Pokemon List">
        {#if trainer !== undefined}
            <PokemonList trainerId={trainer.name} pokemons={trainer.pokemon} />
        {:else}
            <Loader />
        {/if}
    </nav>
    <slot></slot>
</Page>

<style>
    nav {
        height: 100%;
    }
</style>
