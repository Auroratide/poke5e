<script lang="ts">
	import ReferencePage from "../ReferencePage.svelte"
</script>

<ReferencePage title="Introduction">
	<section>
		<p>Hello!</p>
	</section>
	<section>
		<h2>2018 vs 2024 Rulesets</h2>
		<p>The version of the rules found on this website are slightly updated from the version of the rules originally published in 2018. This is so the community can adopt new Pokémon mechanics, reduce complexity, improve balance, adapt to D&D's 2024 rules, etc.</p>
		<p>That said, if you prefer the original rules, you can use the switch found in the title of each rules page. The original ruleset is called "2018" rules, and the updated rules are called "2024" rules.</p>
		<h3>Summary of updates</h3>
		<p>The 2018 and 2024 rules are almost identical, with these notes:</p>
		<ul>
			<li>Loyalty Levels renamed to Bond Levels, with simpler mechanics.</li>
			<li>Slightly modified DC calculation for making captures.</li>
			<li>Combat rules updated to allow for double battles.</li>
			<li>STAB simplified, though buffed at lower levels.</li>
			<li>Pokémon death rules added.</li>
			<li>Adapted feats to D&D 2024 rules, and added a couple new feats.</li>
			<li>Updated natures table to include all actual Pokémon natures.</li>
			<li>Simplified Pokémon experience awards.</li>
			<li>Gave Pokémon a cool level 20 capstone feature.</li>
			<li>Added Z-Moves, Dynamax, and Terastallization.</li>
			<li>Rework trainer specializations to match Pokémon's trainer class names, and make their benefits more symmetrical.</li>
			<li>Made Asleep a volatile condition, added Badly Poisoned, and reworked Confused to work more like the Confusion spell.</li>
			<li>Change trainer hit dice to d6 since they are basically full-casters.</li>
			<li>Added multiclassing potential.</li>
			<li>Simplified weather, so its effect is more subtle, and because the 2018 tables assumed only a specific kind of biome.</li>
		</ul>
		<p>Additionally, several trainer paths were tweaked:</p>
		<ul>
			<li>
				<strong>Ace Trainer</strong>
				<ul>
					<li>Battle Dice now upgrade.</li>
					<li>Max Potential → Tactical Mastery: More general to allow Ace Trainers of the INT, WIS, or CHA variety.</li>
				</ul>
			</li>
			<li>
				<strong>Hobbyist</strong>
				<ul>
					<li>Skill Dice now upgrade.</li>
					<li>Many Faces → Generalist: Taking a different path's feature didn't always naturally work since paths usually build on themselves.</li>
					<li>Skill Switch → Multitalented: Changed to emphasize the importance of bringing a well-rounded Pokémon team.</li>
				</ul>
			</li>
			<li>
				<strong>Poké Mentor</strong>
				<ul>
					<li>Pokéchef → Retention: Made Pokéchef a Nurse feature, and replaced it with something that focuses more on improving Pokémon movesets.</li>
				</ul>
			</li>
			<li>
				<strong>Researcher</strong>
				<ul>
					<li>Professor: Improves the Analyst feature to emphasize the researcher's data gathering personality rather than their battle prowess.</li>
				</ul>
			</li>
			<li>
				<strong>Pokémon Collector</strong>
				<ul>
					<li>Disciplined Strikes became a Level 9 feature, both so Expert Tracker could be the level 15 feature, and so it gets more use.</li>
					<li>Catching Expert → Expert Tracker: Automatically encountering a Pokémon of your choice use to be available to all trainers with the Tracker class feature. Now, it is the collector's specialty.</li>
				</ul>
			</li>
			<li>
				<strong>Nurse</strong>
				<ul>
					<li>Pure Heart → Pokéchef: Nurse inherited Poké Mentor's chef ability to be the exclusive path with enhanced healing.</li>
					<li>Healing Spirit → Field Medic: Gives the Nurse an additional way to keep their Pokémon healthy in combat.</li>
					<li>Joy → Tip-top Shape: Changed to emphasize the Nurse's continual care of their Pokémon.</li>
				</ul>
			</li>
			<li>
				<strong>Type Master</strong>
				<ul>
					<li>No changes.</li>
				</ul>
			</li>
			<li>
				<strong>Commander</strong>
				<ul>
					<li>Generally updated to focus on their bond with their Pokémon, and to make more use of their Pokémon's Bond Points.</li>
				</ul>
			</li>
			<li>
				<strong>Grunt</strong>
				<ul>
					<li>Renamed their features to match the name of the abilities they gain.</li>
					<li>Copy Meowth → Nefarious Stagger: More straightforward, and stunning is a bit more "evil" from a gameplay perspective.</li>
				</ul>
			</li>
			<li>
				<strong>Tactician</strong>
				<ul>
					<li>Raise your Defenses: Buffed to include saving throws, as it was otherwise equivalent to the Grunt's level 2 Sabotage ability.</li>
				</ul>
			</li>
			<li>
				<strong>Ranger</strong>
				<ul>
					<li>Overhauled both to more closely match Rangers in Pokémon lore and to account for the 2024 rules allowing control of up to two Pokémon.</li>
					<li>Deep Connection → Capture Styler: Instead of being able to cast a literal spell, focus on the unique way Rangers calm wild Pokémon.</li>
					<li>Strong Bond → Partners: Partner Pokémon are also a signature of Rangers in the lore.</li>
					<li>Best Friends → Poké Assist: Poké Assist is a signature skill of Rangers in the lore.</li>
				</ul>
			</li>
			<li>
				<strong>Guru</strong>
				<ul>
					<li>Simplified the concept of SR-enhancement by directly buffing the Guru's controllable SR.</li>
				</ul>
			</li>
			<li>
				<strong>Breeder</strong>
				<ul>
					<li>Master of Traits → Enhanced Diversity: Sidestepping the morality of designer babies and replacing it with a way to spur more creative potential.</li>
				</ul>
			</li>
		</ul>
	</section>
</ReferencePage>
