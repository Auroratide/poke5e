<script lang="ts">
    import type { Trainer } from '$lib/trainers/types'
    import type { TrainerClient } from '$lib/trainers/trainers'
    import { onMount } from 'svelte'
    import Loader from '$lib/design/Loader.svelte'
    import Info from './Info.svelte'
    import Editor from './Editor.svelte'
    import Card from '$lib/design/Card.svelte'
    import Button from '$lib/design/Button.svelte'
    import ActionArea from '$lib/design/Form/ActionArea.svelte'

    export let client: TrainerClient
    $: canEdit = client.update != null

    let trainer: Trainer
    let editing = false

    const startEdit = () => editing = true

    onMount(() => {
        client.get().then((data) => trainer = data)
    })

    const onCancel = () => {
        editing = false
    }

    const onUpdate = (e: CustomEvent) => {
        editing = false

        trainer = {
            ...trainer,
            ...e.detail,
        }

        client.update(e.detail)
    }
</script>

{#if trainer}
    <Card title={trainer.name}>
        {#if editing}
            <Editor {trainer} on:update={onUpdate} on:cancel={onCancel} />
        {:else}
            <Info {trainer} />
            {#if canEdit}
                <ActionArea>
                    <Button on:click={startEdit}>Edit</Button>
                </ActionArea>
            {/if}
        {/if}
    </Card>
{:else}
    <Loader />
{/if}
