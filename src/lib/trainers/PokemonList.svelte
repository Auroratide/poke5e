<script lang="ts">
    import type { TrainerPokemon, TrainerId } from './types'
    import { base } from '$app/paths'
    import SortableTable from '../design/SortableTable.svelte'
    import SearchField from '../design/SearchField.svelte'
    import { filterValue, currentSorter } from './store'
    import BubbleRow from '../design/BubbleRow'
    import GenderIcon from '../design/GenderIcon.svelte'

    export let trainerId: TrainerId
    export let pokemons: TrainerPokemon[]

    $: filtered = pokemons.filter((it) => it.nickname.toLocaleLowerCase().includes($filterValue.toLocaleLowerCase()))

    const byStringField = (field: (m: TrainerPokemon) => string) => (l: TrainerPokemon, r: TrainerPokemon) => field(l).localeCompare(field(r))
    const byNumericField = (field: (m: TrainerPokemon) => number) => (l: TrainerPokemon, r: TrainerPokemon) => field(l) - field(r)
</script>

<div class="search-field">
    <SearchField id="filter-moves" label="Search" bind:value={$filterValue} matched={filtered.length} max={pokemons.length} />
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
        <BubbleRow.Cell primary><a href="{base}/trainer?trainer={trainerId}&pokemon={item.id}">{item.nickname}</a></BubbleRow.Cell>
        <BubbleRow.Cell><GenderIcon gender={item.gender} /></BubbleRow.Cell>
        <BubbleRow.Cell>Lv. {item.level}</BubbleRow.Cell>
    </BubbleRow.Row>
</SortableTable>

<style lang="scss">
    .search-field {
        margin-bottom: 0.5em;
    }
</style>