<script lang="ts">
    import { page } from '$app/stores'
    import { browser } from '$app/environment'
    import Page from '$lib/design/Page.svelte'
    import IdBadge from '$lib/design/icon/IdBadge.svelte'
    import Title from '$lib/design/Title.svelte'
    import Loader from '$lib/design/Loader.svelte'
    import TrainerCard from '$lib/trainers/trainer-details/Card.svelte'
    import PokemonCard from '$lib/trainers/pokemon-details/Card.svelte'
    import TrainerRoster from '$lib/trainers/trainer-details/Roster.svelte'
    import { trainers, type TrainerListStore, type TrainerStore } from '$lib/trainers/trainers'
    import { PageAction } from '$lib/trainers/page-action'
    import AddPokemonCard from '$lib/trainers/AddPokemonCard.svelte'
    import TrainerList from '$lib/trainers/TrainerList.svelte'
    import NewTrainerCard from '$lib/trainers/NewTrainerCard.svelte'
    import RemovePokemonCard from '$lib/trainers/pokemon-details/RemovePokemonCard.svelte'
    import EditPokemonCard from '$lib/trainers/pokemon-details/EditPokemonCard.svelte'
    import EvolvePokemonCard from '$lib/trainers/pokemon-details/EvolvePokemonCard.svelte'
    import NoTrainer from '$lib/trainers/trainer-details/NoTrainer.svelte'
    import FindTrainerCard from '$lib/trainers/FindTrainerCard.svelte'
    import EditTrainerCard from '$lib/trainers/trainer-details/EditTrainerCard.svelte'

    $: trainerId = browser ? $page.url.searchParams.get('id') : undefined
    $: pokemonId = browser ? $page.url.searchParams.get('pokemon') : undefined
    $: action = browser ? $page.url.searchParams.get('action') : undefined

    let trainerList: Promise<undefined | TrainerListStore> | undefined
    let trainer: Promise<undefined | TrainerStore> | undefined

    $: {
        if (trainerId && browser) {
            trainerList = undefined
            trainer = trainers.get(trainerId)
        } else if (!trainerId && browser) {
            trainerList = trainers.all()
            trainer = undefined
        } else {
            trainer = undefined
            trainerList = undefined
        }
    }
</script>

<Title value="Trainer" />
<Page theme="green">
    <IdBadge slot="icon" />
    <nav slot="side" class="table" aria-label="Pokemon List">
        {#if trainerId}
            {#await trainer}
                <Loader />
            {:then trainer}
                {#if trainer}
                    <TrainerRoster {trainer} currentPokemon={pokemonId} />
                {:else}
                    <NoTrainer trainerKey={trainerId} />
                {/if}
            {/await}
        {:else}
            {#await trainerList}
                <Loader />
            {:then trainerList}
                {#if trainerList}
                    <TrainerList trainers={trainerList} />
                {/if}
            {/await}
        {/if}
    </nav>
    {#if trainerId}
        {#await trainer}
            <Loader />
        {:then trainer}
            {#if !trainer}
                <br />
            {:else if action === PageAction.addPokemon}
                <AddPokemonCard {trainer} />
            {:else if action === PageAction.editPokemon}
                <EditPokemonCard {trainer} id={pokemonId} />
            {:else if action === PageAction.evolvePokemon}
                <EvolvePokemonCard {trainer} id={pokemonId} />
            {:else if action === PageAction.removePokemon}
                <RemovePokemonCard {trainer} id={pokemonId} />
            {:else if pokemonId}
                <PokemonCard {trainer} id={pokemonId} />
            {:else if action === PageAction.editTrainer}
                <EditTrainerCard {trainer} />
            {:else}
                <TrainerCard {trainer} />
            {/if}
        {/await}
    {:else}
        {#if action === PageAction.newTrainer}
            <NewTrainerCard />
        {:else if action === PageAction.findTrainer}
            <FindTrainerCard />
        {/if}
    {/if}
</Page>

<style>
    nav {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
</style>
