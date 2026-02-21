<script lang="ts">
	import { Card, SideArtCardSection } from "$lib/ui/page"
	import FlatDl from "../ui/elements/FlatDl.svelte"
	import { renderHtml } from "../ui/rendering/render"
	import { formatMoney } from "$lib/pokemon/money"
	import { Url } from "$lib/site/url"
	import ItemSprite from "./ItemSprite.svelte"
	import SimplePokemonList from "$lib/pokemon/SimplePokemonList.svelte"
	import { EvolutionStore } from "$lib/pokemon/evolution"
	import { SpeciesStore } from "$lib/poke5e/species"
	import type { Item } from "./Item"
	import { m } from "$lib/site/i18n"

	const species = SpeciesStore.canonList()
	const evolutions = EvolutionStore.canonList()

	export let item: Item

	$: pokemonThatEvolve = item.type ==="evolution" ? $species?.filter((it) => $evolutions?.hasCondition(it.id, {
		type: "item",
		value: item.name,
	}) ?? false) ?? [] : []
</script>

<Card title={item.name}>
	<SideArtCardSection hasImage={item.media.sprite != null} size="clamp(4rem, 6.33vw, 4.75rem)">
		<FlatDl>
			<dt>{m.type()}</dt>
			<dd class="cap">{item.type}</dd>
			<dt>{m.cost()}</dt>
			<dd>{item.cost != null ? formatMoney(item.cost) : "-"}</dd>
		</FlatDl>
		<ItemSprite slot="art" src="{item.media.sprite}" alt="" />
	</SideArtCardSection>
	<section class="description">
		{@html renderHtml(item.description)}
		{#if item.type === "pokeball"}
			<p>{m.see()}: <a href="{Url.reference.catchingPokemon()}">Catching Pokémon</a></p>
		{/if}
		{#if item.type === "evolution" && pokemonThatEvolve.length > 0}
			<p>{m.pokemonThatEvolveUsingThisItem()}:</p>
			<SimplePokemonList pokemon={pokemonThatEvolve} />
		{/if}
	</section>
</Card>
