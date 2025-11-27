<script>
	import ReferencePage from "../ReferencePage.svelte"
	import { Art } from "$lib/ui/elements"
</script>

<ReferencePage title="Shiny Pokémon">
	<section>
		<p>A <dfn>Shiny</dfn> Pokémon has a different coloration than is usual for its species. They are exceptionally rare and often prized for that reason.</p>
		<div class="side-by-side">
			<figure>
				<Art src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png" alt="Orange Charizard" />
				<figcaption>Regular</figcaption>
			</figure>
			<figure>
				<Art src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/6.png" alt="Black Charizard" shimmer />
				<figcaption>Shiny</figcaption>
			</figure>
		</div>
		<p>Shiny Pokémon offer no notable advantage over their customary counterparts, besides being extra snazzy.</p>
	</section>
	<section>
		<h2>Encountering Shinies</h2>
		<p>As a DM, when your party encounters a wild Pokémon, consider making a roll to determine whether the Pokémon is shiny! How to roll depends on how rare shinies should be in your game. Some different methods are provided here.</p>

		<h3>1 in 100 Odds</h3>
		<p>In most games, 1 in 100 odds is recommended since the rate of encountering wild Pokémon in a tabletop game is far lower than in the canon Pokémon games.</p>
		<ul>
			<li>Roll a d100. On a 100, the Pokémon is shiny.</li>
		</ul>

		<h3>1 in 1000 Odds</h3>
		<p>Good for games where there are more encounters with wild Pokémon.</p>
		<ul>
			<li>Roll three d10 dice. If every outcome is a 10, the Pokémon is shiny.</li>
		</ul>

		<h3>1 in 4096 Odds</h3>
		<p>This represents the actual odds in canon Pokémon games.</p>
		<ul>
			<li>Roll four d8 dice. If every outcome is an 8, the Pokémon is shiny.</li>
		</ul>
	</section>
</ReferencePage>

<style>
	.side-by-side {
		display: flex;
		gap: 1em;
		margin-block-end: 1em;
	}

	figure :global(figure) {
		width: 100%;
		height: auto;
		box-shadow: var(--elev-stratus);
		border: 0.125em solid var(--skin-bg);
		border-radius: 0.5em;
	}
</style>
