<script lang="ts">
    import Loader from './Loader.svelte'

    export let saving: boolean
</script>

<div class="relative">
    <div class:muted={saving}>
        <slot></slot>
    </div>
    {#if saving}
        <div class="center-overlay" aria-live="assertive">
            <div class="fixed">
                <Loader caption="Saving..." />
            </div>
        </div>
    {/if}
</div>

<style>
    .muted { opacity: 0.5; }
    .relative { position: relative; }
    .fixed { position: fixed; }

    .center-overlay {
        position: absolute;
        top: min(15vh, 10%);
        left: 50%;
    }
    .center-overlay .fixed {
        --skin-local-color: var(--skin-content-text);
        transform: translateX(-50%);
    }
</style>