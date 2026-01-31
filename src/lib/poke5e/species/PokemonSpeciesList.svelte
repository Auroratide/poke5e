<script lang="ts">
	import { SearchField } from "$lib/ui/forms"
	import { SortableTable, BubbleRow } from "$lib/ui/page"
	import { pokemonFilter, pokemonSorter } from "$lib/site/stores"
	import { PokemonSpecies } from "./PokemonSpecies"
	import { TemporaryBannerMessage } from "$lib/ui/elements"
	import { Url } from "$lib/site/url"
	import { OfficialFakemonRemovedBanner, readdOfficialFakemon } from "$lib/fakemon/OfficialFakemonRemovedBanner"

	export let pokemons: PokemonSpecies[]
	export let onClick: (pokemon: PokemonSpecies, event: MouseEvent) => void = () => {}
	export let disableLink: boolean = false

	const handleOnClick = (pokemon: PokemonSpecies, event: MouseEvent) => {
		if (disableLink) {
			event.preventDefault()
		}
		if (onClick) {
			onClick(pokemon, event)
		}
	}

	$: filtered = pokemons.filter(PokemonSpecies.matchNameOrType($pokemonFilter))

	const byStringField = (field: (m: PokemonSpecies) => string) => (l: PokemonSpecies, r: PokemonSpecies) => field(l).localeCompare(field(r))
	const byNumericField = (field: (m: PokemonSpecies) => number) => (l: PokemonSpecies, r: PokemonSpecies) => field(l) - field(r)
</script>

<div class="search-field">
	<SearchField id="filter-moves" label="Search" bind:value={$pokemonFilter} matched={filtered.length} max={pokemons.length} />
</div>
<TemporaryBannerMessage condition={OfficialFakemonRemovedBanner}>
	Non-canon pokémon have been removed from this official list (Brawleon, Minereon, Droideon, Terreon, Specteon, Eeveon, Pesteon, Aereon, Drakeon, Toxeon, Rookite, Belseraph). You may <button class="link-button" on:click={readdOfficialFakemon}>re-add these to your list of Fakémon</button>, or you may add them later under <a href="{Url.settings()}">settings</a>.
</TemporaryBannerMessage>
<SortableTable let:item let:cellVisibility items={filtered} bind:currentSorter={$pokemonSorter} headers={[ {
	key: "name", name: "Name", ratio: 3, sort: byStringField(it => it.data.name),
}, {
	key: "type", name: "Type", ratio: 3, sort: byStringField(it => it.type.data.join(", ")),
}, {
	key: "sr", name: "SR", ratio: 1, sort: byNumericField(it => it.sr.data), largeScreenOnly: true,
} ]}>
	<BubbleRow.Row interactive mainBg="var(--skin-{item.type.primary}-bg)">
		<BubbleRow.Cell cellVisibility={cellVisibility[0]} primary>
			<a on:click={(event) => handleOnClick(item, event)} href="{Url.pokemon(item.data.id)}">
				{item.data.name}
			</a>
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
</style>