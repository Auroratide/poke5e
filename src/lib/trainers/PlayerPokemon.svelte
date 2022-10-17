<script lang="ts">
    import type { PlayerPokemon, WithPokemonData, WithMoveData } from './types'
    import Card from '../design/Card.svelte'
    import AttributeBlock from '../dnd/AttributeBlock.svelte'
    import TypeTag from '../pokemon/TypeTag.svelte'
    import FlatDl from '../design/FlatDl.svelte'
    import NumericResourceInput from './NumericResourceInput.svelte'
    import ResourceBar from './ResourceBar.svelte'
    import { proficiencyBonus, proficiencyModifier } from '../dnd/proficiency'
    import GenderIcon from './GenderIcon.svelte'
    import { modifierForScore } from '../dnd/attributes'
    import VisuallyHidden from '../design/VisuallyHidden.svelte'
    import TypeEffectiveness from '../creatures/TypeEffectiveness.svelte'
    import * as asString from '../creatures/string'
    import Modal from '../design/Modal.svelte'
    import PokemonEditor from './PokemonEditor'
    import LearnedMove from './LearnedMove.svelte'

    export let pokemon: PlayerPokemon & WithPokemonData & WithMoveData
    let hp = pokemon.hp.current
    let hitDice = pokemon.hitDice.current
    $: data = pokemon.pokemonData

    $: title = pokemon.nickname ?? pokemon.pokemonData.name
    $: pb = proficiencyBonus(pokemon.level)

    let modalVisible = false

    const openModal = () => modalVisible = true
    const closeModal = () => modalVisible = false
</script>

<Modal title="Edit Pokemon" isOpen={modalVisible} on:dismiss={closeModal}>
    <PokemonEditor {pokemon} />
</Modal>
<Card title={title}>
    <TypeTag slot="header-extra" type={data.type} />
    <section class="health">
        <span class="name">{data.name} <span class="gender"><GenderIcon gender={pokemon.gender} /></span></span>
        <span class="level"><span class="level-text">Lv.</span><span class="level-number">{pokemon.level}</span></span>
        <span class="bar"><ResourceBar current={hp} max={pokemon.hp.max} /></span>
        <span class="hp">
            <VisuallyHidden><label for="current-hp">HP</label></VisuallyHidden>
            <span class="current-hp"><NumericResourceInput id="current-hp" bind:value={hp} /></span>
            <span class="max-hp">/ {pokemon.hp.max}</span>
        </span>
        <span class="hit-dice">
            <span class="hit-dice-bar"><ResourceBar secondary current={hitDice} max={pokemon.hitDice.max} /></span>
            <span class="hit-dice-text">
                <VisuallyHidden><label for="current-hit-dice">Hit Dice</label></VisuallyHidden>
                <span class="current-hit-dice"><NumericResourceInput id="current-hit-dice" bind:value={hitDice} /></span>
                <span class="max-hit-dice">/ {pokemon.hitDice.max} ({data.hitDice})</span>
            </span>
        </span>
    </section>
    <hr />
    <section class="stats">
        <FlatDl columns={2}>
            <dt>Armor Class</dt>
            <dd>{pokemon.ac}</dd>
            <dt>Nature</dt>
            <dd class="cap">{pokemon.nature}</dd>
            <dt>Proficiency</dt>
            <dd>+{pb}</dd>
            <dt>Size</dt>
            <dd class="cap">{data.size}</dd>
            <dt>Speed</dt>
            <div>
                {#each data.speed as speed}
                    <dd>{asString.speed(speed)}</dd>
                {/each}
            </div>
            {#if data.senses.length > 0}
                <dt>Senses</dt>
                <div class="cap">
                    {#each data.senses as sense}
                        <dd>{asString.sense(sense)}</dd>
                    {/each}
                </div>
            {/if}
        </FlatDl>
        <AttributeBlock attributes={pokemon.attributes} />
    </section>
    <section class="skills">
        <FlatDl columns={2}>
            <dt>Saves</dt>
            <div class="upper">
                {#each pokemon.savingThrows as savingThrow}
                    <dd>{savingThrow} +{modifierForScore(pokemon.attributes[savingThrow]) + pb}</dd>
                {/each}
            </div>
            <dt>Proficiencies</dt>
            <div class="cap">
                {#each pokemon.proficiencies as proficiency}
                    <dd>{proficiency} +{proficiencyModifier(proficiency, pokemon.attributes, pb)}</dd>
                {/each}
            </div>
        </FlatDl>
        <FlatDl>
            <TypeEffectiveness type={data.type} />
        </FlatDl>
    </section>
    <hr />
    <section class="moves">
        <ul class="nolist">
            {#each pokemon.moves as move}
                <li>
                    <LearnedMove {move} moveData={pokemon.moveData[move.moveId]} proficiencyBonus={pb} attributes={pokemon.attributes} />
                </li>
            {/each}
        </ul>
    </section>
    <button on:click={openModal}>Modal!</button>
</Card>

<style lang="scss">
    hr {
        width: 33%;
        border: none;
        border-bottom: 0.0625em solid var(--skin-bg);
        opacity: 0.5;
    }

    .cap {
        text-transform: capitalize,
    }

    .upper {
        text-transform: uppercase,
    }

    .health {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-template-areas:
            "name level"
            "bar bar"
            "hp hit-dice";
        align-items: center;
        gap: 0.125em;

        .name {
            grid-area: name;
            display: flex;
            align-items: center;

            .gender {
                margin-left: 0.25em;
            }
        }

        .level {
            grid-area: level;
            justify-self: right;

            .level-text {
                font-size: var(--font-sz-venus);
            }

            .level-number {
                font-size: var(--font-sz-neptune);
            }
        }

        .bar {
            grid-area: bar;
            display: flex;
        }

        .hp {
            grid-area: hp;
            font-size: var(--font-sz-neptune);

            .current-hp {
                --input-min-width: 3ch;
                display: inline-block;
            }
        }

        .hit-dice {
            grid-area: hit-dice;
            display: flex;
            flex-direction: column;
            font-size: var(--font-sz-mars);

            .hit-dice-bar {
                margin-bottom: 0.125em;
            }

            .current-hit-dice {
                --input-min-width: 3ch;
                display: inline-block;
            }

            .hit-dice-text {
                align-self: flex-end;
            }
        }
    }
</style>
