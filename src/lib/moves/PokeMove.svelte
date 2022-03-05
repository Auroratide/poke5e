<script lang="ts">
    import type { Move } from './types'

    export let move: Move
</script>

<article class="poke-move">
    <header>
        <h2>{move.name}</h2>
        <span class="type">{move.type}</span>
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
        header {
            display: flex;
            align-items: center;
            justify-content: space-between;    
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

        .type, .duration, .range {
            text-transform: capitalize;
        }
    }
</style>
