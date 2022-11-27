<script lang="ts">
    import Info from './Info.svelte'
    import Editor, { type UpdateDetail } from './Editor.svelte'
    import Card from '$lib/design/Card.svelte'
    import Button from '$lib/design/Button.svelte'
    import ActionArea from '$lib/design/Form/ActionArea.svelte'
    import type { TrainerData } from '../trainers'

    export let trainer: TrainerData

    let editing = false
    const startEdit = () => editing = true

    const onCancel = () => {
        editing = false
    }

    const onUpdate = (e: CustomEvent<UpdateDetail>) => {
        editing = false

        trainer = {
            ...trainer,
            info: {
                ...trainer.info,
                ...e.detail,
            }
        }

        // client.update(e.detail)
    }
</script>

<Card title={trainer.info.name}>
    {#if editing}
        <Editor trainer={trainer.info} on:update={onUpdate} on:cancel={onCancel} />
    {:else}
        <Info trainer={trainer.info} />
        {#if trainer.writable}
            <ActionArea>
                <Button on:click={startEdit}>Edit</Button>
            </ActionArea>
        {/if}
    {/if}
</Card>
