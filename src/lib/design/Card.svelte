<script lang="ts">
    export let title: string
</script>

<article>
    <header>
        <h1>{title}</h1>
        <slot name="header-extra"></slot>
    </header>
    <slot></slot>
</article>

<style lang="scss">
    article {
        background-color: var(--skin-content);
        color: var(--skin-content-text);
        border-radius: 2em;
        box-shadow: var(--elev-cirrus);
        overflow: hidden;

        header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            background-color: var(--skin-bg);
            color: var(--skin-bg-text);
            padding: 0.5em 1em;
            margin-bottom: 0.5em;

            h1 {
                font-weight: 700;
                font-size: var(--font-sz-neptune);
            }
        }

        :global(section) {
            padding: 0 1em;
        }
    }
</style>