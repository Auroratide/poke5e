<script lang="ts">
    export let mainBg = ''
    export let interactive = false
</script>

<!-- svelte-ignore a11y-no-redundant-roles -->
<tr role="row" class:interactive style:--skin-local-bg={mainBg}>
    <slot></slot>
</tr>

<style lang="scss">
    tr {
        position: relative;
        border-radius: 1em;
        box-shadow: var(--elev-cumulus);

        :global {
            td {
                background-color: var(--skin-content);
                color: var(--skin-content-text);
            }

            td:first-child {
                border-top-left-radius: 1em;
                border-bottom-left-radius: 1em;
            }

            td:last-child {
                border-top-right-radius: 1em;
                border-bottom-right-radius: 1em;
            }

            .primary {
                background-color: var(--skin-bg);
                color: var(--skin-bg-text);
            }
        }

        &.interactive {
            :global {
                a {
                    color: var(--skin-bg-text);
                    text-decoration: none;
                }

                a::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                }
            }

            &:hover :global {
                td {
                    background-color: var(--skin-bg);
                    color: var(--skin-bg-text);
                }

                td.primary {
                    background-color: var(--skin-local-bg);
                }
            }
        }
    }
</style>
