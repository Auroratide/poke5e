<script lang="ts">
	import { SortableTable, BubbleRow } from "$lib/ui/page"
	import { RelativeNumberField, SearchField, SelectField, type RelativeValue } from "$lib/ui/forms"
	import { MovesFilterStore, MovesSorterStore } from "./store"
	import { Move } from "./Move"
	import { Url } from "$lib/site/url"
	import { m } from "$lib/site/i18n"
	import { capitalize, uppercase } from "$lib/utils/string"
	import { PokemonType, type PokeType } from "$lib/pokemon/types"
	import { MoveFilter } from "./MoveFilter"
	import { Attributes, type Attribute } from "$lib/dnd/attributes"
	import { MoveTime } from "./MoveTime"
	import { ContestType } from "./contest/ContestType"

	export let moves: Move[]

	const AnyOption = [ {
		name: `- ${m.any()} -`,
		value: "",
	} ]

	let filteredType: PokeType | "" = ""
	const typeOptions = AnyOption.concat(Object.values(PokemonType.list).map((it) => ({
		value: it,
		name: capitalize(it),
	})))

	let filteredPower: Attribute | "" = ""
	const powerOptions = AnyOption.concat(Object.values(Attributes.list).map((it) => ({
		value: it.abbr,
		name: uppercase(it.abbr),
	})))

	let filteredTime: string | "" = ""
	const timeOptions = AnyOption.concat(MoveTime.options().map((it) => ({
		value: it.value,
		name: it.name(),
	})))

	let filteredContest: string | "" = ""
	const contestOptions = AnyOption.concat(ContestType.list.map((it) => ({
		value: it,
		name: ContestType.name(it),
	})))

	let filteredRange: number | undefined = undefined
	let filteredRangeRelative: RelativeValue = "="

	let filteredPp: number | undefined = undefined
	let filteredPpRelative: RelativeValue = "="

	$: textFilterIsPokemonType = PokemonType.list.includes($MovesFilterStore.toLocaleLowerCase() as PokeType)

	$: filter = new MoveFilter()
		.name(textFilterIsPokemonType ? "" : $MovesFilterStore)
		.type(filteredType !== "" ? filteredType : textFilterIsPokemonType ? $MovesFilterStore : "")
		.power(filteredPower)
		.time(filteredTime)
		.contest(filteredContest)
		.rangeInFeet(filteredRangeRelative, filteredRange)
		.pp(filteredPpRelative, filteredPp)

	$: filteredMoves = moves.filter(filter.apply)

	const byStringField = (field: (m: Move) => string) => (l: Move, r: Move) => field(l).localeCompare(field(r))
	const byNumericField = (field: (m: Move) => number) => (l: Move, r: Move) => field(l) - field(r)

	const resetFilters = () => {
		filteredType = ""
		filteredPower = ""
		filteredTime = ""
		filteredContest = ""
		filteredRange = undefined
		filteredPp = undefined
	}
</script>

<div class="search-field">
	<SearchField id="filter-moves" label="Search" bind:value={$MovesFilterStore} matched={filteredMoves.length} max={moves.length} activeFilters={filter.count() - ($MovesFilterStore !== "" ? 1 : 0)} on:reset={resetFilters}>
		<SelectField label="{m.type()}" bind:value={filteredType} options={typeOptions} />
		<SelectField label="{m.movePower()}" bind:value={filteredPower} options={powerOptions} />
		<SelectField label="{m.moveTime()}" bind:value={filteredTime} options={timeOptions} />
		<SelectField label="{m.contest()}" bind:value={filteredContest} options={contestOptions} />
		<RelativeNumberField label="{m.range()}" bind:value={filteredRange} bind:relative={filteredRangeRelative} min={0} placeholder="{m.use0ForMelee()}" />
		<RelativeNumberField label="{m.pp()}" bind:value={filteredPp} bind:relative={filteredPpRelative} min={0} placeholder="{m.number()}" />
	</SearchField>
</div>
<SortableTable let:item let:cellVisibility items={filteredMoves} bind:currentSorter={$MovesSorterStore} headers={[ {
	key: "name", name: m.name(), ratio: 3, sort: byStringField(it => it.name),
}, {
	key: "type", name: m.type(), ratio: 2, sort: byStringField(it => it.type),
}, {
	key: "power", name: m.power(), ratio: 2, sort: byStringField(it => it.power.toString()), largeScreenOnly: true,
}, {
	key: "pp", name: m.pp(), ratio: 1, sort: byNumericField(it => it.pp), largeScreenOnly: true,
} ]}>
	<BubbleRow.Row interactive mainBg="var(--skin-{item.type}-bg)">
		<BubbleRow.Cell primary cellVisibility={cellVisibility[0]}><a href="{Url.moves(item.id)}">{item.name}</a></BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[1]}>{item.type}</BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[2]}>{item.power.toString()}</BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[3]}>{item.pp}</BubbleRow.Cell>
	</BubbleRow.Row>
</SortableTable>

<style>
	.search-field {
		margin-bottom: 0.5em;
	}
</style>