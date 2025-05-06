<script>
	import Card from "$lib/design/Card.svelte"
	import Title from "$lib/design/Title.svelte"
	import FlatDl from "$lib/design/FlatDl.svelte"
	import InfoTable from "$lib/design/InfoTable.svelte"
	import LevelTableRow from "./LevelTableRow.svelte"
	import ExpTableRow from "./ExpTableRow.svelte"
	import ExperienceTool from "./ExperienceTool.svelte"
	import { Url } from "$lib/url"
</script>

<Title value="Pokémon Leveling" />
<Card title="Pokémon Leveling">
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
		<InfoTable label="Pokémon Level Table">
			<thead>
				<tr>
					<th>Level</th>
					<th>Prof.</th>
					<th>Features</th>
				</tr>
			</thead>
			<tbody>
				<LevelTableRow
					level={1}
					features={[]}
				/>
				<LevelTableRow
					level={2}
					features={["New Moves"]}
				/>
				<LevelTableRow
					level={3}
					features={[]}
				/>
				<LevelTableRow
					level={4}
					features={["Ability Score Improvement"]}
				/>
				<LevelTableRow
					level={5}
					features={["Damage Increase"]}
				/>
				<LevelTableRow
					level={6}
					features={["New Moves"]}
				/>
				<LevelTableRow
					level={7}
					features={[]}
				/>
				<LevelTableRow
					level={8}
					features={["Ability Score Improvement"]}
				/>
				<LevelTableRow
					level={9}
					features={[]}
				/>
				<LevelTableRow
					level={10}
					features={["New Moves", "Damage Increase"]}
				/>
				<LevelTableRow
					level={11}
					features={[]}
				/>
				<LevelTableRow
					level={12}
					features={["Ability Score Improvement"]}
				/>
				<LevelTableRow
					level={13}
					features={[]}
				/>
				<LevelTableRow
					level={14}
					features={["New Moves"]}
				/>
				<LevelTableRow
					level={15}
					features={[]}
				/>
				<LevelTableRow
					level={16}
					features={["Ability Score Improvement"]}
				/>
				<LevelTableRow
					level={17}
					features={["Damage Increase"]}
				/>
				<LevelTableRow
					level={18}
					features={["New Moves"]}
				/>
				<LevelTableRow
					level={19}
					features={[]}
				/>
				<LevelTableRow
					level={20}
					features={["Peak Power"]}
				/>
			</tbody>
		</InfoTable>
	</section>
	<section>
		<h2>Features</h2>
		<h3>New Moves</h3>
		<p>Pokémon cannot know more than 4 moves at one time. Every time your Pokémon levels up, you may replace any one move it knows with any of the moves listed on its stat block at its level or lower. At levels 2, 6, 10, 14, and 18, your Pokémon gains access to new moves.</p>
		<p>After evolving, a Pokémon retains all the moves it currently knows, even if its known moves are no longer listed on the evolved form's stat block. However, when switching a move upon level up, it may not learn a move from its previous evolutionary forms; only moves from its current form may be learned.</p>
		<h3>Ability Score Improvement</h3>
		<p>Your Pokémon gains a number of points to allocate to any of its ability scores, to a maximum of 20. The number of points to allocate depends on the number of evolutionary stages in that Pokémon's line:</p>
		<ul>
			<li><strong>1 stage:</strong> 4 points</li>
			<li><strong>2 stages:</strong> 3 points</li>
			<li><strong>3 stages:</strong> 2 points</li>
		</ul>
		<p>Up to 2 of these points may be used to acquire a <a href="{Url.reference.feats()}">Feat</a> instead.</p>
		<h3>Damage Increase</h3>
		<p>The damage of each damaging move increases at levels 5, 10, and 17, as shown in the move description.</p>
		<h3>Peak Power</h3>
		<p>At level 20 your Pokémon is at its pinnacle. One ability score of your choice for this Pokémon increases by 2, up to a maximum of 22.</p>
		<p>If the Pokémon's SR is 15 or more, then it may increase an ability score up to a maximum of 30 instead.</p>
	</section>
	<section>
		<h2>Experience</h2>
		<p>Experience points are rewarded to Pokémon for successfully defeating other Pokémon, or given out at the DM’s discretion when the players complete a particularly difficult challenge or trainer battle.</p>
		<p>The following is a table containing the total experience a Pokémon needs at each level to level up:</p>
		<InfoTable label="Experience Table">
			<thead>
				<tr>
					<th>Level</th>
					<th>Experience Needed</th>
				</tr>
			</thead>
			<tbody>
				<ExpTableRow
					level={1}
					exp={0}
				/>
				<ExpTableRow
					level={2}
					exp={300}
				/>
				<ExpTableRow
					level={3}
					exp={800}
				/>
				<ExpTableRow
					level={4}
					exp={2200}
				/>
				<ExpTableRow
					level={5}
					exp={6000}
				/>
				<ExpTableRow
					level={6}
					exp={10000}
				/>
				<ExpTableRow
					level={7}
					exp={15000}
				/>
				<ExpTableRow
					level={8}
					exp={21000}
				/>
				<ExpTableRow
					level={9}
					exp={28000}
				/>
				<ExpTableRow
					level={10}
					exp={37000}
				/>
				<ExpTableRow
					level={11}
					exp={47000}
				/>
				<ExpTableRow
					level={12}
					exp={58000}
				/>
				<ExpTableRow
					level={13}
					exp={70000}
				/>
				<ExpTableRow
					level={14}
					exp={84000}
				/>
				<ExpTableRow
					level={15}
					exp={100000}
				/>
				<ExpTableRow
					level={16}
					exp={118000}
				/>
				<ExpTableRow
					level={17}
					exp={138000}
				/>
				<ExpTableRow
					level={18}
					exp={160000}
				/>
				<ExpTableRow
					level={19}
					exp={184000}
				/>
				<ExpTableRow
					level={20}
					exp={210000}
				/>
			</tbody>
		</InfoTable>
		<h3>Awarding Experience</h3>
		<p>Defeating a Pokémon confers experience according to its Level and Species Rating (<abbr>SR</abbr>). Use the tool below to determine how much experience a Pokémon should award.</p>
		<ExperienceTool />
	</section>
	<section>
		<h2>Evolution</h2>
		<p>Pokémon can evolve into a new form once they meet the condition detailed in their stat block. When a Pokémon evolves, the following occurs:</p>
		<ul>
			<li>It keeps its current ability scores, but gains points to distribute towards any of those scores. No more than 4 of these points may be put into a single stat and no stat may be increased above 20. The number of points to distribute is provided on its stat block.</li>
			<li>It gains an HP equal to double its level.</li>
			<li>It acquires the hit dice of its evolved form for this level up and for furture rolls.</li>
			<li>It acquires the AC of its evolved form if that AC is greater than its current AC.</li>
			<li>The Pokémon might gain new proficiencies and new vulnerabilities/resistances as determined by its new form's stat block.</li>
			<li>It keeps the known moves it had at the time of evolution, but must learn all future moves from its new move list.</li>
			<li>If the Pokémon would receive other benefits at this level, it receives the benefits after it has evolved.</li>
			<li>Evolution can be delayed at the player’s discretion, but once the decision has been made, the Pokémon cannot evolve until gaining an additional level.</li>
		</ul>
	</section>
</Card>
