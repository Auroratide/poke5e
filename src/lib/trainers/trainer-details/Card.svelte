<script lang="ts">
    import Info from './Info.svelte'
    import Editor, { type UpdateDetail } from './Editor.svelte'
    import Card from '$lib/design/Card.svelte'
    import Button from '$lib/design/Button.svelte'
    import ActionArea from '$lib/design/Form/ActionArea.svelte'
    import type { TrainerStore } from '../trainers'

    export let trainer: TrainerStore

    let editing = false
    let saving = false
    const startEdit = () => editing = true

    const onCancel = () => {
        editing = false
    }

    const onUpdate = (e: CustomEvent<UpdateDetail>) => {
        saving = true
        trainer.update?.info(e.detail).then(() => {
            saving = false
            editing = false
        }).catch(() => {
            saving = false
        })
    }
</script>

<Card title={$trainer.info.name}>
    {#if editing}
        <Editor trainer={$trainer.info} on:update={onUpdate} on:cancel={onCancel} {saving} />
    {:else}
        <Info trainer={$trainer.info} />
        {#if trainer.update}
            <ActionArea>
                <Button on:click={startEdit}>Edit</Button>
            </ActionArea>
        {/if}
    {/if}
</Card>
