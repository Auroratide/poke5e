<script lang="ts">
    import type { Move } from './types'
    import SortableTable from '../design/SortableTable.svelte'
    import SearchField from '../design/SearchField.svelte'
    import { powerAsString } from './string'
    import { matchNameOrType } from './filter'

    export let moves: Move[]

    let filterValue: string = ''
    $: filteredMoves = moves.filter(matchNameOrType(filterValue))

    const byStringField = (field: (m: Move) => string) => (l: Move, r: Move) => field(l).localeCompare(field(r))
    const byNumericField = (field: (m: Move) => number) => (l: Move, r: Move) => field(l) - field(r)
</script>

<SearchField id="filter-moves" label="Search" bind:value={filterValue} matched={filteredMoves.length} max={moves.length} />
<SortableTable let:item items={filteredMoves} headers={[ {
    key: 'name', name: 'Name', sort: byStringField(it => it.name),
}, {
    key: 'type', name: 'Type', sort: byStringField(it => it.type),
}, {
    key: 'power', name: 'Power', sort: byStringField(it => powerAsString(it.power)),
}, {
    key: 'pp', name: 'PP', sort: byNumericField(it => it.pp),
} ]}>
    <tr class="row" style:--skin-local-bg="var(--skin-{item.type}-bg)">
        <td class="name"><a href="/moves/{item.id}">{item.name}</a></td>
        <td>{item.type}</td>
        <td>{powerAsString(item.power)}</td>
        <td>{item.pp}</td>
    </tr>
</SortableTable>

<style lang="scss">
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
</style>