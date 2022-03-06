<script lang="ts">
    import type { Move } from './types'
    import TypeTag from '../pokemon/TypeTag.svelte'

    export let move: Move
</script>

<article class="poke-move">
    <header>
        <h1>{move.name}</h1>
        <TypeTag type={move.type}></TypeTag>
    </header>
    <dl>
        <dt>Move Power</dt>
        <dd class="power">{move.power.join(', ')}</dd>
        <dt>Move Time</dt>
        <dd>{move.time}</dd>
        <dt><abbr title="Power Points">PP</abbr></dt>
        <dd>{move.pp}</dd>
        <dt>Duration</dt>
        <dd class="duration">{move.duration}</dd>
        <dt>Range</dt>
        <dd class="range">{move.range}</dd>
    </dl>
    <section>
        {@html move.description}
        <hr />
        <p><strong>At Higher Levels: </strong>{move.higherLevels}</p>
    </section>
</article>

<style lang="scss">
    .poke-move {
        background-color: #fff;
        border-radius: 2em;
        padding: 1em;
        box-shadow: 0 0.25em 0.75em rgba(0, 0, 0, 0.15);

        header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            h1 {
                font-weight: 700;
                font-size: var(--font-sz-neptune);
            }
        }

        dl {
            display: grid;
            grid-template-columns: auto 1fr;
            column-gap: 0.5em;

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
    }
</style>
