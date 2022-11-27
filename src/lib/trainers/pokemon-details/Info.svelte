<script lang="ts">
    import type { PlayerPokemon } from '../types'
    import type { Pokemon } from '$lib/creatures/types'
    import BasicInfo from './BasicInfo.svelte'
    import HealthInfo from './HealthInfo.svelte'
    import StatsInfo from './StatsInfo.svelte'
    import SkillsInfo from './SkillsInfo.svelte'
    import FlatDl from '$lib/design/FlatDl.svelte'
    import AttributeBlock from '$lib/dnd/AttributeBlock.svelte'
    import TypeEffectiveness from '$lib/creatures/TypeEffectiveness.svelte'
    import { proficiencyBonus } from '$lib/dnd/proficiency'

    export let pokemon: PlayerPokemon
    export let species: Pokemon

    $: pb = proficiencyBonus(pokemon.level)
</script>

<section class="info">
    <BasicInfo {pokemon} {species} />
    <HealthInfo {pokemon} {species} />
</section>
<hr />
<section class="stats">
    <StatsInfo {pokemon} {species} />
    <AttributeBlock attributes={pokemon.attributes} />
    <SkillsInfo {pokemon} />
    <FlatDl>
        <TypeEffectiveness type={species.type} />
    </FlatDl>
</section>

<style>
    section {
        margin-bottom: 0.5em;
    }

    hr {
        width: 33%;
        border: none;
        border-bottom: 0.0625em solid var(--skin-bg);
        opacity: 0.5;
    }
</style>