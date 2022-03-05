<script lang="ts">
    type Sorter = (l: any, r: any) => number

    export let items: any[]
    export let headers: {
        key: string, // no spaces
        name: string,
        sort?: Sorter,
    }[]

    const noSort = () => 0

    let reversed = false
    let currentSorter: Sorter = noSort
    $: sorted = items
        .slice(0)
        .sort((l, r) => currentSorter(l, r) * (reversed ? -1 : 1))
    $: arrow = reversed ? '&#9650;' : '&#9660;'

    const toggle = (sort: Sorter) => () => {
        if (sort === currentSorter && !reversed) {
            reversed = true
        } else if (sort === currentSorter) {
            reversed = false
            currentSorter = noSort
        } else {
            reversed = false
            currentSorter = sort
        }
    }
</script>

<table>
    <thead>
        <tr>{#each headers as header (header.key)}
            <th style="--alignment: var(--{header.key}-alignment);">{#if header.sort !== undefined}
                <button on:click={toggle(header.sort)}>
                    <span>{header.name}</span>
                    {#if header.sort === currentSorter}
                        <span class="sort-arrow">{@html arrow}</span>
                    {/if}
                </button>
            {:else}
                {header.name}
            {/if}</th>
        {/each}</tr>
    </thead>
    <tbody>
        {#each sorted as item}
            <slot {item}><tr></tr></slot>
        {/each}
    </tbody>
</table>

<style lang="scss">
    table {
        width: 100%;
        border-collapse: collapse;

        :global(tr) {
            border-bottom: 1px solid black;
        }
    }

    th {
        text-align: var(--alignment, left);
        font-weight: bold;

        button {
            border: none;
            background: none;
            padding: 0;
            margin: 0;
            font-weight: bold;
            width: 100%;
            text-align: inherit;
            cursor: pointer;
        }

        .sort-arrow {
            font-size: 0.75em;
        }
    }
</style>