<script>
	import { FlatDl } from "$lib/ui/elements"
	import { formatMoney } from "$lib/pokemon/money"
	import { Button } from "$lib/ui/elements"
	import { Url } from "$lib/url"
	import { PageAction } from "$lib/trainers/page-action"
	import ReferencePage from "../ReferencePage.svelte"
	import { rulesVersion } from "$lib/site/rules-version"
	import Rules2018 from "./2018"
	import Rules2024 from "./2024"
</script>

<ReferencePage title="Trainer Class">
	<section>
		<p>You want to be the very best like no one ever was? Follow these guidelines to create your Pokémon Trainer! These rules are built to accommodate any 5e race.</p>
		<p>You can use this app's <a href="{Url.trainers()}">Trainer Tool</a> to create and manage trainers and their pokemon! Use the button below to get started:</p>
		<p class="text-center"><Button href="{Url.trainers(null, null, PageAction.newTrainer)}">Create a Trainer</Button></p>
		<p>For more on leveling up a trainer, see the <a href="{Url.reference.trainerLeveling()}">Trainer Leveling</a> page.</p>
	</section>
	<section>
		<h2>Core Traits</h2>
		<FlatDl>
			<dt>Primary Ability</dt>
			<dd>Charisma</dd>
			<dt>Hit Point Die</dt>
			<dd>{#if $rulesVersion === "2018"}d8{:else}d6{/if} per Trainer Level</dd>
			<dt>HP at Level 1</dt>
			<dd>6 + CON modifier</dd>
			<dt>HP at higher levels</dt>
			<dd>{#if $rulesVersion === "2018"}1d8{:else}1d6{/if} + CON, or {#if $rulesVersion === "2018"}5{:else}4{/if} + CON</dd>
		</FlatDl>

		<h3>Proficiencies</h3>
		<FlatDl>
			<dt>Saving Throws</dt>
			<dd>Charisma</dd>
			<dt>Skills</dt>
			<dd>Animal Handling, and choose two from Acrobatics, Athletics, Insight, Intimidation, Investigation, Medicine, Nature, Perception, Performance, Persuasion, Sleight of Hand, Stealth, or Survival</dd>
			<dt>Armor</dt>
			<dd>None</dd>
			<dt>Weapons</dt>
			<dd>None</dd>
			<dt>Tools</dt>
			<dd>Pokeballs</dd>
		</FlatDl>

		<h3>Starting Equipment</h3>
		<ul class="small-font">
			<li>5 Pokeballs</li>
			<li>1 Potion</li>
			<li>Trainer's License</li>
			<li>Pokedex</li>
			<li>A starter Pokemon</li>
			<li>{formatMoney(1000)} + {formatMoney(100)} &times; 4d4</li>
		</ul>

		{#if $rulesVersion !== "2018"}
			<h3>Multiclassing</h3>
			<p class="small-font">To multiclass into Trainer, you must have an ability score of at least 13 in Charisma. When you gain your first level of Trainer, you gain proficiency in Animal Handling.</p>
		{/if}
	</section>
	<section>
		{#if $rulesVersion === "2018"}
			<Rules2018.LevelTable />
		{:else}
			<Rules2024.LevelTable />
		{/if}
	</section>
	<section>
		<h2>Class Features</h2>
		{#if $rulesVersion === "2018"}
			<Rules2018.Features />
		{:else}
			<Rules2024.Features />
		{/if}
	</section>
	<section>
		<h2>Specializations</h2>
		<p>At levels 1, 7, and 18, players may choose a <dfn><a href="{Url.reference.specializations()}">specialization</a></dfn>, granting them bonuses depending on the type of Pokemon they train. Specializations can be stacked for an additional +1 bonus to skill checks each time it is chosen.</p>
		<p><strong><a href="{Url.reference.specializations()}">View the list of specializations.</a></strong></p>
	</section>
	<section>
		<h2>Trainer Paths</h2>
		<p>There are many ways and reasons to train Pokémon. At the 2nd level, depending on your long term goals, choose a <dfn><a href="{Url.reference.trainerPaths()}">trainer path</a></dfn> which grants you class features at levels 2, 5, 9, and 15.</p>
		<p><strong><a href="{Url.reference.trainerPaths()}">View the list of trainer paths.</a></strong></p>
	</section>
</ReferencePage>

<style>
	.small-font { font-size: var(--font-sz-venus); }
	.text-center { text-align: center; }
</style>
