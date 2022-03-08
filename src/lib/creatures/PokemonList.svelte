<script lang="ts">
    import type { Pokemon } from './types'
    import SortableTable from '../design/SortableTable.svelte'
    import SearchField from '../design/SearchField.svelte'

    export let pokemons: Pokemon[]

    let filterValue: string = ''
    $: filtered = pokemons.filter(it => it.name.toLocaleLowerCase().includes(filterValue))

    const byStringField = (field: (m: Pokemon) => string) => (l: Pokemon, r: Pokemon) => field(l).localeCompare(field(r))
    const byNumericField = (field: (m: Pokemon) => number) => (l: Pokemon, r: Pokemon) => field(l) - field(r)
</script>

<div class="search-field">
    <SearchField id="filter-moves" label="Search" bind:value={filterValue} matched={filtered.length} max={pokemons.length} />
</div>
<!-- svelte-ignore a11y-no-redundant-roles -->
<SortableTable let:item items={filtered} headers={[ {
    key: 'name', name: 'Name', ratio: 3, sort: byStringField(it => it.name),
}, {
    key: 'type', name: 'Type', ratio: 3, sort: byStringField(it => it.type.join(', ')),
}, {
    key: 'sr', name: 'SR', ratio: 1, sort: byStringField(it => it.sr),
} ]}>
    <tr role="row" class="row" style:--skin-local-bg="var(--skin-{item.type[0]}-bg)">
        <td role="cell" class="name"><a href="/pokemon/{item.id}">{item.name}</a></td>
        <td role="cell">{item.type.join(', ')}</td>
        <td role="cell">{item.sr}</td>
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