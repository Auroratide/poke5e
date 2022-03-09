<script lang="ts">
    import Pokeball from './icon/Pokeball.svelte'
</script>

<div class="loader" aria-label="Loading">
    <div class="icon">
        <Pokeball />
    </div>
</div>

<style>
    .loader {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .icon {
        --skin-local-stroke: var(--skin-content);
        font-size: var(--font-sz-jupiter);
        width: 3em;
        height: 3em;
        animation: spin 2s linear infinite, fade 3s ease-in-out infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes fade {
        0% { opacity: 0.25; }
        50% { opacity: 0.75; }
        100% { opacity: 0.25; }
    }
</style>