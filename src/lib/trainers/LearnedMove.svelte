<script lang="ts">
    import type { LearnedMove } from './types'
    import type { Move } from '../moves/types'
    import { base } from '$app/paths'
    import VisuallyHidden from '$lib/design/VisuallyHidden.svelte'
    import type { Attributes } from '$lib/dnd/types'
    import { modifierForScore } from '$lib/dnd/attributes'

    const maxBy = <T>(val: (o: T) => number) => (max: T, cur: T) => val(cur) > val(max) ? cur : max

    export let move: LearnedMove
    export let moveData: Move
    export let proficiencyBonus: number
    export let attributes: Attributes
    export let currentPp: number = move.pp.current

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

    $: toHit = proficiencyBonus + attributeMod
    $: dc = 8 + proficiencyBonus + attributeMod
</script>

<div class="vstack space-after">
    <div class="vstack bg-by-type rounded space-inner" style:--bg="var(--skin-{moveData.type}-bg)">
        <div class="hrow space-after-tiny">
            <span class="flex-span"><a href="{base}/moves/{move.moveId}">{moveData.name}</a></span>
            <span>
                <VisuallyHidden><label for="current-hp">{moveData.name} PP</label></VisuallyHidden>
                <span class="current"><input id="current-pp-{move.moveId}" type="number" bind:value={currentPp} /></span>
                <span class="max">/ {move.pp.max}</span>
            </span>
        </div>
        <div class="hrow tiny-font">
            <span class="capitalize flex-span">{moveData.type}</span>
            <span>
                {#if moveData.power !== 'none' && moveData.power !== 'varies'}
                    To Hit: +{toHit}, DC: {dc}
                {/if}
            </span>
        </div>
    </div>
    {#if move.notes !== undefined}
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
        width: 4ch;
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