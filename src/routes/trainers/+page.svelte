<script lang="ts">
    import type { Trainer } from '$lib/trainers/types'
    import { onMount } from 'svelte'
    import { page } from '$app/stores'
    import Page from '$lib/design/Page.svelte'
    import Pokeball from '$lib/design/icon/Pokeball.svelte'
    import Title from '$lib/design/Title.svelte'
    import Loader from '$lib/design/Loader.svelte'
    import { InMemoryTrainerClient } from '$lib/trainers/trainers'
    import TrainerDetails from '$lib/trainers/TrainerDetails.svelte'

    const client = InMemoryTrainerClient()
    let trainer: Promise<Trainer>

    onMount(() => {
        const trainerId = $page.url.searchParams.get('id')
        if (trainerId) {
            trainer = client.trainer(trainerId)
        }
    })
</script>

<Title value="Trainer" />
<Page theme="green">
    <Pokeball slot="icon" />
    <nav slot="side" class="table" aria-label="Pokemon List">
        <Loader />
    </nav>
    {#if trainer == null}
        <Loader />
    {:else}
        {#await trainer}
            <Loader />
        {:then trainer}
            <TrainerDetails {trainer} />
        {/await}
    {/if}
</Page>

<style>
    nav {
        height: 100%;
    }
</style>
