<script lang="ts">
    import type { PokeType } from './types'

    export let type: PokeType
</script>

<span class="type-tag" style:--skin-local-bg="var(--skin-{type}-bg)">{type}</span>

<style lang="scss">
    .type-tag {
        background-color: var(--skin-local-bg);
        color: var(--skin-bg-text);
        border-radius: 1em;
        text-transform: capitalize;
        padding: 0.25em 1em;
        box-shadow: var(--elev-stratus);
    }
</style>