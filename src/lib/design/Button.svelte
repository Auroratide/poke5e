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
        position: relative;
        border-radius: 1.5em;
        border: none;
        padding: 0.25em 0.75em;
        cursor: pointer;
    }

    button:hover::before, button:focus::before {
        content: '>';
        color: var(--skin-bg-dark);
        font-weight: 900;
        position: absolute;
        top: -0.28em;
        left: -0.325em;
        font-size: 2.5em;
        -webkit-text-stroke: 0.03em var(--skin-bg-text);
    }

    button:active::before {
        left: -0.27em;
    }

    button.solid {
        background-color: var(--skin-bg-dark);
        color: var(--skin-bg-text);
    }

    button.ghost {
        background-color: transparent;
        color: var(--skin-bg-dark);
    }

    button.ghost:hover,
    button.ghost:focus,
    button.ghost:active {
        background-color: var(--skin-input-bg);
    }

    button.left {
        text-align: left;
    }

    button.full {
        width: 100%;
    }

    button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    button:disabled:hover::before,
    button:disabled:focus::before,
    button:disabled:active::before {
        display: none;
    }
</style>