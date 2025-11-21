<script lang="ts" context="module">
	export type MoveFieldChangeEvent = CustomEvent<{ move: Move }>
</script>

<script lang="ts">
	import TextField from "$lib/design/forms/TextField.svelte"
	import { createEventDispatcher } from "svelte"
	import { slide } from "svelte/transition"
	import { MoveFilter } from "../MoveFilter"
	import type { Move } from "../types"
	import MoveOption from "./MoveOption.svelte"

	const dispatch = createEventDispatcher()

	export let label: string
	export let value: Move["id"]
	export let name: string
	export let moves: Move[]
	export let disabled = false

	let nameFilter = moves?.find((it) => it.id === value)?.name ?? ""
	let confirmed = nameFilter.length > 0
	$: moveFilter = new MoveFilter()
		.name(nameFilter)
	$: filteredMoves = (nameFilter === "") ? [] : moves.filter(moveFilter.apply)

	const onSelect = (move: Move) => () => {
		confirm(move)
	}

	const onBlur = () => {
		const exactMatch = filteredMoves.find((it) => it.name.toLocaleLowerCase() === nameFilter.toLocaleLowerCase())

		if (!confirmed && exactMatch != null) {
			confirm(exactMatch)
		}
	}

	const onFocus = () => {
		confirmed = false
	}

	const confirm = (m: Move) => {
		nameFilter = m.name
		confirmed = true
		dispatch("change", { move: m })
	}
</script>

<div class="move-field">
	<div class="field">
		<TextField {label} {name} bind:value={nameFilter} on:blur={onBlur} on:focus={onFocus} customError={confirmed ? undefined : "Please select a valid move"} {disabled} />
	</div>
	{#if filteredMoves.length === 0 && nameFilter.length > 0}
		<p class="muted center fixed-height" transition:slide>No matched moves</p>
	{:else if !confirmed && nameFilter.length > 0}
		<div class="fixed-height smaller-font" transition:slide>
			<ul class="no-list columnated">
				{#each filteredMoves as move (move.id)}
					<li>
						<MoveOption value={move} on:click={onSelect(move)} {disabled} />
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	.field {
		margin-block-end: 0.75em;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}

	.fixed-height {
		block-size: 6.5em;
		overflow-x: auto;
		container-type: inline-size;
		margin-block-end: 0.5em;
	}

	.muted {
		opacity: 0.75;
		font-size: var(--font-sz-venus);
	}

	.center { text-align: center; }
</style>
