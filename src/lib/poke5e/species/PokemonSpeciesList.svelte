<script lang="ts">
	import { RelativeNumberField, SearchField, SelectField, type RelativeValue } from "$lib/ui/forms"
	import { SortableTable, BubbleRow } from "$lib/ui/page"
	import { pokemonFilter, pokemonSorter } from "$lib/site/stores"
	import { PokemonSpecies } from "./PokemonSpecies"
	import { TemporaryBannerMessage } from "$lib/ui/elements"
	import { Url } from "$lib/site/url"
	import { OfficialFakemonRemovedBanner, readdOfficialFakemon } from "$lib/fakemon/OfficialFakemonRemovedBanner"
	import { m } from "$lib/site/i18n";
	import { CreatureSizes, type CreatureSize } from "$lib/dnd/CreatureSize"
	import { capitalize } from "$lib/utils/string"
	import { SpeciesFilter } from "./SpeciesFilter"

	export let pokemons: PokemonSpecies[]
	export let onClick: (pokemon: PokemonSpecies, event: MouseEvent) => void = () => {}
	export let disableLink: boolean = false

	const handleOnClick = (pokemon: PokemonSpecies, event: MouseEvent) => {
		if (onClick) {
			onClick(pokemon, event)
		}
	}

	let filteredSize: CreatureSize | "" = ""
	const sizeOptions = [ {
		name: `- ${m["universal.any"]()} -`,
		value: "",
	} ].concat(Object.values(CreatureSizes).map((it) => ({
		value: it,
		name: capitalize(it),
	})))

	let filteredSr: number | undefined = undefined
	let filteredSrRelative: RelativeValue = "="

	$: filter = new SpeciesFilter()
		.name($pokemonFilter)
		.size(filteredSize)
		.sr(filteredSrRelative, filteredSr)

	$: filtered = pokemons.filter(filter.apply)

	const byStringField = (field: (m: PokemonSpecies) => string) => (l: PokemonSpecies, r: PokemonSpecies) => field(l).localeCompare(field(r))
	const byNumericField = (field: (m: PokemonSpecies) => number) => (l: PokemonSpecies, r: PokemonSpecies) => field(l) - field(r)
</script>

<div class="search-field">
	<SearchField id="filter-moves" label="Search" bind:value={$pokemonFilter} matched={filtered.length} max={pokemons.length} activeFilters={filter.count()}>
		<SelectField label="{m["universal.size"]()}" bind:value={filteredSize} options={sizeOptions} />
		<RelativeNumberField label="{m["universal.sr"]()}" bind:value={filteredSr} bind:relative={filteredSrRelative} min={0} max={15} placeholder="{m["universal.number"]()}" />
	</SearchField>
</div>
<TemporaryBannerMessage condition={OfficialFakemonRemovedBanner}>
	Non-canon pokémon have been removed from this official list (Brawleon, Minereon, Droideon, Terreon, Specteon, Eeveon, Pesteon, Aereon, Drakeon, Toxeon, Rookite, Belseraph). You may <button class="link-button" on:click={readdOfficialFakemon}>re-add these to your list of Fakémon</button>, or you may add them later under <a href="{Url.settings()}">settings</a>.
</TemporaryBannerMessage>
<SortableTable let:item let:cellVisibility items={filtered} bind:currentSorter={$pokemonSorter} headers={[ {
	key: "name", name: m["universal.name"](), ratio: 3, sort: byStringField(it => it.data.name),
}, {
	key: "type", name: m["universal.type"](), ratio: 3, sort: byStringField(it => it.type.data.join(", ")),
}, {
	key: "sr", name: m["universal.sr"](), ratio: 1, sort: byNumericField(it => it.sr.data), largeScreenOnly: true,
} ]}>
	<BubbleRow.Row interactive mainBg="var(--skin-{item.type.primary}-bg)">
		<BubbleRow.Cell cellVisibility={cellVisibility[0]} primary>
			{#if disableLink}
				<button on:click={(event) => handleOnClick(item, event)} class="unliked-button">
					{item.data.name}
				</button>
			{:else}
				<a on:click={(event) => handleOnClick(item, event)} href="{Url.pokemon(item.data.id)}">
					{item.data.name}
				</a>
			{/if}
		</BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[1]}>{item.type.toString()}</BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[2]}>{item.sr.toString()}</BubbleRow.Cell>
	</BubbleRow.Row>
</SortableTable>

<style>
	.search-field {
		margin-bottom: 0.5em;
	}

	.link-button {
		all: unset;
		text-decoration: underline;
		color: var(--theme-text);
		cursor: pointer;
	} .link-button:hover, .link-button:focus {
		text-decoration: none;
	}

	.unliked-button {
		border: none;
		color: var(--skin-bg-text);
		cursor: pointer;
		margin: 0;
		padding: 0;
		width: auto;
		background: transparent;
	}

	.unliked-button::before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
</style>