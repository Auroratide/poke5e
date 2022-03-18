<script lang="ts">
    import VisuallyHidden from '../design/VisuallyHidden.svelte'

    export let current: number
    export let max: number
    export let secondary: boolean = false

    $: percentage = Math.max(100 * current / max, 0)
</script>

<meter class:secondary max="{max}" value="{current}">
    <div class="fill" style:width="{percentage}%"></div>
    <VisuallyHidden>{current} / {max}</VisuallyHidden>
</meter>

<style lang="scss">
    meter {
        --skin-local-fill: var(--skin-bar-fill);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        display: block;
        background: none;
        background-color: var(--skin-bar-bg);
        width: 100%;
        height: 0.5em;
        overflow: hidden;

        &::-moz-meter-bar, &::-webkit-meter-bar {
            background: none;
            background-color: var(--skin-local-fill);
        }

        .fill {
            height: 0.5em;
            background-color: var(--skin-local-fill);
        }

        &.secondary {
            --skin-local-fill: var(--skin-bar-secondary);
        }
    }
</style>