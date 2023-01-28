<script lang="ts">
    import VisuallyHidden from './VisuallyHidden.svelte'

    export let current: number
    export let max: number
    export let secondary: boolean = false

    $: percentage = Math.max(100 * current / max, 0)
    $: status = percentage >= 50 ? 'healthy' : percentage >= 20 ? 'warning' : 'danger'
</script>

<meter class:secondary class="{status}" max="{max}" value="{current}">
    <div class="fill" style:width="{percentage}%"></div>
    <VisuallyHidden>{current} / {max}</VisuallyHidden>
</meter>

<style>
    meter {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        display: block;
        background: none;
        background-color: var(--skin-bar-bg);
        width: 100%;
        height: 0.5em;
        overflow: hidden;
    }

    .healthy {
        --skin-local-fill: var(--skin-bar-healthy);
    }

    .warning {
        --skin-local-fill: var(--skin-bar-warning);
    }

    .danger {
        --skin-local-fill: var(--skin-bar-danger);
    }

    meter::-moz-meter-bar, meter::-webkit-meter-bar {
        background: none;
        background-color: var(--skin-local-fill);
    }

    .fill {
        height: 0.5em;
        background-color: var(--skin-local-fill);
    }

    meter.secondary {
        --skin-local-fill: var(--skin-bar-secondary);
    }
</style>