<script lang="ts" context="module">
    export type UpdateDetail = {
        currentHp: number,
        currentHitDice: number,
    }
</script>

<script lang="ts">
    import type { TrainerPokemon } from '../types'
    import type { Pokemon } from '$lib/creatures/types'
    import { createEventDispatcher } from 'svelte'
    import ResourceBar from '$lib/design/ResourceBar.svelte'
    import VisuallyHidden from '$lib/design/VisuallyHidden.svelte'
    import NumericResourceInput, { type ChangeDetail } from '$lib/design/Form/NumericResourceInput.svelte'

    const dispatch = createEventDispatcher()

    export let pokemon: TrainerPokemon
    export let species: Pokemon
    export let editable: boolean

    $: hp = pokemon.hp.current
    $: hitDice = pokemon.hitDice.current

    const onChangeHp = (e: CustomEvent<ChangeDetail>) => {
        dispatch('update', {
            currentHp: e.detail.value,
            currentHitDice: hitDice,
        } as UpdateDetail)
    }

    const onChangeHitDice = (e: CustomEvent<ChangeDetail>) => {
        dispatch('update', {
            currentHp: hp,
            currentHitDice: e.detail.value,
        } as UpdateDetail)
    }
</script>

<div class="grid">
    <span class="bar"><ResourceBar current={hp} max={pokemon.hp.max} /></span>
    <span class="hp">
        <VisuallyHidden><label for="current-hp">HP</label></VisuallyHidden>
        <span class="current-hp">
            {#if editable}
                <NumericResourceInput id="current-hp" value={hp} on:change={onChangeHp} />
            {:else}
                {pokemon.hp.current}
            {/if}
        </span>
        <span class="max-hp">/ {pokemon.hp.max}</span>
    </span>
    <span class="hit-dice">
        <span class="hit-dice-bar"><ResourceBar secondary current={hitDice} max={pokemon.hitDice.max} /></span>
        <span class="hit-dice-text">
            <VisuallyHidden><label for="current-hit-dice">Hit Dice</label></VisuallyHidden>
            <span class="current-hit-dice">
                {#if editable}
                    <NumericResourceInput id="current-hit-dice" value={hitDice} on:change={onChangeHitDice} />
                {:else}
                    {pokemon.hitDice.current}
                {/if}
            </span>
            <span class="max-hit-dice">/ {pokemon.hitDice.max} ({species.hitDice})</span>
        </span>
    </span>
</div>

<style lang="scss">
    .grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        align-items: center;
        gap: 0.125em;

        .bar {
            grid-column: span 2;
            display: flex;
        }

        .hp {
            font-size: var(--font-sz-neptune);

            .current-hp {
                --input-min-width: 3ch;
                display: inline-block;
            }
        }

        .hit-dice {
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