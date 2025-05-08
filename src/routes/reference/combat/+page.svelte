<script>
	import ReferencePage from "../ReferencePage.svelte"
</script>

<ReferencePage title="Combat">
	<section>
		<p>Being a master of your Pokémon in battle is one of the most important parts of this game. Pokémon have their own set of moves, stats, and levels to gain.</p>
		<p>Combat rules are the same as in D&D 5e, with the following extensions:</p>
		<ul>
			<li>At the start of a battle, you make one initiative roll for each of your Pokémon in battle, using your Pokémon's initiative bonus. Your trainer's turn happens concurrently with their first Pokémon in the initiative order.</li>
			<li>A trainer's turn is spent either issuing commands to their Pokémon, using items, or interacting with the environment. As an action, a trainer may issue up to two commands, and only a single command per Pokémon.</li>
			<li>A trainer may also use their bonus action to issue up to two commands for moves with a Move Time of 1 Bonus Action, one bonus move per Pokémon.</li>
			<li>If a trainer has three or more Pokémon out, they may only issue commands to two of them, and the other Pokémon may only use their turns to move.</li>
			<li>On your turn, both your trainer and your active Pokémon have movement up to their speed.</li>
			<li>Both you and your Pokémon have one reaction you can use per round of battle.</li>
		</ul>
	</section>
	<section>
		<h2>Moves/Move Power</h2>
		<p>Moves in Pokémon 5e work similarly to spells in 5e D&D. Instead of a single character having a set amount of spell slots, each move has a set amount of <dfn>Power Points</dfn> (<abbr>PP</abbr>). PP determines how many times the move can be used, one use per one PP. Refilling PP can be done by long resting or using an item such as Ether.</p>
		<p>Most moves have a <dfn>Move Power</dfn> - the focused ability of that move. Move Powers can be any of the six main ability scores, and determine which ability to use for attack, damage, and saving throw DC. If a move specifies multiple move powers, you choose one of the move powers for calculations.</p>
		<div class="center smaller">
			<p><code><strong>Attack Roll Bonus</strong> = Move Power Mod + Prof. Mod</code></p>
			<p><code><strong>Damage Bonus</strong> = Move Power Mod + STAB</code></p>
			<p><code><strong>Saving Throw DC</strong> = 8 + Move Power Mod + Prof. Mod</code></p>
		</div>
		<p>Pokémon are proficient in all the moves they know.</p>
		<h3>STAB</h3>
		<p><abbr>STAB</abbr> stands for "Same-Type Attack Bonus". When a Pokémon uses a move with the same type as one of its own types, it gets a STAB bonus added to damage rolls. Otherwise, STAB is 0.</p>
		<p>When STAB applies, it is equal to the Move Power Mod of the move. This effectively doubles the Move Power Mod of moves that are the same type as the Pokémon using it.</p>
		<h3>The Struggle Move</h3>
		<p>When a Pokémon runs out of PP on all of the moves it knows, the only action it may take is <strong><a href="/moves/struggle">Struggle</a></strong>. Struggle can be used at any time, regardless of PP remaining in other moves.</p>
		<h3>Example</h3>
		<p>You command your level 14 <a href="/pokemon/vivillon">Vivillon</a> to use the move <a href="/moves/bug-buzz">Bug Buzz</a>.</p>
		<p>Bug Buzz uses either DEX or CHA as its move power. Our Vivillon's DEX of 17 is higher than it's CHA of 10, so we will use DEX. Therefore, we calculate:</p>
		<ul class="smaller">
			<li><strong>Save DC = 16</strong>: 8 + 3 (DEX mod) + 5 (proficiency)</li>
			<li><strong>Damage</strong>: 3d10 (level) + 3 (DEX mod) + 3 (STAB)</li>
		</ul>
		<p>Vivillon's STAB is 3 since Bug Buzz is a bug-type move, and Vivillon is a bug-type Pokémon.</p>
	</section>
	<section>
		<h2>Switching Pokémon</h2>
		<p>A Trainer may take the "switch" action to recall one of their Pokémon within line of sight from up to 60 feet away and realease a new Pokémon within line of sight up to 60 feet away. Changing out a Pokémon before it has fainted takes up an entire action, but changing out a Pokémon when it faints can be done immediately and out of turn as a reaction.</p>
		<p>When a Pokémon is switched in, it has to take a moment to stablize itself after its recent reformation from pure energy. A Pokémon that has been switched cannot move nor take any actions, reactions, or bonus actions during the current turn.</p>
		<p>Switching out a Pokémon does not provoke an attack of oppurtunity on either the trainer or the Pokémon.</p>
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

<style>
	.center { text-align: center; }
	.smaller { font-size: var(--font-sz-venus); }
</style>