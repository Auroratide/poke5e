<script lang="ts">
	import { Button } from "$lib/ui/elements"
	import { SortableTable, BubbleRow, ListHeading } from "$lib/ui/page"
	import { RelativeNumberField, SearchField, SelectField, type RelativeValue } from "$lib/ui/forms"
	import { Url } from "$lib/site/url"
	import type { Fakemon } from "../Fakemon"
	import type { FakemonListStore } from "../store"
	import { PageAction } from "./actions"
	import GetStarted from "./GetStarted.svelte"
	import { fakemonListSorter, fakemonListFilter } from "./sort-and-filter"
	import { m } from "$lib/site/i18n"
	import { SpeciesFilter } from "$lib/poke5e/species"
	import { PokemonType, type PokeType } from "$lib/pokemon/types"
	import { CreatureSizes, type CreatureSize } from "$lib/dnd/CreatureSize"
	import { capitalize } from "$lib/utils/string"
	import { EggGroup } from "$lib/pokemon/egg-group"
	import { BiomesStore } from "$lib/poke5e/habitat"

	export let fakemon: FakemonListStore
	export let showGetStarted = false

	$: hasNoFakemon = $fakemon.length === 0

	const AnyOption = [ {
		name: `- ${m["universal.any"]()} -`,
		value: "",
	} ]

	let filteredType: PokeType | "" = ""
	let typeOptions = AnyOption.concat(Object.values(PokemonType.list).map((it) => ({
		value: it,
		name: capitalize(it),
	})))

	let filteredSize: CreatureSize | "" = ""
	const sizeOptions = AnyOption.concat(Object.values(CreatureSizes).map((it) => ({
		value: it,
		name: capitalize(it),
	})))

	let filteredSr: number | undefined = undefined
	let filteredSrRelative: RelativeValue = "="

	let filteredMinLevel: number | undefined = undefined
	let filteredMinLevelRelative: RelativeValue = "="

	let filteredEggGroup: string = ""
	let eggGroupOptions = AnyOption.concat(EggGroup.standardList.map((it) => ({
		value: it,
		name: capitalize(it),
	})))

	let filteredBiome: string = ""
	$: biomeOptions = AnyOption.concat($BiomesStore?.map((it) => ({
		value: it.id,
		name: it.name,
	})) ?? [])

	$: textFilterIsPokemonType = PokemonType.list.includes($fakemonListFilter.toLocaleLowerCase() as PokeType)

	$: filter = new SpeciesFilter()
		.name(textFilterIsPokemonType ? "" : $fakemonListFilter)
		.type(filteredType !== "" ? filteredType : textFilterIsPokemonType ? $fakemonListFilter : "")
		.size(filteredSize)
		.sr(filteredSrRelative, filteredSr)
		.minLevel(filteredMinLevelRelative, filteredMinLevel)
		.eggGroup(filteredEggGroup)
		.biome(filteredBiome)

	$: filtered = $fakemon.filter((it) => filter.apply(it.species))

	const byStringField = (field: (m: Fakemon) => string) =>
		(l: Fakemon, r: Fakemon) => field(l).localeCompare(field(r))
	
	const resetFilters = () => {
		filteredType = ""
		filteredSize = ""
		filteredSr = undefined
		filteredMinLevel = undefined
		filteredEggGroup = ""
		filteredBiome = ""
	}
</script>

<ListHeading title="Fakémon" target="/fakemon">
	<a slot="link" href="{Url.fakemon(undefined, PageAction.find)}" class="dark-font">{m["fakemon.findByFakemonID"]()} &gt;</a>
	<Button slot="action" href="{Url.fakemon(undefined, PageAction.add)}">+ {m["universal.newFakemon"]()}</Button>
</ListHeading>
<div class="space-bottom">
	<SearchField id="filter-fakemon" label="Search" bind:value={$fakemonListFilter} matched={filtered.length} max={$fakemon.length} activeFilters={filter.count() - ($fakemonListFilter !== "" ? 1 : 0)} on:reset={resetFilters}>
		<SelectField label="{m["universal.type"]()}" bind:value={filteredType} options={typeOptions} />
		<SelectField label="{m["universal.size"]()}" bind:value={filteredSize} options={sizeOptions} />
		<RelativeNumberField label="{m["universal.sr"]()}" bind:value={filteredSr} bind:relative={filteredSrRelative} min={0} max={15} placeholder="{m["universal.number"]()}" />
		<RelativeNumberField label="{m["universal.minLevel"]()}" bind:value={filteredMinLevel} bind:relative={filteredMinLevelRelative} min={0} max={20} placeholder="{m["universal.number"]()}" />
		<SelectField label="{m["universal.eggGroup"]()}" bind:value={filteredEggGroup} options={eggGroupOptions} />
		<SelectField label="{m["universal.biome"]()}" bind:value={filteredBiome} options={biomeOptions} />
	</SearchField>
</div>
{#if hasNoFakemon}
	{#if showGetStarted}<GetStarted />{/if}
{:else}
	<SortableTable let:item let:cellVisibility items={filtered} bind:currentSorter={$fakemonListSorter} headers={[ {
		key: "name", name: m["universal.name"](), ratio: 1, sort: byStringField(it => it.data.species.name),
	} ]}>
		<BubbleRow.Row interactive mainBg="var(--skin-bg-dark)">
			<BubbleRow.Cell cellVisibility={cellVisibility[0]} primary><a href="{Url.fakemon(item.data.readKey)}">{item.data.species.name}</a></BubbleRow.Cell>
		</BubbleRow.Row>
	</SortableTable>
{/if}

<style>
	.space-bottom {
		margin-bottom: 0.5em;
	}

	.dark-font {
		color: var(--skin-content-text);
	}
</style>
