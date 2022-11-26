<script lang="ts">
    import { onMount } from 'svelte'
    import { page } from '$app/stores'
    import Page from '$lib/design/Page.svelte'
    import Pokeball from '$lib/design/icon/Pokeball.svelte'
    import Title from '$lib/design/Title.svelte'
    import Loader from '$lib/design/Loader.svelte'
    import { InMemoryClient, type TrainerClient } from '$lib/trainers/trainers'
    import TrainerCard from '$lib/trainers/trainer-details/Card.svelte'

    const client = InMemoryClient()
    let trainerClient: TrainerClient

    onMount(() => {
        const trainerId = $page.url.searchParams.get('id')
        if (trainerId) {
            trainerClient = client.trainer(trainerId)
        }
    })
</script>

<Title value="Trainer" />
<Page theme="green">
    <Pokeball slot="icon" />
    <nav slot="side" class="table" aria-label="Pokemon List">
        <Loader />
    </nav>
    {#if trainerClient == null}
        <Loader />
    {:else}
        <TrainerCard client={trainerClient} />
    {/if}
</Page>

<style>
    nav {
        height: 100%;
    }
</style>
