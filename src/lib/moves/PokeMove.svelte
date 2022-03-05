<script lang="ts">
    import type { Move } from './types'

    export let move: Move
</script>

<article>
    <h1>{move.name}</h1>
    <dl>
        <dt>Type</dt>
        <dd>{move.type}</dd>
        <dt>Power</dt>
        <dd>{move.power.join(', ')}</dd>
    </dl>
    <section>
        {@html move.description}
    </section>
</article>
