<script>
	import ReferencePage from "../ReferencePage.svelte"
	import Rules2018 from "./2018"
	import Rules2024 from "./2024"
	import { currentEdition } from "$lib/site/edition"
	import { Heading } from "$lib/ui/elements"
</script>

<ReferencePage title="Fainting, Resting, and Healing">
	<section>
		<p>The rules for HP, healing, and resting for Pokémon are the same as in D&D 5e, with some extensions.</p>
	</section>
	<section>
		<Heading level="2" id="reaching-0-hp">Reaching 0 HP</Heading>
		{#if $currentEdition === "2018"}
			<Rules2018.Death />
		{:else}
			<Rules2024.Death />
		{/if}
	</section>
	<section>
		<Heading level="2" id="healing">Healing</Heading>
		<p>There are three main ways to heal your Pokémon.</p>
		<ul>
			<li>Bring them to a Pokécenter.</li>
			<li>Take a long or short rest.</li>
			<li>Give them potions or food.</li>
		</ul>
		<Heading level="3" id="pokecenters">Pokécenters</Heading>
		{#if $currentEdition === "2018"}
			<Rules2018.Pokecenters />
		{:else}
			<Rules2024.Pokecenters />
		{/if}
		<Heading level="3" id="resting">Resting</Heading>
		<p>Long rests take at least eight hours and refresh all Pokémon health, statuses, and PP.</p>
		<p>Short rests can be as little as a half an hour and recover hit points based on normal 5e rules. PP is not recovered on short rests, and short rests do not revive fainted Pokémon.</p>
		<Heading level="3" id="potions-and-food">Potions and Food</Heading>
		<p>Certain items and food can be given to Pokémon as an action, or in some cases consumed as a reaction, to restore HP, PP, or status. Most of these items cannot be given to Pokémon within Pokéballs.</p>
	</section>
</ReferencePage>
