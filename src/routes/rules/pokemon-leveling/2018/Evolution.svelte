<script lang="ts">
	import { Heading, InfoTable } from "$lib/ui/elements"
</script>

<p>A Pokémon can evolve into a new form after meeting the appropriate requirements in its stat block, and only at the time of level up. When a Pokémon evolves, the following occurs, in order:</p>
<ol>
	<li>It keeps its current ability scores, but gains a number of points to add to these scores as determined in its stat block. A Pokémon evolved in this way may not use evolution points to raise a single ability score higher than 4 points above the same score in their evolved form’s stat block, +/- applicable nature bonus, + any ASI points applied to that stat prior to evolution. (Maximum of 20 or higher score as stated in the evolved form’s stat block, before nature). With the exception of the Researcher training path feature, these points CANNOT be used for feats.</li>
	<li>It gains an HP bonus of double its level.</li>
	<li>It acquires the hit dice of its evolved form to increase HP this level and for future rolls.</li>
	<li>It acquires the base AC of its evolved form, all new proficiencies, and vulnerabilities/resistances/immunities.</li>
	<li>If it loses its current ability by evolving, it should exchange its current known ability for any one of its evolved form's non-hidden abilities.</li>
	<li> It keeps the known moves it had before evolution, but must learn all future moves from its new move list. For example, Pikachu evolving into Raichu at level 10 cannot learn any of Pikachu's level 10 moves.</li>
	<li>If evolving at a level where it would gain ASI (4, 8, 12, 16, or 20), it adds those now.</li>
</ol>
<p>Evolution can be delayed at the player’s discretion, but once the decision has been made, the Pokémon cannot evolve until gaining an additional level.</p>

<Heading level="3" id="example-evolution">Example Evolution</Heading>

<p>Here, Pikachu is being evolved at level 10 using a Thunder Stone.</p>

<Heading level="4" id="step-1">Step 1: Allocate ASI</Heading>

<p>A level 10, Brave (+2 STR, -2 WIS) Pikachu's ability scores may look something like this, assuming it was caught at level 1 and given Ability Score Increases at levels 4 and 8 (+2 DEX and +2 CON).</p>

<InfoTable label="Pikachu at level 10" center>
	<thead>
		<tr>
			<th>STR</th>
			<th>DEX</th>
			<th>CON</th>
			<th>INT</th>
			<th>WIS</th>
			<th>CHA</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>13</strong><br />(11 + 2)</td>
			<td><strong>17</strong><br />(15 + 2)</td>
			<td><strong>12</strong><br />(10 + 2)</td>
			<td><strong>6</strong></td>
			<td><strong>8</strong><br />(10 - 2)</td>
			<td><strong>12</strong></td>
		</tr>
	</tbody>
</InfoTable>

<p>A wild, Brave (+2 STR, -2 WIS) Raichu at its minimum found level in the Monster Manual has the following ability scores:</p>

<InfoTable label="Wild Brave Raichu" center>
	<thead>
		<tr>
			<th>STR</th>
			<th>DEX</th>
			<th>CON</th>
			<th>INT</th>
			<th>WIS</th>
			<th>CHA</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>14</strong><br />(12 + 2)</td>
			<td><strong>18</strong></td>
			<td><strong>15</strong></td>
			<td><strong>6</strong></td>
			<td><strong>10</strong><br />(12 - 2)</td>
			<td><strong>10</strong></td>
		</tr>
	</tbody>
</InfoTable>

<p>The rules above state that the ability scores given at evolution can be applied to any abilities just so long as the total for any one ability does not surpass 4 more points than it's evolved form at base level in the monster manual, after nature and previous ASI points. This means that when giving this particular Pikachu points for evolution, its STR score can not go above 12 + 2 + 4 = 18, its DEX can not go above 18 + 2 + 4 = 24 (although the maximum in this case is 20), its WIS can not go above 12 - 2 + 4 = 14, and so on.</p>

<Heading level="4" id="step-2">Step 2: Increase HP</Heading>

<p>The Pikachu is evolving at level 10, so add 20 to its total HP.</p>

<Heading level="4" id="step-3">Step 3: Improve Hit Dice</Heading>

<p>When leveling to 10 and evolving, Pikachu would take on Raichu's hit dice of 1d8 when rolling for additional HP at this level and beyond.</p>

<Heading level="4" id="step-4">Step 4: Improve AC</Heading>

<p>Brave Raichu has AC 15 in the monster manual, so that is its new AC.</p>

<Heading level="4" id="step-5">Step 5: Exchange Ability</Heading>

<p>Pikachu's ability is Static. Because Raichu's only ability is Static, it must keep this ability. If Raichu were to (for example only) only know "Lightning Rod", you would be forced to change its ability to "Lightning Rod".</p>

<Heading level="4" id="step-6">Step 6: New Move Pool</Heading>

<p>At level 10, Pikachu is able to learn new moves. <strong>However</strong>, because it is evolving at this level, it forfeits the new moves on its move list at level 10 and MUST only learn new moves based on the stat block of Raichu. Any moves it currently knows stick with it, but any new moves must come from Raichu's stat block. Once an old move from Pikachu's move list is forgotten, it cannot be re-learned unless it is also in Raichu's move list.</p>