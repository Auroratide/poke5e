<script lang="ts">
   import type { Move } from './types'
   import { renderHtml } from '../rendering/render'

   export let move: Move
</script>

<div class="description">
   {@html renderHtml(move.description)}
   {#if move.higherLevels !== undefined}
       <p><strong>At Higher Levels: </strong>{move.higherLevels}</p>
   {/if}
   {#if move.optional !== undefined}
       <p class="optional-heading"><strong>Optional Rules:</strong></p>
       {@html renderHtml(move.optional)}
   {/if}
</div>

<style lang="scss">
   .description {
        line-height: 1.5;

        :global {
            table {
                border-collapse: collapse;
                margin: 0 auto 1em;
                font-size: var(--font-sz-venus);
            
                th {
                    background-color: var(--skin-bg-dark);
                    color: var(--skin-bg-text);
                    border-bottom: 0.125em solid var(--skin-bg-text);
                    text-align: left;
                }

                tbody tr:nth-child(odd) td {
                    background-color: var(--skin-bg);
                    color: var(--skin-bg-text);
                }

                tbody tr:nth-child(even) td {
                    background-color: var(--skin-bg-dark);
                    color: var(--skin-bg-text);
                }

                th, td {
                    padding: 0.125em 1em;
                }
            }
        }
    }

    .optional-heading {
        margin-bottom: 0.15em;
    }
</style>