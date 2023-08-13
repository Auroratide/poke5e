<script lang="ts" context="module">
    export type UpdatePpDetail = {
        value: number,
    }
</script>

<script lang="ts">
    import type { LearnedMove } from '../types'
    import type { Move } from '$lib/moves/types'
    import { base } from '$app/paths'
    import VisuallyHidden from '$lib/design/VisuallyHidden.svelte'
    import type { Attributes } from '$lib/dnd/types'
    import { modifierForScore } from '$lib/dnd/attributes'
    import { createEventDispatcher } from 'svelte'
    import type { PokeType } from '$lib/pokemon/types'
    import MoveDescription from '$lib/moves/MoveDescription.svelte'

    const dispatch = createEventDispatcher()

    const maxBy = (val: (o: any) => number) => (max: any, cur: any) => val(cur) > val(max) ? cur : max

    export let move: LearnedMove
    export let moveData: Move
    export let proficiencyBonus: number
    export let pokemonType: PokeType[]
    export let attributes: Attributes
    export let editable: boolean

    $: currentPp = move.pp.current

    let attributeMod = 0
    $: {
        if (moveData.power !== 'none' && moveData.power !== 'varies') {
            const power = moveData.power === 'any'
                ? ['str', 'dex', 'con', 'int', 'wis', 'cha']
                : moveData.power

            const bestPower = power.reduce(maxBy((power) => attributes[power]))
            
            attributeMod = modifierForScore(attributes[bestPower])
        }
    }
    $: hasStab = pokemonType.includes(moveData.type)

    $: toHit = proficiencyBonus + attributeMod
    $: dc = 8 + proficiencyBonus + attributeMod
    $: dmg = attributeMod + (hasStab ? attributeMod : 0)

    const onChangePp = (e: Event) => {
        dispatch('update', {
            value: parseInt((e.target as HTMLInputElement).value ?? '0'),
        } as UpdatePpDetail)
    }
</script>

<div class="vstack space-after">
    <div class="vstack bg-by-type rounded space-inner" style:--bg="var(--skin-{moveData.type}-bg)">
        <div class="hrow space-after-tiny">
            <span class="flex-span"><a href="{base}/moves/{move.moveId}">{moveData.name}</a></span>
            <span>
                <VisuallyHidden><label for="current-hp">{moveData.name} PP</label></VisuallyHidden>
                <span class="current">
                    {#if editable}
                        <input id="current-pp-{move.moveId}" type="number" value={currentPp} on:change={onChangePp} />
                    {:else}
                        {currentPp}
                    {/if}
                </span>
                <span class="max">/ {move.pp.max}</span>
            </span>
        </div>
        <div class="hrow tiny-font">
            <span class="capitalize flex-span">{moveData.type}</span>
            <span>
                {#if moveData.power !== 'none' && moveData.power !== 'varies'}
                    To Hit: +{toHit}, DC: {dc}, Dmg: +{dmg}
                {/if}
            </span>
        </div>
    </div>
    <div class="space-inner smaller-font">
        <MoveDescription move={moveData} />
    </div>
    {#if move.notes !== undefined && move.notes.length > 0}
        <hr />
        <div class="space-inner smaller-font">{move.notes}</div>
    {/if}
</div>

<style>
    .vstack {
        display: flex;
        flex-direction: column;
    }

    .space-after {
        margin-block-end: 1rem;
    }

    .space-after-tiny {
        margin-block-end: 0.125rem;
    }

    .hrow {
        display: flex;
        flex-direction: row;
    }

    .bg-by-type {
        background-color: var(--bg);
        color: var(--skin-bg-text);
    }

    .bg-by-type a {
        color: var(--skin-bg-text);
        text-decoration: none;
    }

    .bg-by-type a:hover,
    .bg-by-type a:focus {
        text-decoration: underline;
    }

    .flex-span {
        flex: 1;
    }

    .current input {
        width: 5ch;
        display: inline-block;
    }

    .rounded {
        border-radius: 0.25rem;
    }

    .space-inner {
        padding: 0.5rem 1rem;
    }

    .smaller-font {
        font-size: var(--font-sz-venus);
    }

    .tiny-font {
        font-size: var(--font-sz-mars);
    }

    .capitalize {
        text-transform: capitalize;
    }
</style>