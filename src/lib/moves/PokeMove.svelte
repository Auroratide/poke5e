<script lang="ts">
    import type { Move } from './types'
    import Card from '../design/Card.svelte'
    import FlatDl from '../design/FlatDl.svelte'
    import TypeTag from '../pokemon/TypeTag.svelte'
    import { renderHtml } from '../rendering/render'
    import { powerAsString } from './string'

    export let move: Move
</script>

<Card title={move.name}>
    <TypeTag slot="header-extra" type={[move.type]}></TypeTag>
    <section class="info">
        <FlatDl>
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
        </FlatDl>
    </section>
    <section class="description">
        {@html renderHtml(move.description)}
        {#if move.higherLevels !== undefined}
            <p><strong>At Higher Levels: </strong>{move.higherLevels}</p>
        {/if}
        {#if move.optional !== undefined}
            <p class="optional-heading"><strong>Optional Rules:</strong></p>
            {@html renderHtml(move.optional)}
        {/if}
    </section>
</Card>

<style lang="scss">
    .power {
        text-transform: uppercase;
    }

    .duration, .range {
        text-transform: capitalize;
    }

    .description {
        line-height: 1.5;

        :global {
            table {
                border-collapse: collapse;
                margin: 0 auto 1em;
                font-size: var(--font-sz-venus);
            
                th {
                    background-color: var(--skin-bg-dark);
                    color: var(--skin-bg-text);
                    border-bottom: 0.125em solid var(--skin-bg-text);
                    text-align: left;
                }

                tbody tr:nth-child(odd) td {
                    background-color: var(--skin-bg);
                    color: var(--skin-bg-text);
                }

                tbody tr:nth-child(even) td {
                    background-color: var(--skin-bg-dark);
                    color: var(--skin-bg-text);
                }

                th, td {
                    padding: 0.125em 1em;
                }
            }
        }
    }

    .optional-heading {
        margin-bottom: 0.15em;
    }
</style>
