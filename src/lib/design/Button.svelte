<script lang="ts">
    export let variant: 'solid' | 'ghost' = 'solid'
    export let type: 'submit' | 'button' | 'reset' = 'button'
    export let align: 'center' | 'left' = 'center'
    export let width: 'auto' | 'full' = 'auto'
    export let disabled: boolean = false
</script>

<button on:click {type} class="{variant} {align} {width}" {disabled}>
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

    button.left {
        text-align: left;
    }

    button.full {
        width: 100%;
    }
</style>