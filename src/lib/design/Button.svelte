<script lang="ts">
    export let variant: 'solid' | 'ghost' = 'solid'
    export let type: 'submit' | 'button' | 'reset' = 'button'
</script>

<button on:click {type} class="{variant}">
    <slot></slot>
</button>

<style>
    button {
        border-radius: 1.5em;
        border: none;
        padding: 0.25em 0.75em;
        cursor: pointer;
    }

    button.solid {
        background-color: var(--skin-bg-dark);
        color: var(--skin-bg-text);
    }

    button.ghost {
        background-color: transparent;
        color: var(--skin-bg-dark);
    }
</style>