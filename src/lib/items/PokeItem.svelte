<script lang="ts">
	import type { Item } from "./types"
	import Card from "../design/Card.svelte"
	import FlatDl from "../design/FlatDl.svelte"
	import { renderHtml } from "../rendering/render"
	import { formatMoney } from "$lib/pokemon/money"
	import { Url } from "$lib/url"
	import SideArtCardSection from "$lib/design/SideArtCardSection.svelte"
	import ItemSprite from "./ItemSprite.svelte"
	import { pokemon } from "$lib/creatures/store"
	import SimplePokemonList from "$lib/pokemon/SimplePokemonList.svelte"
	import { hasEvolutionRequirement } from "$lib/pokemon/evolution"

	export let item: Item
</script>

<Card title={item.name}>
	<SideArtCardSection hasImage={item.media.sprite != null} size="clamp(4rem, 6.33vw, 4.75rem)">
		<FlatDl>
			<dt>Type</dt>
			<dd class="cap">{item.type}</dd>
			<dt>Cost</dt>
			<dd>{item.cost != null ? formatMoney(item.cost) : "-"}</dd>
		</FlatDl>
		<ItemSprite slot="art" src="{item.media.sprite}" alt="" />
	</SideArtCardSection>
	<section class="description">
		{@html renderHtml(item.description)}
		{#if item.type === "pokeball"}
			<p>See: <a href="{Url.reference.catchingPokemon()}">Catching Pokémon</a></p>
		{/if}
		{#if item.type === "evolution"}
			<p>Pokemon that evolve using this item:</p>
			<SimplePokemonList pokemon={$pokemon?.filter(hasEvolutionRequirement({
				type: "item",
				value: item.name,
			})) ?? []} />
		{/if}
	</section>
</Card>
