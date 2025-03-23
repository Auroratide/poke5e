<script lang="ts">
	import Card from "$lib/design/Card.svelte"
	import Title from "$lib/design/Title.svelte"
	import { Url } from "$lib/url"
	import { abilities, pokemonWithAbilities } from "$lib/pokemon/store"
	import Filter from "./Filter.svelte"
	import Loader from "$lib/design/Loader.svelte"

	let abilityFilter = ""

	$: filteredAbilities = $abilities?.filter((it) => it.name.toLocaleLowerCase().includes(abilityFilter.toLocaleLowerCase()))
</script>

<Title value="Abilities" />
<Card title="Abilities">
	<section>
		<p>Every Pokémon has one <dfn>ability</dfn>, a special feature that applies to it at all times. Each species has multiple possible abilities; when rolling a Pokémon of a given species, one of its species' abilities is assigned to it at random.</p>
		<p>Note that some moves or abilities can manipulate what ability a Pokémon has at a given time, such as with the Mummy ability. Unless specified, a Pokémon's normal ability is always restored to it after a long rest.</p>
	</section>
	<section>
		<h2>Ability List</h2>
		<Filter bind:value={abilityFilter} matches={filteredAbilities?.length ?? 0} />
		{#if $abilities != null && $pokemonWithAbilities != null}
			{#each $abilities as ability (ability.id)}
				<div class="ability" class:hide={!filteredAbilities.includes(ability)}>
					<h3>{ability.name}</h3>
					<p>{ability.description}</p>
					<ul>
						{#each ($pokemonWithAbilities[ability.id] ?? []) as pokemon}
							<li><a href="{Url.pokemon(pokemon.id)}">{pokemon.name}</a></li>
						{/each}
					</ul>
				</div>
			{/each}
		{:else}
			<Loader caption="Loading abilities..." />
		{/if}
	</section>
</Card>

<style>
	.ability {
		margin-block: 2em;
	}

	.ability ul {
		font-size: var(--font-sz-venus);
		column-count: 3;
		line-height: 1.25;
	}

	.hide { display: none; }
</style>