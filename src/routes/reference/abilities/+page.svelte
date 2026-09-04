<script lang="ts">
	import type { PageData } from "./$types"
	import Filter from "./Filter.svelte"
	import { Loader, Heading } from "$lib/ui/elements"
	import SimplePokemonList from "$lib/pokemon/SimplePokemonList.svelte"
	import ReferencePage from "../ReferencePage.svelte"
	import { SpeciesStore } from "$lib/poke5e/species"
	import { AbilityPool } from "$lib/pokemon/ability"
	import { includesSearch } from "$lib/utils/string"
	import { currentEdition } from "$lib/site/edition"
	import { FeatureToggles } from "$lib/site/FeatureToggles"

	const pokemon = SpeciesStore.canonList()

	let {
		data,
	}: {
		data: PageData,
	} = $props()

	const rulesVersionToUseForAbilities = $derived(FeatureToggles.PreviewUpdatedMoves() ? $currentEdition : "2018")
	const abilities = $derived(data.values[rulesVersionToUseForAbilities])
	const associatedPokemon = $derived(AbilityPool.groupSpeciesByAbility(abilities.map((it) => it.referenceId).filter((it) => it != null), $pokemon ?? []))

	let abilityFilter = $state("")
	const filteredAbilities = $derived(abilities?.filter((it) => includesSearch([it.name, ...(it.aliases ?? [])], abilityFilter)))
</script>

<ReferencePage title="Abilities">
	<section>
		<p>Every Pokémon has one <dfn>ability</dfn>, a special feature that applies to it at all times. Many species have multiple possible abilities; when rolling a Pokémon of a given species, one of its species' abilities is assigned to it at random.</p>
		<p>Note that some moves or abilities can manipulate what ability a Pokémon has at a given time, such as with the Mummy ability. Unless specified, a Pokémon's normal ability is always restored to it after a long rest.</p>
	</section>
	<section>
		<Heading level="2" id="ability-list">Ability List</Heading>
		<Filter bind:value={abilityFilter} matches={filteredAbilities?.length ?? 0} />
		{#if abilities != null && associatedPokemon != null}
			{#each abilities as ability (ability.referenceId)}
				<div class="ability" class:hide={!filteredAbilities.includes(ability)}>
					{#if ability.referenceId}
						<Heading level="3" id={ability.referenceId}>{ability.name}</Heading>
					{:else}
						<h3>{ability.name}</h3>
					{/if}
					<p>{ability.description}</p>
					<SimplePokemonList pokemon={associatedPokemon[ability.referenceId ?? ""] ?? []} />
				</div>
			{/each}
		{:else}
			<Loader caption="Loading abilities..." />
		{/if}
	</section>
</ReferencePage>

<style>
	.ability {
		margin-block: 2em;
	}

	.hide { display: none; }
</style>
