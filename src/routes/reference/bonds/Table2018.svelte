<script lang="ts">
	import InfoTable from "$lib/design/InfoTable.svelte"
</script>

<InfoTable label="Bond Levels">
	<thead>
		<tr>
			<th>Level</th>
			<th>Emotion</th>
			<th>Effect</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>+3</td>
			<td>Loyal</td>
			<td>
				<p>Pokémon at this level have an incredible bond with their trainers, willing to risk their own life for their trainer's safety.</p>
				<p>Pokémon at this level gain the same saving throw bonus and chosen skill proficiency as the "Pleased" level. In addition, their maximum HP increase becomes equal to their level, and they gain "expertise" in a single existing skill proficiency of their choice. (If a Pokémon chooses "expertise" in a natural skill proficiency that it would lose due to evolving, the Pokémon maintains proficiency, but loses "expertise" in that skill.)</p>
			</td>
		</tr>
		<tr>
			<td>+2</td>
			<td>Pleased</td>
			<td>
				<p>A pleased Pokémon puts great trust in their owners, and enjoys spending quality time with them.</p>
				<p>Pokémon at this level gain the same saving throw bonus as the "Content" level. In addition, they increase their maximum HP by half their level (rounded up) and gain one skill proficiency of their choice. (In the case where a Pokémon would dip below this Loyalty and come back, the same skill must be selected. If a Pokémon would evolve and gain an identical skill naturally, it may choose a different proficiency at that time.)</p>
			</td>
		</tr>
		<tr>
			<td>+1</td>
			<td>Content</td>
			<td>
				<p>A content Pokémon shows a fondness and respect for their owners. Caught Pokémon very rarely begin at any loyalty level higher than this.</p>
				<p>Pokémon at this level gain an additional +1 to any saving throw they make.</p>
			</td>
		</tr>
		<tr>
			<td>+0</td>
			<td>Neutral</td>
			<td><p>A neutral Pokémon acts normally with no stat modifiers. It responds to its trainers commands and acts on its own accord outside of combat as an Active Pokémon. Most freshly caught Pokémon begin at this level or lower depending on the circumstances of their catch.</p></td>
		</tr>
		<tr>
			<td>-1</td>
			<td>Upset</td>
			<td>
				<p>Upset Pokémon hold a small grudge against their trainers that affects them in battle.</p>
				<p>Pokémon at this level add -1 to any saving throw they make.</p>
			</td>
		</tr>
		<tr>
			<td>-2</td>
			<td>Indifferent</td>
			<td>
				<p>Indifferent Pokémon do not care if their trainers win or lose. They will sometimes obey orders, and other times simply refuse to act.</p>
				<p>Pokémon at this level have the same saving throw penalty as the "Upset" level. In addition, before activating a move, must roll higher than a 10 on a d20 roll or the move fails.</p>
			</td>
		</tr>
		<tr>
			<td>-3</td>
			<td>Disloyal</td>
			<td>
				<p>Disloyal Pokémon hold disdain for being captured, and would rather be free. They have no need to impress or obey their trainers, and actively disobey orders.</p>
				<p>Pokémon at this level have the same saving throw penalty as the "Upset" and "Indifferent" levels. In addition, before activating a move, the trainer must roll higher than a 15 on a d20 roll or the move fails.</p>
			</td>
		</tr>
	</tbody>
</InfoTable>

<style>
	td:first-child, td:nth-child(2) {
		text-align: center;
	}
</style>