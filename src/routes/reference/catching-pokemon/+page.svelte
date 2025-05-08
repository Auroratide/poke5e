<script>
	import FlatDl from "$lib/design/FlatDl.svelte"
	import InfoTable from "$lib/design/InfoTable.svelte"
	import ReferencePage from "../ReferencePage.svelte"
</script>

<ReferencePage title="Catching Pokémon">
	<section>
		<p>Catching Pokémon is crucial to your success as a trainer. There are several rules to follow when catching Pokémon:</p>
		<ul>
			<li>To attempt to catch a Pokémon, use the Throw Pokéball action.</li>
			<li>A trainer can hold no more Pokémon than their Pokéslots allow. If a trainer's Pokéslots are full when a Pokémon is caught, the trainer must choose one Pokémon to send to their PC.</li>
			<li>A Pokéball is destroyed on a failed catch attempt.</li>
			<li>A caught Pokémon retains its level, all status effects, and current HP at the time of the catch.</li>
			<li>It is impossible for a Trainer to catch a Pokémon whose level is greater than their current level.</li>
			<li>A fainted Pokémon cannot be caught.</li>
		</ul>
		<p>Pokéballs are not the only way to catch Pokémon. There may be Pokémon in the wild that are friendly and happy to join you in your adventures. Feel free to try narratively interesting ways of forming a team!</p>
	</section>
	<section>
		<h2>Throw Pokéball Action</h2>
		<FlatDl>
			<dt>Time</dt>
			<dd>1 Action</dd>
			<dt>Range</dt>
			<dd>30ft/60ft</dd>
			<dt>Consumes</dt>
			<dd>1 Pokéball variant</dd>
		</FlatDl>
		<p>You hurl a Pokéball at a wild Pokémon in attempt to capture it. Make an Animal Handling skill check. You have advantage on the throw if the Pokémon is poisoned, restrained, asleep, burning, confused, paralyzed, or frozen.</p>
		<p>If you succeed the DC, the wild Pokémon is captured.</p>
		<p>The base DC is equal to:</p>
		<p style:text-align="center"><code>10 + SR<sub>rounded down</sub> + Pokémon Level</code></p>
		<p>Reduce the DC by 5 if the Pokémon is below half health (in the yellow), and reduce the DC by another 5 if the Pokémon is below 10% of its max health (in the red). Additionally, the Pokéball variant may reduce the DC even further.</p>
	</section>
	<section>
		<h2>Pokéball Types</h2>
		<InfoTable label="Pokéball Types">
			<thead>
				<tr>
					<th>Type</th>
					<th>Effect</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Pokéball</td>
					<td>No Effect.</td>
				</tr>
				<tr>
					<td>Great Ball</td>
					<td>Reduce capture DC by 5.</td>
				</tr>
				<tr>
					<td>Ultra Ball</td>
					<td>Reduce capture DC by 10.</td>
				</tr>
				<tr>
					<td>Master Ball</td>
					<td>Automatic success on capture roll.</td>
				</tr>
				<tr>
					<td>Safari Ball</td>
					<td>Reduce the capture DC by your Nature skill modifier.</td>
				</tr>
				<tr>
					<td>Fast Ball</td>
					<td>Can throw as a reaction to a fleeing Pokémon.</td>
				</tr>
				<tr>
					<td>Level Ball</td>
					<td>Reduce capture DC by 5 if your trainer level is higher than the target Pokémon's level.</td>
				</tr>
				<tr>
					<td>Lure Ball</td>
					<td>Reduce capture DC by 10 if used while fishing.</td>
				</tr>
				<tr>
					<td>Heavy Ball</td>
					<td>Reduce capture DC by 10 if the target Pokémon is size medium or larger.</td>
				</tr>
				<tr>
					<td>Love Ball</td>
					<td>Reduce the capture DC by twice your active Pokémon's Charisma modifier.</td>
				</tr>
				<tr>
					<td>Friend Ball</td>
					<td>Reduce the capture DC by your Persuasion skill modifier.</td>
				</tr>
				<tr>
					<td>Moon Ball</td>
					<td>Reduce capture DC by 10 against Pokémon that can evolve using a Moon Stone.</td>
				</tr>
				<tr>
					<td>Sport Ball</td>
					<td>Reduce the capture DC by your Athletics skill modifier.</td>
				</tr>
				<tr>
					<td>Net Ball</td>
					<td>Reduce capture DC by 10 against Water- or Bug-type Pokémon.</td>
				</tr>
				<tr>
					<td>Dive Ball</td>
					<td>Reduce capture DC by 10 while underwater.</td>
				</tr>
				<tr>
					<td>Nest Ball</td>
					<td>Reduce capture DC by 5 if target Pokémon is level 5 or lower.</td>
				</tr>
				<tr>
					<td>Repeat Ball</td>
					<td>Reduce capture DC by 10 against a species you have already caught before.</td>
				</tr>
				<tr>
					<td>Timer Ball</td>
					<td>When you use the Throw Pokéball action, you may instead hold the ball and start concentrating. At a later round, when you throw the ball, reduce the capture DC by 1 for each turn spent concentrating, to a max of 10.</td>
				</tr>
				<tr>
					<td>Luxury Ball</td>
					<td>Pokémon residing in a Luxury Ball gain +1 to their max hit dice.</td>
				</tr>
				<tr>
					<td>Premier Ball</td>
					<td>No effect. Rare, and often considered a token of class.</td>
				</tr>
				<tr>
					<td>Dusk Ball</td>
					<td>Reduce capture DC by 10 while at night or in darkness.</td>
				</tr>
				<tr>
					<td>Heal Ball</td>
					<td>When the Pokémon in the Heal Ball spends a hit die during a short rest, it may roll twice and take the higher result.</td>
				</tr>
				<tr>
					<td>Quick Ball</td>
					<td>Reduce the capture DC by 8 if used during the first round of combat.</td>
				</tr>
				<tr>
					<td>Dream Ball</td>
					<td>Reduce the capture DC by 5 if used on a Pokémon affected by the Sleep condition.</td>
				</tr>
			</tbody>
		</InfoTable>
	</section>
	<section>
		<h2>Examples</h2>
		<p>You are a level 2 trainer trying to capture a full-health Level 2 Caterpie you just found. You use a Pokéball. The DC is calculated as follows:</p>
		<div class="indent">
			<FlatDl>
				<dt>Base</dt>
				<dd>+10</dd>
				<dt>SR</dt>
				<dd>+0 (1/8 rounded down)</dd>
				<dt>Level</dt>
				<dd>+2</dd>
				<dt>Total</dt>
				<dd><strong>= 12 DC</strong></dd>
			</FlatDl>
		</div>
		<p>You are a level 10 trainer trying to capture a level 10 Butterfree. You weaken it to below half health before using a Great Ball. The DC is calculated as follows:</p>
		<div class="indent">
			<FlatDl>
				<dt>Base</dt>
				<dd>+10</dd>
				<dt>SR</dt>
				<dd>+6</dd>
				<dt>Level</dt>
				<dd>+10</dd>
				<dt>HP</dt>
				<dd>-5 (below half)</dd>
				<dt>Ball</dt>
				<dd>-5 (Great Ball)</dd>
				<dt>Total</dt>
				<dd><strong>= 16 DC</strong></dd>
			</FlatDl>
		</div>
		<p>You are a level 6 trainer trying to capture a level 5 Orthworm. You attempt to use a Safari Ball; your INT score is 16, and you are proficient in Nature. The DC is calculated as follows:</p>
		<div class="indent">
			<FlatDl>
				<dt>Base</dt>
				<dd>+10</dd>
				<dt>SR</dt>
				<dd>+9</dd>
				<dt>Level</dt>
				<dd>+5</dd>
				<dt>Ball</dt>
				<dd>-6 (3 from INT, 3 from proficiency)</dd>
				<dt>Total</dt>
				<dd><strong>= 18 DC</strong></dd>
			</FlatDl>
		</div>
	</section>
</ReferencePage>

<style>
	.indent {
		padding-inline-start: 1em;
	}

	td:first-child {
		white-space: pre;
	}
</style>