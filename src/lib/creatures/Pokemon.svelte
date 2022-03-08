<script lang="ts">
    import type { Pokemon } from './types'
    import Card from '../design/Card.svelte'
    import FlatDl from '../design/FlatDl.svelte'
    import AttributeBlock from '../dnd/AttributeBlock.svelte'
    import { vulnerabilities, resistances, immunities } from '../pokemon/type-interactions'
    import TypeTag from '../pokemon/TypeTag.svelte'

    export let pokemon: Pokemon
</script>

<Card title={pokemon.name}>
    <TypeTag slot="header-extra" type={pokemon.type} />
    <section class="info">
        <FlatDl>
            <dt>Size</dt>
            <dd>{pokemon.size}</dd>
            <dt><abbr title="Species Rating">SR</abbr></dt>
            <dd>{pokemon.sr}</dd>
            <dt>Min Level</dt>
            <dd>{pokemon.minLevel}</dd>
            <dt>Egg Group</dt>
            <dd>{pokemon.eggGroup.join(', ')}</dd>
            <dt>Gender</dt>
            <dd>{pokemon.gender}</dd>
            <dt>Evolution</dt>
            <dd>???</dd>
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
            <dd>???</dd>
        </FlatDl>
        <AttributeBlock attributes={pokemon.attributes} />
    </section>
    <section class="skills">
        <FlatDl>
            <dt>Proficiencies</dt>
            <dd>{pokemon.skills.join(', ')}</dd>
            <dt>Saving Throws</dt>
            <dd>{pokemon.savingThrows.join(', ')}</dd>
            <dt>Vulnerabilities</dt>
            <dd>{Array.from(vulnerabilities(pokemon.type)).join(', ')}</dd>
            <dt>Resistances</dt>
            <dd>{Array.from(resistances(pokemon.type)).join(', ')}</dd>
            <dt>Immunities</dt>
            <dd>{Array.from(immunities(pokemon.type)).join(', ')}</dd>
        </FlatDl>
    </section>
    <hr />
    <section class="abilities">
        {#each pokemon.abilities as ability}
            <p><strong>{ability.name}:</strong> {ability.description}</p>
        {/each}
    </section>
</Card>

<style lang="scss">
    hr {
        width: 33%;
        border: none;
        border-bottom: 0.0625em solid var(--skin-bg);
        opacity: 0.5;
    }
</style>
