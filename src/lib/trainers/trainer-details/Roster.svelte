<script lang="ts">
    import { base } from '$app/paths'
    import SearchField from '$lib/design/SearchField.svelte'
    import { filterValue } from '../store'
    import type { TrainerStore } from '../trainers'
    import type { PokemonId, TrainerPokemon } from '../types'
    import Button from '$lib/design/Button.svelte'
    import PokemonSummary from './PokemonSummary.svelte'

    export let trainer: TrainerStore
    export let currentPokemon: PokemonId | undefined

    $: editable = trainer.update != null

    const byStringField = (field: (m: TrainerPokemon) => string) =>
        (l: TrainerPokemon, r: TrainerPokemon) => field(l).localeCompare(field(r))

    $: filtered = $trainer.pokemon
        .filter((it) => it.nickname.toLocaleLowerCase().includes($filterValue.toLocaleLowerCase()))
        .sort(byStringField((it) => it.nickname))
    $: baseTrainerUrl = `${base}/trainers?id=${$trainer.info.readKey}`
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
    <div style:visibility={editable ? 'visible' : 'hidden'}>
        <Button href="{baseTrainerUrl}&action=add-pokemon">+ Add Pokemon</Button>
    </div>
</div>
<div class="space-bottom">
    <SearchField id="filter-pokemon" label="Search" bind:value={$filterValue} matched={filtered.length} max={$trainer.pokemon.length} />
</div>
<div class="relative"><!-- Needed for the > indicators to appear outside the scroll box -->
    <div class="scrollable">
        <ul class="nolist no-space partial-width">
            {#each filtered as p (p.id)}
                <li class="space-after">
                    <PokemonSummary trainer={$trainer.info.readKey} pokemon={p} />
                </li>
            {/each}
        </ul>
    </div>
</div>

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

    .scrollable {
        height: 100%;
        overflow: auto;
    }

    .space-after {
        margin-bottom: 0.5em;
    }

    .partial-width {
        width: 75%;
    }

    .relative {
        position: relative;
        height: 0;
        flex: 1;
    }
</style>