<script lang="ts">
    type Sorter = (l: any, r: any) => number

    export let items: any[]
    export let headers: {
        key: string, // no spaces
        name: string,
        ratio: number,
        sort?: Sorter,
    }[]

    const noSort = () => 0

    let reversed = false
    let currentSorter: Sorter = noSort
    $: sorted = items
        .slice(0)
        .sort((l, r) => currentSorter(l, r) * (reversed ? -1 : 1))
    $: arrow = reversed ? '&#9650;' : '&#9660;'
    $: columns = headers.map(it => `${it.ratio}fr`).join(' ')

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

<!-- svelte-ignore a11y-no-redundant-roles -->
<table role="table" style:--table-columns={columns}>
    <thead role="rowgroup">
        <tr role="row">{#each headers as header (header.key)}
            <th role="columnheader" style="--alignment: var(--{header.key}-alignment);">{#if header.sort !== undefined}
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
    <tbody role="rowgroup">
        {#each sorted as item}
            <slot {item}><tr></tr></slot>
        {/each}
    </tbody>
</table>

<style lang="scss">
    table {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        thead, tbody {
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        tbody {
            height: calc(100% - 4em); // TODO what is this really?
            overflow: auto;
        }

        :global(tr) {
            display: grid;
            grid-template-columns: var(--table-columns);
            margin-bottom: 0.25em;
        }

        :global(td), :global(th) {
            padding: 0.125em 1em;
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
    }
</style>