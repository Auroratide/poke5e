<script lang="ts">
    import type { PokeType } from './types'

    export let type: PokeType[] // max size 2
</script>

<span class="type-tag">
    {#if type.length === 2}
        <span class="skew type left" style:--skin-local-bg="var(--skin-{type[0]}-bg)">
            <span class="unskew">{type[0]}</span>
        </span>
        <span class="skew type right" style:--skin-local-bg="var(--skin-{type[1]}-bg)">
            <span class="unskew">{type[1]}</span>
        </span>
    {:else}
        <span class="type" style:--skin-local-bg="var(--skin-{type}-bg)">{type}</span>
    {/if}
</span>

<style lang="scss">
    .type-tag {
        background-color: var(--skin-local-bg);
        color: var(--skin-bg-text);
        border-radius: 1em;
        text-transform: capitalize;
        box-shadow: var(--elev-stratus);
        overflow: hidden;
    }

    .type {
        display: inline-block;
        padding: 0.25em 1em;
        background-color: var(--skin-local-bg);
    }

    .skew {
        display: inline-block;
        transform: skewX(var(--skew-angle));
    }

    .unskew {
        display: inline-block;
        transform: skewX(var(--skew-undo));
    }

    .left {
        margin-left: -1em;
        padding-left: 2em;
    }

    .right {
        margin-right: -1em;
        padding-right: 2em;
    }
</style>