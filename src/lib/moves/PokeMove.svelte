<script lang="ts">
    import type { Move } from './types'
    import TypeTag from '../pokemon/TypeTag.svelte'
    import { renderHtml } from '../rendering/render'
    import { powerAsString } from './string'

    export let move: Move
</script>

<article class="poke-move" style:--skin-local="var(--skin-{move.type}-bg">
    <header>
        <h1>{move.name}</h1>
        <TypeTag type={move.type}></TypeTag>
    </header>
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
</article>

<style lang="scss">
    .poke-move {
        background-color: var(--skin-content);
        color: var(--skin-content-text);
        border-radius: 2em;
        box-shadow: var(--elev-cirrus);
        overflow: hidden;

        header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            background-color: var(--skin-bg);
            color: var(--skin-bg-text);
            padding: 0.5em 1em;
            margin-bottom: 0.5em;

            h1 {
                font-weight: 700;
                font-size: var(--font-sz-neptune);
            }
        }

        section {
            padding: 0 1em;
        }

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
    }
</style>
