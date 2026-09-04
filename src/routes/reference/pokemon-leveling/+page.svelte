<script>
	import { experienceAwarded2024, experienceAwareded2018 } from "$lib/poke5e/experience"
	import { FlatDl, Heading } from "$lib/ui/elements"
	import { currentEdition } from "$lib/site/edition"
	import ReferencePage from "../ReferencePage.svelte"
	import Rules2018 from "./2018"
	import Rules2024 from "./2024"
	import ExperienceTable from "./ExperienceTable.svelte"
	import ExperienceTool from "./ExperienceTool.svelte"

	$: expFormula = $currentEdition === "2018" ? experienceAwareded2018 : experienceAwarded2024
</script>

<ReferencePage title="Pokémon Leveling">
	<section>
		<p>Pokémon can level up in different ways depending on how your group wants to run the game. Some recommended ways include:</p>
		<FlatDl>
			<dt>Experience Points</dt>
			<dd>Gain experience from defeating other Pokémon</dd>
			<dt>Milestones</dt>
			<dd>Level up when hitting significant story beats</dd>
			<dt>Matching Trainer</dt>
			<dd>Level always matches the trainer's level</dd>
		</FlatDl>
		<p>When a Pokémon levels up, it gains benefits outlined in the table below. Additionally, each time a Pokémon levels up, it gains HP equal to a roll of its hit dice + CON, retroactive with increased CON scores.</p>
		{#if $currentEdition === "2018"}
			<Rules2018.LevelTable />
		{:else}
			<Rules2024.LevelTable />
		{/if}
	</section>
	<section>
		<Heading level="2" id="features">Features</Heading>
		{#if $currentEdition === "2018"}
			<Rules2018.Features />
		{:else}
			<Rules2024.Features />
		{/if}
	</section>
	<section>
		<Heading level="2" id="experience">Experience</Heading>
		<p>Experience points are rewarded to Pokémon for successfully defeating other Pokémon, or given out at the DM’s discretion when the players complete a particularly difficult challenge or trainer battle. Catching a Pokémon also gives experience, but at 1/5 the normal amount.</p>
		<p>XP can be distributed to a player’s Pokémon in any amount, but only Pokémon that took an action in the fight can be rewarded. Fainted Pokémon can also be given XP as long as they were in the fight. If two or more people battle against a single Pokémon, the XP given to each player to distribute is determined by the DM.</p>
		<p>The following is a table containing the total experience a Pokémon needs at each level to level up:</p>
		<ExperienceTable />
		<Heading level="3" id="awarding-experience">Awarding Experience</Heading>
		<p>Defeating a Pokémon confers experience according to its Level and Species Rating (<abbr>SR</abbr>). Use the tool below to determine how much experience a Pokémon should award.</p>
		<ExperienceTool formula={expFormula} />
		<br />
		{#if $currentEdition === "2018"}
			<Rules2018.ExpFormula />
		{:else}
			<Rules2024.ExpFormula />
		{/if}
	</section>
	<section>
		<Heading level="2" id="evolution">Evolution</Heading>
		<p>Pokémon can evolve into a new form once they meet the condition detailed in their stat block. When a Pokémon evolves, the following occurs:</p>
		{#if $currentEdition === "2018"}
			<Rules2018.Evolution />
		{:else}
			<Rules2024.Evolution />
		{/if}
	</section>
	<section>
		<Heading level="2" id="a-note-on-armor-class">A Note on Armor Class</Heading>
		<p>A Pokémon's AC is not necessarily tied to their Dexterity. This is intended. AC was assigned with a more formulaic approach, blending each Pokémon's DEF, SP. DEF, and SPEED stats from the core games into a single number on a scale that fits the normal D&D AC range. Think of it as if each Pokémon gets its own unique "Natural Armor". Any ties to Dexterity are purely coincidental.</p>
	</section>
</ReferencePage>
