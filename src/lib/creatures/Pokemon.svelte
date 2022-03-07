<script lang="ts">
    import type { Pokemon } from './types'
    import Card from '../design/Card.svelte'
    import FlatDl from '../design/FlatDl.svelte'
    import AttributeBlock from '../dnd/AttributeBlock.svelte'
    import TypeTag from '../pokemon/TypeTag.svelte'

    export let pokemon: Pokemon
</script>

<Card title={pokemon.name}>
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
</Card>

<style lang="scss">
</style>
