<script lang="ts">
    import type { Tm, Move } from './types'
    import { base } from '$app/paths'
    import SortableTable from '../design/SortableTable.svelte'
    import SearchField from '../design/SearchField.svelte'
    import { matchNameOrType } from './filter'
    import { filterTmValue, currentTmSorter } from './store'
    import BubbleRow from '../design/BubbleRow'
    import { formatMoney } from '../pokemon/money'

    export let tms: Tm[]

    $: filtered = tms.filter(tm => matchNameOrType($filterTmValue)(tm.moveInfo))

    const byStringField = (field: (m: Tm) => string) => (l: Tm, r: Tm) => field(l).localeCompare(field(r))
    const byNumericField = (field: (m: Tm) => number) => (l: Tm, r: Tm) => field(l) - field(r)
</script>

<div class="search-field">
    <SearchField id="filter-moves" label="Search" bind:value={$filterTmValue} matched={filtered.length} max={tms.length} />
</div>
<!-- svelte-ignore a11y-no-redundant-roles -->
<SortableTable let:item items={filtered} bind:currentSorter={$currentTmSorter} headers={[ {
    key: 'name', name: 'Name', ratio: 3, sort: byStringField(it => it.moveInfo.name),
}, {
    key: 'type', name: 'Type', ratio: 2, sort: byStringField(it => it.moveInfo.type),
}, {
    key: 'cost', name: 'Cost', ratio: 2, sort: byNumericField(it => it.cost),
} ]}>
    <BubbleRow.Row interactive mainBg="var(--skin-{item.moveInfo.type}-bg)">
        <BubbleRow.Cell primary><a href="{base}/tms/{item.id}">{item.moveInfo.name}</a></BubbleRow.Cell>
        <BubbleRow.Cell>{item.moveInfo.type}</BubbleRow.Cell>
        <BubbleRow.Cell>{formatMoney(item.cost)}</BubbleRow.Cell>
    </BubbleRow.Row>
</SortableTable>

<style lang="scss">
    .search-field {
        margin-bottom: 0.5em;
    }    
</style>