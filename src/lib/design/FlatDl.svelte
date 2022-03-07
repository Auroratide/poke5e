<dl>
    <slot></slot>
</dl>

<style lang="scss">
    dl {
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 0.5em;
        font-size: var(--font-sz-venus);
        line-height: 1.25;

        :global(dt) {
            font-weight: 700;

            &::after {
                content: ':';
            }
        }

        :global(dd) {
            margin: 0;
        }
    }
</style>