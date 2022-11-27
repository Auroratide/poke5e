<script lang="ts">
    import { page } from '$app/stores'
    import { browser } from '$app/environment'
    import Page from '$lib/design/Page.svelte'
    import Pokeball from '$lib/design/icon/Pokeball.svelte'
    import Title from '$lib/design/Title.svelte'
    import Loader from '$lib/design/Loader.svelte'
    import TrainerCard from '$lib/trainers/trainer-details/Card.svelte'
    import PokemonCard from '$lib/trainers/pokemon-details/Card.svelte'
    import TrainerRoster from '$lib/trainers/trainer-details/Roster.svelte'
    import { type TrainerData, getTrainer } from '$lib/trainers/trainers'

    $: trainerId = $page.url.searchParams.get('id')
    $: pokemonId = $page.url.searchParams.get('pokemon')

    let trainer: Promise<undefined | TrainerData> | undefined

    $: {
        if (trainerId && browser) {
            trainer = getTrainer(trainerId)
        } else {
            trainer = undefined
        }
    }
</script>

<Title value="Trainer" />
<Page theme="green">
    <Pokeball slot="icon" />
    <nav slot="side" class="table" aria-label="Pokemon List">
        {#await trainer}
            <Loader />
        {:then trainer}
            {#if trainer}
                <TrainerRoster {trainer} />
            {/if}
        {/await}
    </nav>
    {#await trainer}
        <Loader />
    {:then trainer}
        {#if !trainer}
            <Loader />
        {:else if pokemonId}
            <PokemonCard {trainer} id={pokemonId} />
        {:else}
            <TrainerCard {trainer} />
        {/if}
    {/await}
</Page>

<style>
    nav {
        height: 100%;
    }
</style>
