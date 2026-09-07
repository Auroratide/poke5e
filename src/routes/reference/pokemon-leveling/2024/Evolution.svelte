<script lang="ts">
	import { FlatDl, Heading, InfoTable, Tag } from "$lib/ui/elements"
</script>

<p>Pokémon can evolve into a new form once they meet the condition detailed in their stat block. When a Pokémon evolves, the following occurs:</p>
<ol>
	<li>It keeps its current ability scores, but gains points to distribute towards any of those scores. No more than 4 of these points may be put into a single stat and no stat may be increased above 20. The number of points to distribute is provided on its stat block. These points cannot be used to acquire feats, unless specified otherwise.</li>
	<li>It gains an HP bonus of double its level.</li>
	<li>It acquires the hit dice of its evolved form to increase HP this level and for future rolls. Additionally, the pokémon's existing hit dice become that of the evolved form for the sake of rolling for short rests and other activites.</li>
	<li>It acquires the base AC of its evolved form, all new proficiencies, and vulnerabilities/resistances/immunities.</li>
	<li>If it loses its current ability by evolving, it should exchange its current known ability for any one of its evolved form's abilities.</li>
	<li> It keeps the known moves it had before evolution, but must learn all future moves from its new move list. For example, Pikachu evolving into Raichu at level 10 cannot learn any of Pikachu's level 10 moves.</li>
	<li>If the Pokémon would receive other benefits at this level (such as gaining <abbr title="ability score improvement">ASI</abbr>), it receives the benefits after it has evolved.</li>
</ol>
<p>Evolution can be delayed at the player’s discretion, but once the decision has been made, the Pokémon cannot evolve until gaining an additional level.</p>

<Heading level="3" id="example-evolution">Example Evolution</Heading>

<p>Here, an Eevee has just reached level 8 during the day, meaning it can evolve into an Espeon.</p>

<Heading level="4" id="step-1">Step 1: Allocate ASI</Heading>

<p>When Eevee evolves, according to the stat block, it gains <strong>14 ASI</strong> to allocate to its ability scores. Let's say that at level 7, Eevee's stats were this:</p>

<InfoTable label="Eevee at level 7" center>
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
			<td><strong>13</strong></td>
			<td><strong>14</strong></td>
			<td><strong>11</strong></td>
			<td><strong>6</strong></td>
			<td><strong>11</strong></td>
			<td><strong>12</strong></td>
		</tr>
	</tbody>
</InfoTable>

<p>When we allocate points to Eevee's ability scores, we can allocate them however we like, as long as we do not add more than 4 points to any one ability score. The following is a valid way to distribute the ASI:</p>

<InfoTable label="Espeon after Step 1" center>
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
			<td><strong>13</strong></td>
			<td><strong>18</strong><br />(+4)</td>
			<td><strong>12</strong><br />(+1)</td>
			<td><strong>8</strong><br />(+2)</td>
			<td><strong>15</strong><br />(+4)</td>
			<td><strong>15</strong><br />(+3)</td>
		</tr>
	</tbody>
</InfoTable>

<Heading level="4" id="step-2">Step 2: Increase HP</Heading>

<p>The Eevee is evolving at level 8, so add 16 to its total HP.</p>

<Heading level="4" id="step-3">Step 3: Improve Hit Dice</Heading>

<p>Eevee's hit dice size is d6, and Espeon's hit dice size is d10. All of Eevee's existing hit dice become d10s, and when it gains HP for leveling to level 8 (see Step 7), it will use the d10 to determine the amount.</p>
<p><Tag>Note</Tag> Eevee does <em>not</em> gain HP as a result of increasing the size of its previous hit dice. This is accounted for already by Step 2.</p>

<Heading level="4" id="step-4">Step 4: AC and Proficiencies</Heading>

<p>A few things happen here:</p>
<ul>
	<li>Espeon's AC is 16 in its stat block, so its AC now becomes 16.</li>
	<li>Espeon's type is Psychic, so its type becomes Psychic and it takes on all resistances and vulnerabilities of the new type.</li>
	<li>Espeon has WIS and CHA saving throw proficiencies, so it gains those now if it did not have them already.</li>
	<li>Espeon has proficiency in Insight and Persuasion, so it gains those now if it did not have them already.</li>
</ul>

<Heading level="4" id="step-5">Step 5: Exchange Ability</Heading>

<p>Eevee could have had either Run Away or Adaptability as an ability. Espeon, however, has neither. Therefore, Eevee will lose its current ability and gain the ability Synchronize as indicated on Espeon's stat block.</p>
<p>If Eevee also had the Hidden Ability Feat, then its hidden ability would change from Anticipation to Magic Bounce.</p>

<Heading level="4" id="step-6">Step 6: New Move Pool</Heading>

<p>From now on, the Eevee (now Espeon) can only learn moves from Espeon's stat block. For example, compare the moves Eevee can learn at level 6 versus the moves Espeon learns at level 6.</p>
<ul>
	<li><strong>Eevee</strong>: Bite, Swift</li>
	<li><strong>Espeon</strong>: Psybeam, Swift</li>
</ul>
<p>Starting now, Espeon will be able to change one of its moves for Psybeam, but it will not be allowed to learn Bite. Note, however, that if Eevee <em>already</em> knew Bite, it gets to keep Bite as one of its known moves up until it is forgotten for a different move.</p>

<Heading level="4" id="step-7">Step 7: Normal Level Up</Heading>

<p>Once Espeon has completed evolving, it can now gain the other benefits of reaching level 8:</p>
<ul>
	<li>HP increase, now using a d10.</li>
	<li>3 more ASI, since level 8 confers that as a benefit.</li>
</ul>

<Heading level="4" id="before-and-after">Before and After</Heading>

<p>Here is a snapshot of Eevee to Espeon, before and after reaching level 8 and evolving!</p>

<div class="example-block">
	<p><strong>Eevee at level 7:</strong></p>
	<FlatDl columns={2}>
		<dt>HP</dt>
		<dd>40</dd>
		<dt>Hit Dice</dt>
		<dd>7d6</dd>
		<dt>STR</dt>
		<dd>13</dd>
		<dt>DEX</dt>
		<dd>14</dd>
		<dt>CON</dt>
		<dd>11</dd>
		<dt>INT</dt>
		<dd>6</dd>
		<dt>WIS</dt>
		<dd>11</dd>
		<dt>CHA</dt>
		<dd>12</dd>
		<dt>AC</dt>
		<dd>13</dd>
		<dt>Ability</dt>
		<dd>Run Away</dd>
		<dt>Saves</dt>
		<dd>DEX, CHA</dd>
		<dt>Skills</dt>
		<dd>Investigation, Perception</dd>
	</FlatDl>
</div>

<div class="example-block">
	<p><strong>Espeon at level 8:</strong></p>
	<FlatDl columns={2}>
		<dt>HP</dt>
		<dd>70</dd>
		<dt>Hit Dice</dt>
		<dd>8d10</dd>
		<dt>STR</dt>
		<dd>13</dd>
		<dt>DEX</dt>
		<dd>18 (+4)</dd>
		<dt>CON</dt>
		<dd>12 (+1)</dd>
		<dt>INT</dt>
		<dd>8 (+2)</dd>
		<dt>WIS</dt>
		<dd>17 (+4, +2)</dd>
		<dt>CHA</dt>
		<dd>16 (+3, +1)</dd>
		<dt>AC</dt>
		<dd>16</dd>
		<dt>Ability</dt>
		<dd>Synchronize</dd>
		<dt>Saves</dt>
		<dd>DEX, WIS, CHA</dd>
		<dt>Skills</dt>
		<dd>Investigation, Perception, Insight, Persuasion</dd>
	</FlatDl>
</div>

<style>
	.example-block {
		background: var(--skin-bg);
		color: var(--skin-bg-text);
		margin-block-end: 1em;
		padding: 0.5em 1em;
	}

	.example-block p {
		background: var(--skin-bg-dark);
		padding: 0.5em 1em;
		margin: -0.5em -1em 1em -1em;
	}
</style>