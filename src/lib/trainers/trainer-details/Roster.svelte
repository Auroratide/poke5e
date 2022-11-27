<script lang="ts">
    import { base } from '$app/paths'
    import SearchField from '$lib/design/SearchField.svelte'
    import SortableTable from '$lib/design/SortableTable.svelte'
    import BubbleRow from '$lib/design/BubbleRow'
    import GenderIcon from '$lib/design/GenderIcon.svelte'
    import { filterValue, currentSorter } from '../store'
    import type { TrainerData } from '../trainers'
    import type { TrainerPokemon } from '../types'

    export let trainer: TrainerData

    $: filtered = trainer.pokemon.filter((it) => it.nickname.toLocaleLowerCase().includes($filterValue.toLocaleLowerCase()))

    const byStringField = (field: (m: TrainerPokemon) => string) =>
        (l: TrainerPokemon, r: TrainerPokemon) => field(l).localeCompare(field(r))
    const byNumericField = (field: (m: TrainerPokemon) => number) =>
        (l: TrainerPokemon, r: TrainerPokemon) => field(l) - field(r)
</script>

<div class="space-bottom">
    <SearchField id="filter-pokemon" label="Search" bind:value={$filterValue} matched={filtered.length} max={trainer.pokemon.length} />
</div>
<!-- svelte-ignore a11y-no-redundant-roles -->
<SortableTable let:item items={filtered} bind:currentSorter={$currentSorter} headers={[ {
    key: 'name', name: 'Name', ratio: 3, sort: byStringField(it => it.nickname),
}, {
    key: 'gender', name: 'Gender', ratio: 3, sort: byStringField(it => it.gender),
}, {
    key: 'level', name: 'Level', ratio: 1, sort: byNumericField(it => it.level),
} ]}>
    <BubbleRow.Row interactive mainBg="var(--skin-{item.gender}-bg)">
        <BubbleRow.Cell primary><a href="{base}/trainers?id={trainer.info.id}&pokemon={item.id}">{item.nickname}</a></BubbleRow.Cell>
        <BubbleRow.Cell><GenderIcon gender={item.gender} /></BubbleRow.Cell>
        <BubbleRow.Cell>Lv. {item.level}</BubbleRow.Cell>
    </BubbleRow.Row>
</SortableTable>

<style lang="scss">
    .space-bottom {
        margin-bottom: 0.5em;
    }
</style>