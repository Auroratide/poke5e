<script lang="ts" generics="T">
	type Sorter<S = unknown> = (l: S, r: S) => number
	const noSort = () => 0

	// eslint-disable-next-line no-undef
	export let items: T[]
	export let headers: {
		key: string, // no spaces
		name: string,
		ratio: number,
		sort?: Sorter,
	}[]
	export let currentSorter: Sorter = noSort

	let reversed = false
	$: sorted = items
		.slice(0)
		.sort((l, r) => currentSorter(l, r) * (reversed ? -1 : 1))
	$: arrow = reversed ? "&#9650;" : "&#9660;"
	$: columns = headers.map(it => `${it.ratio}fr`).join(" ")

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

<style>
	table {
		width: 100%;
		flex: 1;
		height: 0;
		display: flex;
		flex-direction: column;
	}

	thead, tbody {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	tbody {
		height: 100%;
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
	}

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
</style>