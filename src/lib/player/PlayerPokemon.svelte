<script lang="ts">
    import type { PlayerPokemon, WithPokemonData } from './types'
    import Card from '../design/Card.svelte'
    import AttributeBlock from '../dnd/AttributeBlock.svelte'
    import TypeTag from '../pokemon/TypeTag.svelte'
    import FlatDl from '../design/FlatDl.svelte'
    import { proficiencyBonus, proficiencyModifier } from '../dnd/proficiency'
    import { modifierForScore } from '../dnd/attributes'

    export let pokemon: PlayerPokemon & WithPokemonData
    $: data = pokemon.pokemonData

    $: title = pokemon.nickname ?? pokemon.pokemonData.name
    $: pb = proficiencyBonus(pokemon.level)
</script>

<Card title={title}>
    <TypeTag slot="header-extra" type={data.type} />
    <section class="info">
        <FlatDl columns={2}>
            <dt>Pokemon</dt>
            <dd>{data.name}</dd>
            <dt><abbr title="Species Rating">SR</abbr></dt>
            <dd>{data.sr}</dd>
            <dt>Level</dt>
            <dd>{pokemon.level}</dd>
            <dt>Size</dt>
            <dd class="cap">{data.size}</dd>
            <dt>Gender</dt>
            <dd class="cap">{pokemon.gender}</dd>
            <dt>Evolution</dt>
            <dd>{data.evolution ? `${data.evolution.stage} / ${data.evolution.maxStage}` : '1 / 1'}</dd>
        </FlatDl>
    </section>
    <hr />
    <section class="stats">
        <AttributeBlock attributes={pokemon.attributes} />
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
    </section>
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
</style>
