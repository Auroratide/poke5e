<script>
	import ReferencePage from "../ReferencePage.svelte"
	import Rules2018 from "./2018"
	import Rules2024 from "./2024"
	import { rulesVersion } from "$lib/site/rules-version"
	import { Formula } from "$lib/ui/elements"
</script>

<ReferencePage title="Combat">
	<section>
		<p>Being a master of your Pokémon in battle is one of the most important parts of this game. Pokémon have their own set of moves, stats, and levels to gain.</p>
		<p>Combat rules are the same as in D&D 5e, with the following extensions:</p>
		{#if $rulesVersion === "2018"}
			<Rules2018.Rules />
		{:else}
			<Rules2024.Rules />
		{/if}
	</section>
	<section>
		<h2>Moves/Move Power</h2>
		<p>Moves in Pokémon 5e work similarly to spells in 5e D&D. Instead of a single character having a set amount of spell slots, each move has a set amount of <dfn>Power Points</dfn> (<abbr>PP</abbr>). PP determines how many times the move can be used, one use per one PP. Refilling PP can be done by long resting or using an item such as Ether.</p>
		<p>Most moves have a <dfn>Move Power</dfn> - the focused ability of that move. Move Powers can be any of the six main ability scores, and determine which ability to use for attack, damage, and saving throw DC. If a move specifies multiple move powers, you choose one of the move powers for calculations.</p>
		<Formula equals="Attack Roll Bonus" expression="Move Power Mod + Prof. Mod" />
		<Formula equals="Damage Bonus" expression="Move Power Mod + STAB" />
		<Formula equals="Saving Throw DC" expression="8 + Move Power Mod + Prof. Mod" />
		<p>Pokémon are proficient in all the moves they know.</p>
		<h3>STAB</h3>
		{#if $rulesVersion === "2018"}
			<Rules2018.Stab />
		{:else}
			<Rules2024.Stab />
		{/if}
		<h3>The Struggle Move</h3>
		<p>When a Pokémon runs out of PP on all of the moves it knows, the only action it may take is <strong><a href="/moves/struggle">Struggle</a></strong>. Struggle can be used at any time, regardless of PP remaining in other moves.</p>
		<h3>Example</h3>
		{#if $rulesVersion === "2018"}
			<Rules2018.Example />
		{:else}
			<Rules2024.Example />
		{/if}
	</section>
	<section>
		<h2>Switching Pokémon</h2>
		{#if $rulesVersion === "2018"}
			<Rules2018.Switching />
		{:else}
			<Rules2024.Switching />
		{/if}
	</section>
	<section>
		<h2>Attacks of Opportunity</h2>
		<p>If a Pokémon leaves the melee range of another creature without using the Disengage action, or when not returning to a Pokéball, the opponent may use a melee move that has a move time of 1 action immediately as a reaction targeting the fleeing Pokémon. The move costs the normal amount of PP.</p>
	</section>
	<section>
		<h2>Readying an Action</h2>
		<p>A Pokémon can choose to use the action on their turn to "ready" one of their Moves to use as a reaction that triggers after a set of circumstances determined by the player.</p>
		<p>In order to ready a Move, the Move must be selected and PP reduced. Readying a Move and waiting for the perfect moment to activate it requires concentration. If concentration breaks before the trigger, the Move cannot be used and the PP is lost.</p>
	</section>
</ReferencePage>
