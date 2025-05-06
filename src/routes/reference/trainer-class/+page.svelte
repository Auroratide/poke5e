<script>
	import Card from "$lib/design/Card.svelte"
	import Title from "$lib/design/Title.svelte"
	import FlatDl from "$lib/design/FlatDl.svelte"
	import { formatMoney } from "$lib/pokemon/money"
	import InfoTable from "$lib/design/InfoTable.svelte"
	import TableRow from "./TableRow.svelte"
	import Button from "$lib/design/Button.svelte"
	import { Url } from "$lib/url"
	import { PageAction } from "$lib/trainers/page-action"
</script>

<Title value="Trainer Class" />
<Card title="Trainer Class">
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
			<dd>d6 per Trainer Level</dd>
			<dt>HP at Level 1</dt>
			<dd>6 + CON modifier</dd>
			<dt>HP at higher levels</dt>
			<dd>1d6 + CON, or 4 + CON</dd>
		</FlatDl>

		<h3>Proficiencies</h3>
		<FlatDl>
			<dt>Saving Throws</dt>
			<dd>Charisma</dd>
			<dt>Skills</dt>
			<dd>Animal Handling, and choose two from Athletics, Acrobatics, Insight, Intimidation, Investigation, Medicine, Nature, Perception, Performance, Persuasion, Sleight of Hand, Stealth, or Surivival</dd>
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

		<h3>Multiclassing</h3>
		<p class="small-font">To multiclass into Trainer, you must have an ability score of at least 13 in Charisma. When you gain your first level of Trainer, you gain proficiency in Animal Handling.</p>
	</section>
	<section>
		<InfoTable label="Trainer Level Table">
			<thead>
				<tr>
					<th>Level</th>
					<th>Prof.</th>
					<th>Features</th>
					<th>Pokeslots</th>
					<th>Max SR</th>
				</tr>
			</thead>
			<tbody>
				<TableRow
					level={1}
					pokeslots={3}
					sr={2}
					features={["Starter Pokemon", "Specialization"]}
				/>
				<TableRow
					level={2}
					pokeslots={3}
					sr={2}
					features={["Trainer Path"]}
				/>
				<TableRow
					level={3}
					pokeslots={3}
					sr={5}
					features={["Control Upgrade"]}
				/>
				<TableRow
					level={4}
					pokeslots={3}
					sr={5}
					features={["Ability Score Improvement"]}
				/>
				<TableRow
					level={5}
					pokeslots={4}
					sr={5}
					features={["Trainer Path Feature", "Pokeslot"]}
				/>
				<TableRow
					level={6}
					pokeslots={4}
					sr={8}
					features={["Control Upgrade"]}
				/>
				<TableRow
					level={7}
					pokeslots={4}
					sr={8}
					features={["Specialization"]}
				/>
				<TableRow
					level={8}
					pokeslots={4}
					sr={10}
					features={["Ability Score Improvement", "Control Upgrade"]}
				/>
				<TableRow
					level={9}
					pokeslots={4}
					sr={10}
					features={["Trainer Path Feature"]}
				/>
				<TableRow
					level={10}
					pokeslots={5}
					sr={10}
					features={["Trainer's Resolve", "Pokeslot"]}
				/>
				<TableRow
					level={11}
					pokeslots={5}
					sr={12}
					features={["Control Upgrade"]}
				/>
				<TableRow
					level={12}
					pokeslots={5}
					sr={12}
					features={["Ability Score Improvement"]}
				/>
				<TableRow
					level={13}
					pokeslots={5}
					sr={12}
					features={["Pokemon Tracker"]}
				/>
				<TableRow
					level={14}
					pokeslots={5}
					sr={14}
					features={["Control Upgrade"]}
				/>
				<TableRow
					level={15}
					pokeslots={6}
					sr={14}
					features={["Trainer Path Feature", "Pokeslot"]}
				/>
				<TableRow
					level={16}
					pokeslots={6}
					sr={14}
					features={["Ability Score Improvement"]}
				/>
				<TableRow
					level={17}
					pokeslots={6}
					sr={15}
					features={["Control Upgrade"]}
				/>
				<TableRow
					level={18}
					pokeslots={6}
					sr={15}
					features={["Specialization"]}
				/>
				<TableRow
					level={19}
					pokeslots={6}
					sr={15}
					features={["Ability Score Improvement"]}
				/>
				<TableRow
					level={20}
					pokeslots={6}
					sr={15}
					features={["Master Trainer"]}
				/>
			</tbody>
		</InfoTable>
	</section>
	<section>
		<h2>Class Features</h2>
		<h3>Trainer License</h3>
		<p>Only licensed trainers are permitted to capture Pokémon, and this license identifies you as having such authorization. It also allows trainers to gain access to special services at Pokémon centers and to purchase goods at the Poké Mart.</p>
		<p>Trainers can lose their license for attacking other trainers or their Pokémon, or failing to take care of their own Pokémon.</p>

		<h3>Starter Pokemon</h3>
		<p>A trainer must begin with any single unevolved Pokemon of Species Rating (SR) 1/2 or lower with the base stats in its stat block. This Pokemon starts with a nature and non-hidden ability of the player's choice.</p>

		<h3>Pokédex</h3>
		<p>A hand-held computer with an advanced camera and image recognition software. A trainer can use a <strong>bonus action</strong> to identify a Pokemon within 60 feet using the Pokedex's scanner. Doing so registers the Pokemon on the Pokedex, and reveals the base SR and some brief facts about the species.</p>

		<h3>Pokeslots</h3>
		<p>A Trainer can carry any number of Pokémon in their pack. However, a trainer can only use a number of Pokémon each day equal to their available Pokéslots. For each Pokeslot you have, you must pick a single Pokémon to use that day. Once all of your chosen Pokémon for a day have fainted or been killed you can no longer send out any Pokémon during that day. You can change the list of prepared Pokémon when you finish a long rest. Trainers gain an additional Pokéslot at levels 5, 10, and 15.</p>

		<h3>Control Upgrade</h3>
		<p>Each species of Pokemon is given its own <dfn>Species Rating</dfn> (<abbr>SR</abbr>). The stronger the Pokemon, the more difficult they are to control. The type of Pokemon you can control in the game depends on the level of your character (as seen in the Trainer Level Table).</p>
		<p>Without the proper level, a Pokemon with a higher SR than allowed will refuse to leave their Pokeball or obey the trainer's orders. The maximum SR you can control increases at levels 3, 6, 8, 11, 14, and 17.</p>

		<h3>Trainer's Resolve</h3>
		<p>By the time you reach 10th level, you have had your fair share of experience in difficult battles and have emerged victorious and strong. You are now immune to being frightened, and may choose a second saving throw to become proficient in.</p>

		<h3>Pokemon Tracker</h3>
		<p>At level 13, you have already spent countless hours in the wild, searching for Pokémon high and low. Once per long rest you may search for Pokémon in the nearby area. You learn a list of wild Pokémon that can be found in the nearby area.</p>
		<p>Additionally, you gain Expertise in Animal Handling.</p>

		<h3>Master Trainer</h3>
		<p>You have finally achieved the title of Master Trainer. Your Pokémon are at peak fighting performance. When you or your Pokémon fail a saving throw, you may choose to succeed instead. This feature can be used twice per long rest.</p>
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
</Card>

<style>
	th:nth-child(1),
	th:nth-child(2),
	th:nth-child(4),
	th:nth-child(5) {
		text-align: center;
	}
	
	.small-font { font-size: var(--font-sz-venus); }
	.text-center { text-align: center; }
</style>
