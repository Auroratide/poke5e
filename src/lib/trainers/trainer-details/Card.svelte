<script lang="ts">
    import Info from './Info.svelte'
    import Card from '$lib/design/Card.svelte'
    import Button from '$lib/design/Button.svelte'
    import ActionArea from '$lib/design/Form/ActionArea.svelte'
    import type { TrainerStore } from '../trainers'
    import { Url } from '$lib/url'
    import { PageAction } from '../page-action'

    export let trainer: TrainerStore
</script>

<Card title={$trainer.info.name}>
    <Info trainer={$trainer.info} />
    {#if trainer.update}
        <ActionArea>
            <Button href="{Url.trainers($trainer.info.readKey, undefined, PageAction.editTrainer)}">Edit</Button>
        </ActionArea>
    {/if}
</Card>
