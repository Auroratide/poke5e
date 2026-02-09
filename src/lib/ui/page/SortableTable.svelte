<script lang="ts" generics="T">
	type Sorter<S = unknown> = (l: S, r: S) => number
	const noSort = () => 0

	export let items: T[]
	export let headers: {
		key: string, // no spaces
		name: string,
		ratio: number,
		sort?: Sorter,
		largeScreenOnly?: boolean
	}[]
	export let currentSorter: Sorter = noSort

	let reversed = false
	$: sorted = items
		.slice(0)
		.sort((l, r) => currentSorter(l, r) * (reversed ? -1 : 1))
	$: arrow = reversed ? "&#9650;" : "&#9660;"
	$: smallColumns = headers.filter((it) => !it.largeScreenOnly).map(it => `${it.ratio}fr`).join(" ")
	$: largeColumns = headers.map(it => `${it.ratio}fr`).join(" ")
	$: cellVisibility = headers.map((it, i) => ({
		largeScreenOnly: it.largeScreenOnly,
		lastVisibleCell: headers.slice(i + 1).every((it2) => it2.largeScreenOnly),
	}))

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
<table role="table" style:--large-table-columns={largeColumns} style:--small-table-columns={smallColumns}>
	<thead role="rowgroup">
		<tr role="row">{#each headers as header (header.key)}
			<th role="columnheader" style="--alignment: var(--{header.key}-alignment);" class:large-screen-only={header.largeScreenOnly}>{#if header.sort !== undefined}
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
			<slot {item} {cellVisibility}><tr></tr></slot>
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

	thead {
		overflow-y: auto;
		height: 1.75em;
		scrollbar-gutter: stable;
		scrollbar-color: transparent transparent;
	}

	tbody {
		height: 100%;
		overflow-y: scroll;
	}

	table :global(tr) {
		display: grid;
		grid-template-columns: var(--large-table-columns);
		margin-bottom: 0.25em;
	}

	table :global(td), :global(th) {
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

	@media screen and (max-width: 75rem) {
		table :global(tr) {
			grid-template-columns: var(--small-table-columns);
		}

		.large-screen-only {
			display: none;
		}
	}
</style>