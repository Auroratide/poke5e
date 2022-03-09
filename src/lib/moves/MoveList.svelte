<script lang="ts">
    import type { Move } from './types'
    import { base } from '$app/paths'
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

<div class="search-field">
    <SearchField id="filter-moves" label="Search" bind:value={filterValue} matched={filteredMoves.length} max={moves.length} />
</div>
<!-- svelte-ignore a11y-no-redundant-roles -->
<SortableTable let:item items={filteredMoves} headers={[ {
    key: 'name', name: 'Name', ratio: 3, sort: byStringField(it => it.name),
}, {
    key: 'type', name: 'Type', ratio: 2, sort: byStringField(it => it.type),
}, {
    key: 'power', name: 'Power', ratio: 2, sort: byStringField(it => powerAsString(it.power)),
}, {
    key: 'pp', name: 'PP', ratio: 1, sort: byNumericField(it => it.pp),
} ]}>
    <tr role="row" class="row" style:--skin-local-bg="var(--skin-{item.type}-bg)">
        <td role="cell" class="name"><a href="{base}/moves/{item.id}">{item.name}</a></td>
        <td role="cell">{item.type}</td>
        <td role="cell">{powerAsString(item.power)}</td>
        <td role="cell">{item.pp}</td>
    </tr>
</SortableTable>

<style lang="scss">
    .search-field {
        margin-bottom: 0.5em;
    }

    .row {
        position: relative;
        border-radius: 1em;
        box-shadow: var(--elev-cumulus);

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