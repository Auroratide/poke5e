<script lang="ts" context="module">
    export type UpdateDetail = TrainerInfo
</script>

<script lang="ts">
    import type { Trainer, TrainerInfo } from '../types'
    import { createEventDispatcher } from 'svelte'
    import Button from '$lib/design/Button.svelte'
    import Fieldset from '$lib/design/Form/Fieldset.svelte'
    import ActionArea from '$lib/design/Form/ActionArea.svelte'
    
    const dispatch = createEventDispatcher()

    export let trainer: Trainer
    export let saving: boolean = false

    let name = trainer.name
    let description = trainer.description

    const cancel = () => {
        dispatch('cancel')
    }
    const endEdit = () => {
        dispatch('update', {
            name,
            description,
        })
    }
</script>

<form on:submit|preventDefault={endEdit}>
    <Fieldset title="Basic Info">
        <label for="name-input">Name</label>
        <input name="name" id="name-input" type="text" bind:value={name} />
        <label for="description-input" style:place-self="start">Description</label>
        <textarea name="description" id="description-input" bind:value={description} rows="6"></textarea>
    </Fieldset>
    <ActionArea>
        <Button on:click={cancel} variant="ghost" disabled={saving}>Cancel</Button>
        <Button type="submit" disabled={saving}>Finish!</Button>
    </ActionArea>
</form>
