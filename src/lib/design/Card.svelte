<script lang="ts">
    export let title: string
</script>

<div class="container">
    <article>
        <header>
            <h1>{title}</h1>
            <slot name="header-extra"></slot>
        </header>
        <div class="scrollable">
            <slot></slot>
        </div>
    </article>
</div>

<style lang="scss">
    .container {
        height: 100%;
    }

    article {
        background-color: var(--skin-content);
        color: var(--skin-content-text);
        border-radius: 2em;
        box-shadow: var(--elev-cirrus);
        max-height: 100%;
        display: flex;
        flex-direction: column;
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
                flex: 1;
                font-weight: 700;
                font-size: var(--font-sz-neptune);
            }
        }

        .scrollable {
            overflow: auto;
        }

        :global(section) {
            padding: 0 1em;
        }
    }
</style>