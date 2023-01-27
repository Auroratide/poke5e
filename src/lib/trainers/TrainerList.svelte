<script lang="ts">
    import { base } from '$app/paths'
    import SearchField from '$lib/design/SearchField.svelte'
    import SortableTable from '$lib/design/SortableTable.svelte'
    import BubbleRow from '$lib/design/BubbleRow'
    import { trainerListFilterValue, trainerListSorter } from './store'
    import type { TrainerListStore } from './trainers'
    import type { Trainer } from './types'
    import Button from '$lib/design/Button.svelte'
    import { Url } from '$lib/url'
    import { PageAction } from './page-action'
    import ListHeading from '$lib/design/ListHeading.svelte'

    export let trainers: TrainerListStore

    $: filtered = $trainers.filter((it) => it.name.toLocaleLowerCase().includes($trainerListFilterValue.toLocaleLowerCase()))

    const byStringField = (field: (m: Trainer) => string) =>
        (l: Trainer, r: Trainer) => field(l).localeCompare(field(r))
</script>

<ListHeading title="Trainer List">
    <a slot="link" href="{Url.trainers(undefined, undefined, PageAction.findTrainer)}" class="dark-font">Find by trainer ID &gt;</a>
    <Button slot="action" href="{base}/trainers?action=new-trainer">+ New Trainer</Button>
</ListHeading>
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

<style>
    .space-bottom {
        margin-bottom: 0.5em;
    }

    .dark-font {
        color: var(--skin-content-text);
    }
</style>