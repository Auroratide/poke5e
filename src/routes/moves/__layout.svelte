<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const moves = await fetch('/data/moves.json')
            .then(res => res.json())
            .then(json => json.moves)
        
        return {
            props: { moves },
            stuff: { moves },
        }
    }
</script>

<script lang="ts">
    import type { Move } from '$lib/moves/types'
    import SortableTable from '$lib/design/SortableTable.svelte'
    import Backdrop from '$lib/design/Backdrop.svelte'

    export let moves: Move[]
</script>

<svelte:head>
    <title>Pokemon Moves | Pokemon 5e Tools</title>
</svelte:head>

<Backdrop />
<div class="page">
    <nav class="table" aria-label="Move List">
        <SortableTable let:item items={moves} headers={[ {
            key: 'name', name: 'Name', sort: (l, r) => l.name.localeCompare(r.name),
        }, {
            key: 'type', name: 'Type', sort: (l, r) => l.type.localeCompare(r.type),
        }, {
            key: 'power', name: 'Power', sort: (l, r) => l.power.join(',').localeCompare(r.power.join(',')),
        }, {
            key: 'pp', name: 'PP', sort: (l, r) => l.pp - r.pp,
        } ]}>
            <tr class="row" style:--skin-local-bg="var(--skin-{item.type}-bg)">
                <td class="name"><a href="/moves/{item.id}">{item.name}</a></td>
                <td>{item.type}</td>
                <td>{item.power.join(', ')}</td>
                <td>{item.pp}</td>
            </tr>
        </SortableTable>
    </nav>
    <main>
        <slot></slot>
    </main>
</div>

<style lang="scss">
    .page {
        display: flex;
        flex-wrap: wrap;
        margin: auto;
        justify-content: center;
        max-width: 75rem;

        & > * {
            flex: 0 0 min(37.5rem, 100%);
            padding: 0.5em;
        }
    }

    .table {
        .row {
            position: relative;
            filter: drop-shadow(var(--elev-cumulus));

            td {
                background-color: var(--skin-content);
                color: var(--skin-content-text);
            }

            td.name {
                background-color: var(--skin-bg);
                color: var(--skin-bg-text);

                a {
                    color: var(--skin-bg-text);
                    text-decoration: none;
                }
            }

            td:first-child {
                border-radius: 1em 0 0 1em;
            }

            td:last-child {
                border-radius: 0 1em 1em 0;
            }

            a::before {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
            }

            &:hover {
                td {
                    background-color: var(--skin-bg);
                    color: var(--skin-bg-text);
                }

                td.name {
                    background-color: var(--skin-local-bg);
                }
            }
        }
    }
</style>