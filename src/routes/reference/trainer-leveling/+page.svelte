<script>
	import FlatDl from "$lib/design/FlatDl.svelte"
	import InfoTable from "$lib/design/InfoTable.svelte"
	import { Url } from "$lib/url"
	import ReferencePage from "../ReferencePage.svelte"
</script>

<ReferencePage title="Trainer Leveling">
	<section>
		<p>Trainers can level up in different ways depending on how your group wants to run the game. Some recommended ways include:</p>
		<FlatDl>
			<dt>Total Pokémon Levels</dt>
			<dd>You level up when your Pokémon level up</dd>
			<dt>Milestones</dt>
			<dd>Level up when hitting significant story beats</dd>
			<dt>Pokédex Entries</dt>
			<dd>Level up when you register Pokémon into your Pokédex</dd>
		</FlatDl>
		<p>When a Trainer levels up, they gain benefits outlined in the table on the <a href="{Url.reference.trainerClass()}">Trainer Class</a> page. Additionally, each time a trainer levels up, they gain HP equal to a roll of their hit dice + CON, retroactive with increased CON scores.</p>
		<p>The rest of this page details the different <strong>options</strong> for leveling up a trainer.</p>
	</section>
	<section>
		<h2>By Pokémon Levels</h2>
		<p>The level of a character is determined by total levels of the character’s X highest leveled Pokémon, where X is the trainer’s current number of Pokéslots. The following table can be used as a guideline for PC leveling.</p>
		<InfoTable label="Pokémon Levels Table">
			<thead>
				<tr>
					<th>Trainer Level</th>
					<th>Total Pokémon Levels</th>
				</tr>
			</thead>
			<tbody>
				<tr><td>2nd</td><td>3</td></tr>
				<tr><td>3rd</td><td>6</td></tr>
				<tr><td>4th</td><td>9</td></tr>
				<tr><td>5th</td><td>12</td></tr>
				<tr><td>6th</td><td>20</td></tr>
				<tr><td>7th</td><td>24</td></tr>
				<tr><td>8th</td><td>28</td></tr>
				<tr><td>9th</td><td>32</td></tr>
				<tr><td>10th</td><td>36</td></tr>
				<tr><td>11th</td><td>50</td></tr>
				<tr><td>12th</td><td>55</td></tr>
				<tr><td>13th</td><td>60</td></tr>
				<tr><td>14th</td><td>65</td></tr>
				<tr><td>15th</td><td>70</td></tr>
				<tr><td>16th</td><td>90</td></tr>
				<tr><td>17th</td><td>96</td></tr>
				<tr><td>18th</td><td>102</td></tr>
				<tr><td>19th</td><td>108</td></tr>
				<tr><td>20th</td><td>114</td></tr>
			</tbody>
		</InfoTable>
		<p>The highest leveled Pokémon a trainer owns do not need to be carried by that trainer in order to level up.</p>
		<p>It is important to note that Pokémon captured at a high level are typically not as strong as those caught at a lower level and trained up to that point. Capturing higher leveled Pokémon may be beneficial for player level changes, but a trainer with 3 recently captured Charizards is weaker than a trainer who has cared for 3 Charmanders through their evolutions.</p>
		<h3>Example</h3>
		<p>Renibel is currently level 4 and owns four Pokémon at levels 4, 4, 3, and 2. She is only given three Pokéslots at this level, so her total Pokémon levels for the purpose of leveling is the sum of her three highest, 4 + 4 + 3 = <strong>11</strong>.</p>
		<p>If she were to level one of her level 4 Pokémon to level 5, then she would reach 5th level because her new total would be 5 + 4 + 3 = <strong>12</strong> (according to the table above).</p>
		<p>Because at 5th level, she receives another Pokéslot, her total for leveling changes to 5 + 4 + 3 + 2 = <strong>14</strong>.</p>
	</section>
	<section>
		<h2>By Milestone</h2>
		<p>For story-driven adventures, the DM may choose to level up the party when significant story beats have been met, such as defeating a gym leader and earning a badge.</p>
		<p>There are no hard-set rules on when these milestones should be, so it's up to the table what makes the most sense for their adventure.</p>
	</section>
	<section>
		<h2>By Pokédex Entries</h2>
		<p>The level of the trainer is based upon how many Pokémon the trainer has registered in their Pokédex. Alternatively, the DM can choose to allow trainers to register a Pokémon by reading a certain book, finding an artifact, speaking to a professor, etc. The following table can be used as a reference for levels based on number of Pokémon in a Pokédex.</p>
		<InfoTable label="Pokédex Entries Table">
			<thead>
				<tr>
					<th>Trainer Level</th>
					<th>Pokémon Registered</th>
				</tr>
			</thead>
			<tbody>
				<tr><td>2nd</td><td>8</td></tr>
				<tr><td>3rd</td><td>15</td></tr>
				<tr><td>4th</td><td>25</td></tr>
				<tr><td>5th</td><td>35</td></tr>
				<tr><td>6th</td><td>45</td></tr>
				<tr><td>7th</td><td>58</td></tr>
				<tr><td>8th</td><td>75</td></tr>
				<tr><td>9th</td><td>87</td></tr>
				<tr><td>10th</td><td>100</td></tr>
				<tr><td>11th</td><td>110</td></tr>
				<tr><td>12th</td><td>122</td></tr>
				<tr><td>13th</td><td>138</td></tr>
				<tr><td>14th</td><td>154</td></tr>
				<tr><td>15th</td><td>168</td></tr>
				<tr><td>16th</td><td>178</td></tr>
				<tr><td>17th</td><td>186</td></tr>
				<tr><td>18th</td><td>192</td></tr>
				<tr><td>19th</td><td>197</td></tr>
				<tr><td>20th</td><td>200</td></tr>
			</tbody>
		</InfoTable>
		<p>This option is particularly interesting if a campaign starts at later levels, because players can choose which Pokémon they have seen, with DM approval, leading to interesting backstories.</p>
	</section>
</ReferencePage>

<style>
	th, td {
		text-align: center;
	}
</style>
