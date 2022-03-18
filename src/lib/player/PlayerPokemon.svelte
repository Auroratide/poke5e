<script lang="ts">
    import type { PlayerPokemon, WithPokemonData } from './types'
    import Card from '../design/Card.svelte'
    import AttributeBlock from '../dnd/AttributeBlock.svelte'
    import TypeTag from '../pokemon/TypeTag.svelte'
    import FlatDl from '../design/FlatDl.svelte'

    export let pokemon: PlayerPokemon & WithPokemonData
    $: data = pokemon.pokemonData

    $: title = pokemon.nickname ?? pokemon.pokemonData.name
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
</style>
