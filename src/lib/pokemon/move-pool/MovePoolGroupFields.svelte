<script lang="ts">
	import { Button } from "$lib/ui/elements"
	import { Details } from "$lib/ui/elements"
	import { FormGroup, SelectField } from "$lib/ui/forms"
	import { VisuallyHidden } from "$lib/ui/elements"
	import { Attributes, type Attribute } from "$lib/dnd/attributes"
	import { MoveFilter } from "$lib/moves/MoveFilter"
	import { PokemonType, type PokeType } from "$lib/pokemon/types"
	import MoveOption from "./MoveOption.svelte"
	import SearchAndFilterField from "./SearchAndFilterField.svelte"
	import type { Move } from "$lib/moves/Move"
	import { m } from "$lib/site/i18n"

	export let title: string
	export let values: string[]
	export let disabled = false
	export let moves: Move[] = []
	export let useTmName: boolean = false

	$: id = title.replaceAll(/\s/g, "-").toLocaleLowerCase()

	$: options = moves.map((it) => ({
		name: it.name,
		value: it.id,
		disabled: values.includes(it.id),
	}))

	const add = (moveId: string) => () => {
		values = [...values, moveId]
	}

	const remove = (i: number) => () => {
		values = values.toSpliced(i, 1)
	}

	let nameFilter = ""
	let typeFilter: PokeType | "" = ""
	let powerFilter: Attribute | "" = ""
	$: tmFilter = parseInt(nameFilter)
	$: moveFilter = new MoveFilter()
		.name(isNaN(tmFilter) ? nameFilter : "")
		.tm(isNaN(tmFilter) ? undefined : tmFilter)
		.type(typeFilter)
		.power(powerFilter)
		.not(values)
	$: filteredMoves = (nameFilter === "" && typeFilter === "" && powerFilter === "") ? [] : moves.filter(moveFilter.apply)

	const countActiveFilters = (...filters: string[]) => filters.reduce((sum, cur) => sum + (cur === "" ? 0 : 1), 0)

	const typeOptions = [ {
		name: `- ${m.any()} -`,
		value: "",
	} ].concat(PokemonType.list.map((it) => ({
		name: it,
		value: it,
	})))

	const movePowerOptions = [ {
		name: `- ${m.any()} -`,
		value: "",
	} ].concat(Attributes.list.map((it) => ({
		name: it.name,
		value: it.abbr,
	})))
</script>

{#if options.length > 0}
	<FormGroup {title}>
		{#if values.length > 0}
			<ul class="space-bottom">
				{#each values as value, index}
					{@const move = moves.find((it) => it.id === value)}
					<li>
						<MoveOption idPrefix="{id}" value={move} {useTmName}>
							<Button variant="danger" on:click={remove(index)}><strong><span aria-hidden="true">&times;</span><VisuallyHidden inline>{m.remove()}</VisuallyHidden></strong></Button>
						</MoveOption>
					</li>
				{/each}
			</ul>
		{:else}
			<p>{m.noMovesAddedYet()}</p>
		{/if}

		<Details title={m.addMoves()}>
			<SearchAndFilterField name="{id}-search" label={m.findMoveToAdd()} bind:value={nameFilter} {disabled} matches={filteredMoves.length} placeholder="{m.eG()} Power Split" activeFilters={countActiveFilters(typeFilter, powerFilter)}>
				<SelectField name="{id}-type-filter" label={m.type()} options={typeOptions} bind:value={typeFilter} />
				<SelectField name="{id}-move-power-filter" label={m.power()} options={movePowerOptions} bind:value={powerFilter} />
			</SearchAndFilterField>
			<ul class="scrollable">
				{#each filteredMoves as move (move.id)}
					<li>
						<MoveOption idPrefix="{id}" value={move} {useTmName}>
							<Button variant="success" on:click={add(move.id)}><strong><span aria-hidden="true">+</span><VisuallyHidden inline>{m.add()}</VisuallyHidden></strong></Button>
						</MoveOption>
					</li>
				{/each}
			</ul>
		</Details>
	</FormGroup>
{/if}

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}

	.space-bottom {
		margin-block-end: 1em;
	}

	.scrollable {
		overflow: auto;
		block-size: 12.5em;
	}
</style>
