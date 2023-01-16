<script lang="ts">
    import { base } from '$app/paths'
    import SearchField from '$lib/design/SearchField.svelte'
    import SortableTable from '$lib/design/SortableTable.svelte'
    import BubbleRow from '$lib/design/BubbleRow'
    import { trainerListFilterValue, trainerListSorter } from './store'
    import type { TrainerListStore } from './trainers'
    import type { Trainer } from './types'
    import Button from '$lib/design/Button.svelte'

    export let trainers: TrainerListStore

    $: filtered = $trainers.filter((it) => it.name.toLocaleLowerCase().includes($trainerListFilterValue.toLocaleLowerCase()))

    const byStringField = (field: (m: Trainer) => string) =>
        (l: Trainer, r: Trainer) => field(l).localeCompare(field(r))
</script>

<div class="flex-row space-bottom">
    <div class="flex-column" style:flex="1">
        <h1 class="large-font no-space">Trainer List</h1>
    </div>
    <Button href="{base}/trainers?action=new-trainer">+ New Trainer</Button>
</div>
<div class="space-bottom">
    <SearchField id="filter-pokemon" label="Search" bind:value={$trainerListFilterValue} matched={filtered.length} max={$trainers.length} />
</div>
<!-- svelte-ignore a11y-no-redundant-roles -->
<SortableTable let:item items={filtered} bind:currentSorter={$trainerListSorter} headers={[ {
    key: 'name', name: 'Name', ratio: 1, sort: byStringField(it => it.name),
} ]}>
    <BubbleRow.Row interactive mainBg="var(--skin-bg-dark)">
        <BubbleRow.Cell primary><a href="{base}/trainers?id={item.readKey}">{item.name}</a></BubbleRow.Cell>
    </BubbleRow.Row>
</SortableTable>

<style lang="scss">
    .flex-row {
        display: flex;
        align-items: flex-end;
    }

    .space-bottom {
        margin-bottom: 0.5em;
    }

    .large-font {
        font-size: var(--font-sz-neptune);
        font-weight: bold;
    }

    .small-font {
        font-size: var(--font-sz-venus);
    }

    .indent {
        text-indent: 1em;
    }

    .dark-font {
        color: var(--skin-content-text);
    }

    .no-space {
        margin: 0;
    }
</style>