<script lang="ts">
    type Sorter = (l: any, r: any) => number

    export let items: any[]
    export let headers: {
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
        <tr>{#each headers as header}
            <th>{#if header.sort !== undefined}
                <button on:click={toggle(header.sort)}>
                    <span>{header.name}</span>
                    {#if header.sort === currentSorter}
                        <span>{@html arrow}</span>
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
