<script lang="ts">
    import Card from '$lib/design/Card.svelte'
    import { pokemon } from '$lib/creatures/store'
    import Button from '$lib/design/Button.svelte'
    import { trainers, type TrainerStore } from './trainers'
    import { matchNameOrType } from '$lib/creatures/filter'
    import Loader from '$lib/design/Loader.svelte'
    import type { Pokemon } from '$lib/creatures/types'
    import { goto } from '$app/navigation'
    import { base } from '$app/paths'
    import Saveable from '$lib/design/Saveable.svelte'
    import ActionArea from '$lib/design/Form/ActionArea.svelte'
    import Fieldset from '$lib/design/Form/Fieldset.svelte'

    let name = ''
    let description = ''
    
    let saving = false
    $: disabled = saving
    const onCreate = () => {
        saving = true
        trainers.new({
            name,
            description,
        }).then(({ info }) => {
            goto(`${base}/trainers?id=${info.readKey}`)
        })
    }

    const cancel = () => {
        goto(`${base}/trainers`)
    }
</script>

<Card title="Create a New Trainer">
    <section>
        <Saveable {saving}>
            <form on:submit|preventDefault={onCreate}>
                <Fieldset title="Basic Info">
                    <label for="name-input">Name</label>
                    <input name="name" required id="name-input" type="text" bind:value={name} {disabled} />
                    <label for="description-input" style:place-self="start">Description</label>
                    <textarea name="description" id="description-input" bind:value={description} rows="6" {disabled}></textarea>
                </Fieldset>
                <ActionArea>
                    <Button on:click={cancel} variant="ghost" {disabled}>Cancel</Button>
                    <Button type="submit" {disabled}>Finish!</Button>
                </ActionArea>
            </form>
        </Saveable>
    </section>
</Card>

<style>
    .no-list {
        list-style: none;
        padding: 0;
    }

    .columnated {
        column-count: 2;
    }

    .spaced-lg {
        margin-bottom: 1em;
    }

    .spaced-sm {
        margin-bottom: 0.25em;
    }

    .font-lg {
        font-size: 1.5rem;
    }

    .font-sm {
        font-size: 1rem;
    }

    .vertical {
        display: flex;
        flex-direction: column;
    }

    .muted {
        opacity: 0.75;
    }

    .center {
        text-align: center;
    }
</style>