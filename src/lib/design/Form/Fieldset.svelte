<script lang="ts">
    export let title: string
    export let columns: number = 1
</script>

<fieldset style:--columns="{columns}">
    <legend><span class="unskew">{title}</span></legend>
    <div class="grid">
        <slot></slot>
    </div>
</fieldset>

<style lang="scss">
    fieldset {
        border: none;
        padding: 0.5em 1em;
        margin-bottom: 1em;
    }

    legend {
        display: block;
        background-color: var(--skin-bg);
        color: var(--skin-bg-text);
        margin-left: -4em;
        padding: 0.25em 1em 0.25em 4em;
        transform: skewX(var(--skew-angle));

        .unskew {
            display: inline-block;
            transform: skewX(var(--skew-undo));
        }
    }

    .grid {
        display: grid;
        column-gap: 0.5em;
        row-gap: 0.5em;
        align-items: center;
        grid-template-columns: repeat(var(--columns), auto 1fr);
    }
</style>