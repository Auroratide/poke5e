<script lang="ts">
    import type { PlayerPokemon, WithPokemonData } from './types'
    import Card from '../design/Card.svelte'
    import AttributeBlock from '../dnd/AttributeBlock.svelte'
    import TypeTag from '../pokemon/TypeTag.svelte'

    export let pokemon: PlayerPokemon & WithPokemonData

    $: title = pokemon.nickname ?? pokemon.pokemonData.name
</script>

<Card title={title}>
    <TypeTag slot="header-extra" type={pokemon.pokemonData.type} />
    <section class="info">
        <p>{pokemon.pokemonData.name} | Level {pokemon.level}</p>
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
</style>
