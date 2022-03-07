<script lang="ts">
    import type { Pokemon } from './types'
    import TypeTag from '../pokemon/TypeTag.svelte'

    export let pokemon: Pokemon
</script>

<article class="pokemon">
    <header>
        <h1>{pokemon.name}</h1>
    </header>
    <section class="stats">
        <dl>
            <dt>Armor Class</dt>
            <dd>{pokemon.ac}</dd>
            <dt>Hit Points</dt>
            <dd>{pokemon.hp} ({pokemon.hitDice})</dd>
            <dt>Speed</dt>
            <dd>???</dd>
        </dl>
        <dl>
            <dt>str</dt>
            <dd>{pokemon.attributes.str}</dd>
            <dt>dex</dt>
            <dd>{pokemon.attributes.dex}</dd>
            <dt>con</dt>
            <dd>{pokemon.attributes.con}</dd>
            <dt>int</dt>
            <dd>{pokemon.attributes.int}</dd>
            <dt>wis</dt>
            <dd>{pokemon.attributes.wis}</dd>
            <dt>cha</dt>
            <dd>{pokemon.attributes.cha}</dd>
        </dl>
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
