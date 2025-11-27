<script>
	import ReferencePage from "../ReferencePage.svelte"
	import { PokemonFeats, DndFeatsForPokemon } from "$lib/feats/PokemonFeats"
	import { Markdown } from "$lib/ui/rendering"
</script>

<ReferencePage title="Feats">
	<section>
		<p>Trainers may take any feat found in the D&D 5e Player Handbook.</p>
	</section>
	<section>
		<h2>Pokémon Feats</h2>
		<p>The following D&D feats can be selected by your Pokémon instead of taking the Ability Score Increase given during the leveling process. New feats unique to Pokémon are printed after the list of standard feats.</p>

		<ul>
			{#each $DndFeatsForPokemon as feat}
				<li>
					<span>{feat.name}</span>
					{#if feat.qualifier}<span>({feat.qualifier})</span>{/if}</li>
			{/each}
		</ul>

		{#each $PokemonFeats as feat}
			<h3>{feat.name}</h3>
			<Markdown value={feat.description} />
		{/each}
	</section>
</ReferencePage>
