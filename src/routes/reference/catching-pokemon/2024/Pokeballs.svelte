<script lang="ts">
	import InfoTable from "$lib/design/InfoTable.svelte"
</script>

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

<style>
	td:first-child {
		white-space: pre;
	}
</style>