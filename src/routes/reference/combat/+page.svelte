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
		<h2>Flying, Hovering, and Burrowing</h2>
		<p>Flying and Hovering Pokémon have nearly unlimited height potential with their speeds. As such, they have a decent-sized advantage on the battlefield, able to often take away melee attacks in one on one situations with the right strategy. Here are some Pokémon 5e-specific rules when facing or using Pokémon with a fly speed.</p>
		<ul>
			<li>Maintaining flight while accurately attacking at range requires a good deal of focus and energy for a creature. Any ranged attacks used by Pokémon in mid flight have <strong>disadvantage if the target is beyond half the move’s maximum range</strong>. If the move requires a saving throw, those Pokémon beyond half the maximum range have advantage on the roll. A Pokémon with “hover” is only considered in “mid-flight” if it is more than 10 feet off the ground.</li>
			<li>If a flying or hovering Pokémon's flying or hover speed is reduced to zero (by becoming restrained, incapacitated by a status, hit with a move that forces the Pokémon to fall prone, etc.), the Pokémon will fall to the ground. Those with a flying speed will take 1d6 typeless damage for every 10 feet they fall, up to a maximum of 20d6. Those with a hover speed will fall, but slow enough that they do not take fall damage.</li>
		</ul>
		<p>Some Pokémon are natural-born diggers, able to churn through sand, mud, dirt, snow, and ice more easily than other creatures.</p>
		<ul>
			<li>A Pokémon can use its full burrow speed to move parallel to the ground, just below the surface, in dirt, mud, sand, snow, or ice. A creature that moves in this way is still able to be targeted by attacks and attacks of opportunity as if it would be above ground. If the Pokémon attempts to descend further, it is treated as difficult terrain. A burrowing creature leaves a tunnel in its path which is considered difficult terrain for any creature without a burrowing speed.</li>
		</ul>
	</section>
	<section>
		<h2>Raised/Grounded</h2>
		<p>Certain moves affect "Raised" and "Grounded" creatures differently.</p>
		<ul>
			<li>A "<dfn>Raised</dfn>" creature is any creature currently utilizing its flying or hover speed, or those with the "Levitate" ability, holding an "Air Balloon", or under the effect of the "Magnet Rise" or "Telekinesis" moves.</li>
			<li>A "<dfn>Grounded</dfn>" creature is any creature without or not currently utilizing a flying or hover speed, or one that is knocked prone or has its flying or hover speed reduced to zero.</li>
		</ul>
	</section>
	<section>
		<h2>Reach</h2>
		<p>The "Reach" of a Pokémon is the maximum distance the Pokémon can attack a target in melee range. If a creature leaves the reach of a Pokémon, an attack of opportunity is triggered. In Pokémon 5e, creatures that are "Large" or smaller have a standard 5 feet of reach, while those bigger than "Large" have 10 feet of reach.</p>
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
