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

    export let moves: Move[]
</script>

<svelte:head>
    <title>Pokemon Moves | Pokemon 5e Tools</title>
</svelte:head>

<main>
    <h1>Pokemon Moves</h1>
    <div class="layout">
        <section class="table">
            <SortableTable let:item items={moves} headers={[ {
                key: 'name', name: 'Name', sort: (l, r) => l.name.localeCompare(r.name),
            }, {
                key: 'type', name: 'Type', sort: (l, r) => l.type.localeCompare(r.type),
            }, {
                key: 'power', name: 'Power', sort: (l, r) => l.power.join(',').localeCompare(r.power.join(',')),
            } ]}>
                <tr class="row">
                    <td><a href="/moves/{item.id}">{item.name}</a></td>
                    <td>{item.type}</td>
                    <td>{item.power.join(', ')}</td>
                </tr>
            </SortableTable>
        </section>
        <section class="content">
            <slot></slot>
        </section>
    </div>
</main>

<style lang="scss">
    .table {
        .row {
            position: relative;

            a::before {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
            }

            &:hover {
                background-color: #eee;
            }
        }
    }
</style>