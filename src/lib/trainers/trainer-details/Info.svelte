<script lang="ts">
    import type { Trainer } from '../types'
    import FlatDl from '$lib/design/FlatDl.svelte'
    import Paragraphs from '$lib/design/Paragraphs.svelte'

    
    export let trainer: Trainer
</script>

<section class="info">
    <FlatDl columns={2}>
        <dt>Trainer Id</dt>
        <dd>{trainer.readKey}</dd>
    </FlatDl>
    <Paragraphs value={trainer.description} />
</section>
