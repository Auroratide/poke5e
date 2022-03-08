<script lang="ts">
    import type { Pokemon } from './types'
    import type { PokeType } from '../pokemon/types'
    import Card from '../design/Card.svelte'
    import FlatDl from '../design/FlatDl.svelte'
    import AttributeBlock from '../dnd/AttributeBlock.svelte'
    import { vulnerabilities, resistances, immunities } from '../pokemon/type-interactions'
    import TypeTag from '../pokemon/TypeTag.svelte'
    import * as asString from './string'

    export let pokemon: Pokemon

    $: vul = Array.from(vulnerabilities(pokemon.type))
    $: res = Array.from(resistances(pokemon.type))
    $: imm = Array.from(immunities(pokemon.type))

    const showTypeList = (list: PokeType[]) => list.length === 0 ? 'none' : list.join(', ')
</script>

<Card title={pokemon.name}>
    <TypeTag slot="header-extra" type={pokemon.type} />
    <section class="info">
        <FlatDl columns={2}>
            <dt>Number</dt>
            <dd>{asString.pokeIndex(pokemon.number)}</dd>
            <dt>Size</dt>
            <dd>{pokemon.size}</dd>
            <dt><abbr title="Species Rating">SR</abbr></dt>
            <dd>{asString.sr(pokemon.sr)}</dd>
            <dt>Egg Group</dt>
            <dd>{pokemon.eggGroup.join(', ')}</dd>
            <dt>Min Level</dt>
            <dd>{pokemon.minLevel}</dd>
            <dt>Gender</dt>
            <dd>{asString.gender(pokemon.gender)}</dd>
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
            <dd>{showTypeList(vul)}</dd>
            <dt>Resistances</dt>
            <dd>{showTypeList(res)}</dd>
            <dt>Immunities</dt>
            <dd>{showTypeList(imm)}</dd>
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
