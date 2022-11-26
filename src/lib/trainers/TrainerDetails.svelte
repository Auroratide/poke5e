<script lang="ts">
    import type { Trainer } from './types'
    import Card from '../design/Card.svelte'
    import FlatDl from '../design/FlatDl.svelte'

    export let trainer: Trainer
    $: title = trainer.name
</script>

<Card title={title}>
    <section class="info">
        <FlatDl columns={2}>
            <dt>Trainer Id</dt>
            <dd>{trainer.id}</dd>
        </FlatDl>
        <p>{trainer.description}</p>
    </section>
</Card>
