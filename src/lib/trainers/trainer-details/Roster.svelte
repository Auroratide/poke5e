<script lang="ts">
    import { base } from '$app/paths'
    import SearchField from '$lib/design/SearchField.svelte'
    import SortableTable from '$lib/design/SortableTable.svelte'
    import BubbleRow from '$lib/design/BubbleRow'
    import GenderIcon from '$lib/design/GenderIcon.svelte'
    import { filterValue, currentSorter } from '../store'
    import type { TrainerStore } from '../trainers'
    import type { PokemonId, TrainerPokemon } from '../types'
    import Button from '$lib/design/Button.svelte'

    export let trainer: TrainerStore
    export let currentPokemon: PokemonId | undefined

    $: filtered = $trainer.pokemon.filter((it) => it.nickname.toLocaleLowerCase().includes($filterValue.toLocaleLowerCase()))
    $: baseTrainerUrl = `${base}/trainers?id=${$trainer.info.readKey}`

    const byStringField = (field: (m: TrainerPokemon) => string) =>
        (l: TrainerPokemon, r: TrainerPokemon) => field(l).localeCompare(field(r))
    const byNumericField = (field: (m: TrainerPokemon) => number) =>
        (l: TrainerPokemon, r: TrainerPokemon) => field(l) - field(r)
</script>

<div class="flex-row space-bottom">
    <div class="flex-column" style:flex="1">
        <p class="large-font no-space">{$trainer.info.name}'s Pokemon</p>
        <p class="indent small-font no-space">
            {#if currentPokemon}
                <a href="{baseTrainerUrl}" class="dark-font">View trainer profile &gt;</a>
            {:else}
                <a href="{base}/trainers" class="dark-font">See Trainer List &gt;</a>
            {/if}
        </p>
    </div>
    <Button href="{baseTrainerUrl}&action=add-pokemon">+ Add Pokemon</Button>
</div>
<div class="space-bottom">
    <SearchField id="filter-pokemon" label="Search" bind:value={$filterValue} matched={filtered.length} max={$trainer.pokemon.length} />
</div>
<!-- svelte-ignore a11y-no-redundant-roles -->
<SortableTable let:item items={filtered} bind:currentSorter={$currentSorter} headers={[ {
    key: 'name', name: 'Name', ratio: 3, sort: byStringField(it => it.nickname),
}, {
    key: 'gender', name: 'Gender', ratio: 2, sort: byStringField(it => it.gender),
}, {
    key: 'level', name: 'Level', ratio: 1, sort: byNumericField(it => it.level),
} ]}>
    <BubbleRow.Row interactive mainBg="var(--skin-{item.gender}-bg)">
        <BubbleRow.Cell primary><a href="{baseTrainerUrl}&pokemon={item.id}">{item.nickname}</a></BubbleRow.Cell>
        <BubbleRow.Cell><GenderIcon gender={item.gender} /></BubbleRow.Cell>
        <BubbleRow.Cell>Lv. {item.level}</BubbleRow.Cell>
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