<script lang="ts" context="module">
	export type SpeciesFieldChangeEvent = CustomEvent<{ species: PokemonSpecies }>
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { TextField } from "$lib/design/forms"
	import { matchNameOrType2 } from "$lib/creatures/filter"
	import type { PokemonSpecies } from "./PokemonSpecies"
	import Button from "$lib/design/Button.svelte"
	import { kebab } from "$lib/design/forms/kebab"
	import { slide } from "svelte/transition"

	const dispatch = createEventDispatcher()

	export let label: string
	export let value: string
	export let name: string
	export let allSpecies: PokemonSpecies[]
	export let disabled = false
	export let isSpeciesDisabled: (species: PokemonSpecies) => string | false = () => false // return string is the reason for being disabled

	$: id = name ?? kebab(label)

	let species = allSpecies?.find((it) => it.id.data === value)?.name ?? ""
	let confirmed = species.length > 0
	$: filteredPokemon = species.length > 0
		? allSpecies?.filter(matchNameOrType2(species)) ?? []
		: [] // if we haven't typed anything, don't show the ENTIRE list

	const confirm = (p: PokemonSpecies) => {
		species = p.name
		confirmed = true
		dispatch("change", { species: p })
	}

	const onSelect = (p: PokemonSpecies) => () => {
		confirm(p)
	}

	const onFocus = () => {
		confirmed = false
	}

	// We use focusout instead of blur for accessibility. People who tab out of the
	// filter field need to be able to tab through the list of button options, so we
	// can't perform a submit on blur of the text field.
	const onFocusOut = (e: FocusEvent) => {
		if (!(e.currentTarget as HTMLElement)?.contains(e.relatedTarget as Node)) {
			const exactMatch = filteredPokemon.find((it) => it.name.toLocaleLowerCase() === species.toLocaleLowerCase())

			if (!confirmed && exactMatch != null && !isSpeciesDisabled(exactMatch)) {
				confirm(exactMatch)
			}
		}

	}
</script>

<div class="species-field" on:focusout={onFocusOut}>
	<div class="field">
		<TextField {label} name={id} bind:value={species} {disabled} on:focus={onFocus} customError={confirmed ? undefined : "Please select a valid pokemon"} />
	</div>
	{#if filteredPokemon.length === 0 && species.length > 0}
		<p class="muted center fixed-height" transition:slide>No matched pokemon</p>
	{:else if !confirmed && species.length > 0}
		<div class="fixed-height smaller-font" transition:slide>
			<ul class="no-list columnated">
				{#each filteredPokemon as p}
					{@const speciesDisabled = isSpeciesDisabled(p)}
					<li class="spaced-sm overflow-ellipsis">
						<Button align="left" width="full" on:click={onSelect(p)} disabled={disabled || speciesDisabled !== false} title={speciesDisabled ? speciesDisabled : undefined}>{p.data.name}</Button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	.species-field {
		display: flex;
		flex-direction: column;
	}

	.field {
		margin-block-end: 0.75em;
	}

	.no-list {
		list-style: none;
		padding: 0;
	}

	.columnated {
		display: grid;
		grid-template-rows: repeat(3, 1.5em);
		grid-auto-rows: 0;
		grid-auto-flow: column;
		grid-auto-columns: 12.5em;
		gap: 0.5em;
		inline-size: 100cqi;
	}

	.spaced-sm {
		margin-bottom: 0.25em;
	}

	.muted {
		opacity: 0.75;
	}

	.center {
		text-align: center;
	}

	.fixed-height {
		block-size: 6.5em;
		overflow-x: auto;
		container-type: inline-size;
		margin-block-end: 0.5em;
	}

	.smaller-font {
		font-size: var(--font-sz-venus);
	}

	.overflow-ellipsis > :global(button) {
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>