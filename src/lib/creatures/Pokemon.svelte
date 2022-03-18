<script lang="ts">
    import type { Pokemon } from './types'
    import Card from '../design/Card.svelte'
    import FlatDl from '../design/FlatDl.svelte'
    import AttributeBlock from '../dnd/AttributeBlock.svelte'
    import InlineMoveLinks from './InlineMoveLinks.svelte'
    import TypeTag from '../pokemon/TypeTag.svelte'
    import TypeEffectiveness from './TypeEffectiveness.svelte'
    import * as asString from './string'

    export let pokemon: Pokemon
</script>

<Card title={pokemon.name}>
    <TypeTag slot="header-extra" type={pokemon.type} />
    <section class="info">
        <FlatDl columns={2}>
            <dt>Number</dt>
            <dd>{asString.pokeIndex(pokemon.number)}</dd>
            <dt>Size</dt>
            <dd class="cap">{pokemon.size}</dd>
            <dt><abbr title="Species Rating">SR</abbr></dt>
            <dd>{asString.sr(pokemon.sr)}</dd>
            <dt>Egg Group</dt>
            <dd class="cap">{pokemon.eggGroup.join(', ')}</dd>
            <dt>Min Level</dt>
            <dd>{pokemon.minLevel}</dd>
            <dt>Gender</dt>
            <dd class="cap">{asString.gender(pokemon.gender)}</dd>
        </FlatDl>
        <p>{pokemon.description}</p>
    </section>
    <hr />
    <section class="stats">
        <FlatDl>
            <dt>Armor Class</dt>
            <dd>{pokemon.ac}</dd>
            <dt>Hit Points</dt>
            <dd>{pokemon.hp} ({pokemon.hitDice})</dd>
            <dt>Speed</dt>
            <div>
                {#each pokemon.speed as speed}
                    <dd>{asString.speed(speed)}</dd>
                {/each}
            </div>
            {#if pokemon.senses.length > 0}
                <dt>Senses</dt>
                <div class="cap">
                    {#each pokemon.senses as sense}
                        <dd>{asString.sense(sense)}</dd>
                    {/each}
                </div>
            {/if}
        </FlatDl>
        <AttributeBlock attributes={pokemon.attributes} />
    </section>
    <section class="skills">
        <FlatDl>
            <dt>Proficiencies</dt>
            <dd class="cap">{pokemon.skills.join(', ')}</dd>
            <dt>Saving Throws</dt>
            <dd class="upper">{pokemon.savingThrows.join(', ')}</dd>
            <TypeEffectiveness type={pokemon.type} />
        </FlatDl>
    </section>
    <hr />
    <section class="abilities">
        {#if pokemon.specialAbilityText !== undefined}
            <p><strong>{pokemon.specialAbilityText}</strong></p>
        {/if}
        {#each pokemon.abilities as ability}
            <p><strong>{ability.name}:</strong> {ability.description}</p>
        {/each}
    </section>
    {#if pokemon.evolution !== undefined}
        <hr />
        <section class="evolution">
            <p><strong>Evolution:</strong> {pokemon.evolution.stage} / {pokemon.evolution.maxStage}</p>
            {#if pokemon.evolution.description !== undefined}
                <p>{pokemon.evolution.description}</p>
            {:else}
                <p>This pokemon is at its highest evolutionary state.</p>
            {/if}
        </section>
    {/if}
    <hr />
    <section class="moves">
        <FlatDl>
            <dt>Starting</dt>
            <dd><InlineMoveLinks moves={pokemon.moves.start} /></dd>
            {#if pokemon.moves.level2 !== undefined}
                <dt>Level 2</dt>
                <dd><InlineMoveLinks moves={pokemon.moves.level2} /></dd>
            {/if}
            {#if pokemon.moves.level6 !== undefined}
                <dt>Level 6</dt>
                <dd><InlineMoveLinks moves={pokemon.moves.level6} /></dd>
            {/if}
            {#if pokemon.moves.level10 !== undefined}
                <dt>Level 10</dt>
                <dd><InlineMoveLinks moves={pokemon.moves.level10} /></dd>
            {/if}
            {#if pokemon.moves.level14 !== undefined}
                <dt>Level 14</dt>
                <dd><InlineMoveLinks moves={pokemon.moves.level14} /></dd>
            {/if}
            {#if pokemon.moves.level18 !== undefined}
                <dt>Level 18</dt>
                <dd><InlineMoveLinks moves={pokemon.moves.level18} /></dd>
            {/if}
        </FlatDl>
        <FlatDl>
            {#if pokemon.moves.egg !== undefined}
                <dt>Egg</dt>
                <dd><InlineMoveLinks moves={pokemon.moves.egg} /></dd>
            {/if}
            {#if pokemon.moves.tm !== undefined}
                <dt>TM</dt>
                <dd>{pokemon.moves.tm.join(', ')}</dd>
            {/if}
        </FlatDl>
    </section>
</Card>

<style lang="scss">
    hr {
        width: 33%;
        border: none;
        border-bottom: 0.0625em solid var(--skin-bg);
        opacity: 0.5;
    }

    p {
        font-size: var(--font-sz-venus);
    }

    .evolution p:first-child {
        margin-bottom: 0.125em;
    }

    .cap {
        text-transform: capitalize,
    }

    .upper {
        text-transform: uppercase;
    }
</style>
