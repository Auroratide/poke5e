<script lang="ts">
	import { SortableTable, BubbleRow } from "$lib/ui/page"
	import { RelativeNumberField, SearchField, SelectField, type RelativeValue } from "$lib/ui/forms"
	import { TmsFilterStore, TmsSorterStore } from "../store"
	import { formatMoney } from "../../pokemon/money"
	import { Url } from "$lib/site/url"
	import type { Tm } from "./Tm"
	import { m } from "$lib/site/i18n"
	import { FeatureToggles } from "$lib/site/FeatureToggles"
	import { MoveFilter } from "../MoveFilter"
	import { PokemonType, type PokeType } from "$lib/pokemon/types"
	import { MoveTime } from "../MoveTime"
	import { ContestType } from "../contest"
	import { Attributes, type Attribute } from "$lib/dnd/attributes"
	import { capitalize, uppercase } from "$lib/utils/string"

	export let tms: Tm[]

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

	let filteredCost: number | undefined = undefined
	let filteredCostRelative: RelativeValue = "="

	$: textFilterIsPokemonType = PokemonType.list.includes($TmsFilterStore.toLocaleLowerCase() as PokeType)

	$: filter = new MoveFilter()
		.name(textFilterIsPokemonType ? "" : $TmsFilterStore)
		.type(filteredType !== "" ? filteredType : textFilterIsPokemonType ? $TmsFilterStore : "")
		.power(filteredPower)
		.time(filteredTime)
		.contest(filteredContest)
		.rangeInFeet(filteredRangeRelative, filteredRange)
		.cost(filteredCostRelative, filteredCost)

	$: filtered = tms
		.filter(filter.apply)
		.filter((tm) => tm.tm.id <= 101 || FeatureToggles.MoreTms())

	const byStringField = (field: (m: Tm) => string) => (l: Tm, r: Tm) => field(l).localeCompare(field(r))
	const byNumericField = (field: (m: Tm) => number) => (l: Tm, r: Tm) => field(l) - field(r)

	const resetFilters = () => {
		filteredType = ""
		filteredPower = ""
		filteredTime = ""
		filteredContest = ""
		filteredRange = undefined
		filteredCost = undefined
	}
</script>

<div class="search-field">
	<SearchField id="filter-moves" label="Search" bind:value={$TmsFilterStore} matched={filtered.length} max={tms.length} activeFilters={filter.count() - ($TmsFilterStore !== "" ? 1 : 0)} on:reset={resetFilters}>
		<SelectField label="{m.type()}" bind:value={filteredType} options={typeOptions} />
		<SelectField label="{m.movePower()}" bind:value={filteredPower} options={powerOptions} />
		<SelectField label="{m.moveTime()}" bind:value={filteredTime} options={timeOptions} />
		<SelectField label="{m.contest()}" bind:value={filteredContest} options={contestOptions} />
		<RelativeNumberField label="{m.range()}" bind:value={filteredRange} bind:relative={filteredRangeRelative} min={0} placeholder="{m.use0ForMelee()}" />
		<RelativeNumberField label="{m.cost()}" bind:value={filteredCost} bind:relative={filteredCostRelative} min={0} placeholder="{m.number()}" />
	</SearchField>
</div>
<SortableTable let:item let:cellVisibility items={filtered} bind:currentSorter={$TmsSorterStore} headers={[ {
	key: "name", name: m.name(), ratio: 3, sort: byStringField(it => it.name),
}, {
	key: "type", name: m.type(), ratio: 2, sort: byStringField(it => it.type),
}, {
	key: "cost", name: m.cost(), ratio: 2, sort: byNumericField(it => it.tm.cost), largeScreenOnly: true,
} ]}>
	<BubbleRow.Row interactive mainBg="var(--skin-{item.type}-bg)">
		<BubbleRow.Cell cellVisibility={cellVisibility[0]} primary><a href="{Url.tms(item.tm.id.toString())}">{item.tmName()}</a></BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[1]}>{item.type}</BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[2]}>{formatMoney(item.tm.cost)}</BubbleRow.Cell>
	</BubbleRow.Row>
</SortableTable>

<style>
	.search-field {
		margin-bottom: 0.5em;
	}
</style>