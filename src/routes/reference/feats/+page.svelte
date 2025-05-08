<script>
	import ReferencePage from "../ReferencePage.svelte"
	import Rules2018 from "./2018"
	import Rules2024 from "./2024"
	import { rulesVersion } from "$lib/design/rules-version"
</script>

<ReferencePage title="Feats">
	<section>
		<p>Trainers may take any feat found in the D&D 5e Player Handbook.</p>
	</section>
	<section>
		<h2>Pokémon Feats</h2>
		<p>The following D&D feats can be selected by your Pokémon instead of taking the Ability Score Increase given during the leveling process. New feats unique to Pokémon are printed after the list of standard feats.</p>

		{#if $rulesVersion === "2018"}
			<Rules2018.StandardFeats />
		{:else}
			<Rules2024.StandardFeats />
		{/if}

		{#if $rulesVersion === "2018"}
			<Rules2018.PokemonFeats />
		{:else}
			<Rules2024.PokemonFeats />
		{/if}
	</section>
</ReferencePage>
