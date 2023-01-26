<script lang="ts">
    import type { LearnedMove, TrainerPokemon } from '../types'
    import type { Pokemon } from '$lib/creatures/types'
    import { createEventDispatcher } from 'svelte'
    import BasicInfo from './BasicInfo.svelte'
    import HealthInfo, { type UpdateDetail as HealthUpdateDetail } from './HealthInfo.svelte'
    import StatsInfo from './StatsInfo.svelte'
    import SkillsInfo from './SkillsInfo.svelte'
    import FlatDl from '$lib/design/FlatDl.svelte'
    import AttributeBlock from '$lib/dnd/AttributeBlock.svelte'
    import TypeEffectiveness from '$lib/creatures/TypeEffectiveness.svelte'
    import MovesInfo from './MovesInfo.svelte'
    import FeatsInfo from './FeatsInfo.svelte'

    const dispatch = createEventDispatcher()

    export let pokemon: TrainerPokemon
    export let species: Pokemon
    export let editable: boolean

    $: hasImage = species.media != null

    const onUpdateHealth = (e: CustomEvent<HealthUpdateDetail>) => {
        dispatch('update-health', {
            ...pokemon,
            hp: {
                current: e.detail.currentHp,
                max: pokemon.hp.max,
            },
            hitDice: {
                current: e.detail.currentHitDice,
                max: pokemon.hitDice.max,
            }
        } as TrainerPokemon)
    }

    const onUpdatePp = (e: CustomEvent<LearnedMove>) => {
        dispatch('update-pp', e.detail)
    }
</script>

<section class="info column lg:row">
    <div style:flex="1" style:width="100%">
        <div style:margin-bottom="0.5em">
            <BasicInfo {pokemon} {species} />
            <HealthInfo {pokemon} {species} {editable} on:update={onUpdateHealth} />
        </div>
        <StatsInfo {pokemon} {species} />
    </div>
    {#if hasImage}
        <div style:--size="clamp(8rem, 12.66vw, 9.5rem)" class="square-image">
            <img src={species.media.main} alt="" />
        </div>
    {/if}
</section>
<section class="stats">
    <AttributeBlock attributes={pokemon.attributes} />
    <SkillsInfo {pokemon} />
    <FlatDl>
        <TypeEffectiveness type={species.type} />
    </FlatDl>
    <FeatsInfo {pokemon} {species} />
</section>
<hr />
<section>
    <MovesInfo {pokemon} {editable} on:update={onUpdatePp} />
</section>

<style>
    section {
        margin-bottom: 0.5em;
    }

    .column {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media screen and (min-width: 37.5rem) {
        .lg\:row {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
        }
    }

    .square-image {
        width: var(--size);
        height: var(--size);
        padding: 0.5rem 0 0.5rem 1rem;
    }

    img {
        width: 100%;
        display: block;
        margin: 0;
    }
</style>