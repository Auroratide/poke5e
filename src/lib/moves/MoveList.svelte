<script lang="ts">
    import type { Move } from './types'
    import { base } from '$app/paths'
    import SortableTable from '../design/SortableTable.svelte'
    import SearchField from '../design/SearchField.svelte'
    import { powerAsString } from './string'
    import { matchNameOrType } from './filter'
    import { filterValue, currentSorter } from './store'
    import BubbleRow from '../design/BubbleRow'

    export let moves: Move[]

    $: filteredMoves = moves.filter(matchNameOrType($filterValue))

    const byStringField = (field: (m: Move) => string) => (l: Move, r: Move) => field(l).localeCompare(field(r))
    const byNumericField = (field: (m: Move) => number) => (l: Move, r: Move) => field(l) - field(r)
</script>

<div class="search-field">
    <SearchField id="filter-moves" label="Search" bind:value={$filterValue} matched={filteredMoves.length} max={moves.length} />
</div>
<!-- svelte-ignore a11y-no-redundant-roles -->
<SortableTable let:item items={filteredMoves} bind:currentSorter={$currentSorter} headers={[ {
    key: 'name', name: 'Name', ratio: 3, sort: byStringField(it => it.name),
}, {
    key: 'type', name: 'Type', ratio: 2, sort: byStringField(it => it.type),
}, {
    key: 'power', name: 'Power', ratio: 2, sort: byStringField(it => powerAsString(it.power)),
}, {
    key: 'pp', name: 'PP', ratio: 1, sort: byNumericField(it => it.pp),
} ]}>
    <BubbleRow.Row interactive mainBg="var(--skin-{item.type}-bg)">
        <BubbleRow.Cell primary><a href="{base}/moves/{item.id}">{item.name}</a></BubbleRow.Cell>
        <BubbleRow.Cell>{item.type}</BubbleRow.Cell>
        <BubbleRow.Cell>{powerAsString(item.power)}</BubbleRow.Cell>
        <BubbleRow.Cell>{item.pp}</BubbleRow.Cell>
    </BubbleRow.Row>
</SortableTable>

<style lang="scss">
    .search-field {
        margin-bottom: 0.5em;
    }    
</style>