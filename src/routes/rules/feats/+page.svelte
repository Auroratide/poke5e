<script>
	import ReferencePage from "../ReferencePage.svelte"
	import { PokemonFeats, DndFeatsForPokemon } from "$lib/poke5e/feats/PokemonFeats"
	import { Markdown } from "$lib/ui/rendering"
	import { Heading } from "$lib/ui/elements"

	const asId = (name) => name.replaceAll(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase()
</script>

<ReferencePage title="Feats">
	<section>
		<p>Trainers may take any feat found in the D&D 5e Player Handbook.</p>
	</section>
	<section>
		<Heading level="2" id="pokemon-feats">Pokémon Feats</Heading>
		<p>The following D&D feats can be selected by your Pokémon instead of taking the Ability Score Increase given during the leveling process. New feats unique to Pokémon are printed after the list of standard feats.</p>

		<ul>
			{#each $DndFeatsForPokemon as feat}
				<li>
					<span>{feat.name}</span>
					{#if feat.qualifier}<span>({feat.qualifier})</span>{/if}</li>
			{/each}
		</ul>

		{#each $PokemonFeats as feat}
			<Heading level="3" id="{asId(feat.name)}">{feat.name}</Heading>
			<Markdown value={feat.description} />
		{/each}
	</section>
</ReferencePage>
