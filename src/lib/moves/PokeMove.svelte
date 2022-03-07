<script lang="ts">
    import type { Move } from './types'
    import Card from '../design/Card.svelte'
    import TypeTag from '../pokemon/TypeTag.svelte'
    import { renderHtml } from '../rendering/render'
    import { powerAsString } from './string'

    export let move: Move
</script>

<Card title={move.name}>
    <TypeTag slot="header-extra" type={move.type}></TypeTag>
    <section class="info">
        <dl>
            <dt>Move Power</dt>
            <dd class="power">{powerAsString(move.power)}</dd>
            <dt>Move Time</dt>
            <dd>{move.time}</dd>
            <dt><abbr title="Power Points">PP</abbr></dt>
            <dd>{move.pp}</dd>
            <dt>Duration</dt>
            <dd class="duration">{move.duration}</dd>
            <dt>Range</dt>
            <dd class="range">{move.range}</dd>
        </dl>
    </section>
    <section class="description">
        {@html renderHtml(move.description)}
        {#if move.higherLevels !== undefined}
            <p><strong>At Higher Levels: </strong>{move.higherLevels}</p>
        {/if}
    </section>
</Card>

<style lang="scss">
    dl {
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 0.5em;
        font-size: var(--font-sz-venus);
        line-height: 1.25;

        dt {
            font-weight: 700;

            &::after {
                content: ':';
            }
        }

        dd {
            margin: 0;
        }
    }

    .power {
        text-transform: uppercase;
    }

    .duration, .range {
        text-transform: capitalize;
    }

    .description {
        line-height: 1.5;
    }
</style>
