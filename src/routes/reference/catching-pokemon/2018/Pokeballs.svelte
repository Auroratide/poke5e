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
			<td>+5 to Capture Rolls.</td>
		</tr>
		<tr>
			<td>Ultra Ball</td>
			<td>+10 to Capture Rolls.</td>
		</tr>
		<tr>
			<td>Hyper Ball</td>
			<td>+20 to Capture Rolls (removed in 2024 ruleset).</td>
		</tr>
		<tr>
			<td>Master Ball</td>
			<td>Automatic success on capture roll.</td>
		</tr>
		<tr>
			<td>Safari Ball</td>
			<td>Add your Nature skill modifier to the Capture Roll.</td>
		</tr>
		<tr>
			<td>Fast Ball</td>
			<td>Can throw as a reaction to a fleeing Pokémon.</td>
		</tr>
		<tr>
			<td>Level Ball</td>
			<td>+5 to Capture Rolls if active Pokémon is a higher level than target.</td>
		</tr>
		<tr>
			<td>Lure Ball</td>
			<td>+10 to Capture Rolls while fishing.</td>
		</tr>
		<tr>
			<td>Heavy Ball</td>
			<td>+15 to Capture Rolls against Pokémon of size Medium or bigger.</td>
		</tr>
		<tr>
			<td>Love Ball</td>
			<td>+15 to Capture Rolls against targets of the opposite gender from your Active Pokémon.</td>
		</tr>
		<tr>
			<td>Friend Ball</td>
			<td>Add your Persuasion skill modifier to the Capture Roll.</td>
		</tr>
		<tr>
			<td>Moon Ball</td>
			<td>+10 to Capture Rolls against Pokémon that evolve with Moon Stone.</td>
		</tr>
		<tr>
			<td>Sport Ball</td>
			<td>Add your Athletics skill modifier to the Capture Roll.</td>
		</tr>
		<tr>
			<td>Net Ball</td>
			<td>+10 to Capture Rolls against Bug or Water type Pokémon.</td>
		</tr>
		<tr>
			<td>Dive Ball</td>
			<td>+10 to Capture Rolls while fishing or underwater.</td>
		</tr>
		<tr>
			<td>Nest Ball</td>
			<td>+5 to Capture Rolls against Pokémon level 5 or below.</td>
		</tr>
		<tr>
			<td>Repeat Ball</td>
			<td>+10 to Capture Rolls against species already caught by user.</td>
		</tr>
		<tr>
			<td>Timer Ball</td>
			<td>+1 to Capture Rolls for each round of combat that has passed before throwing. (Max +10)</td>
		</tr>
		<tr>
			<td>Luxury Ball</td>
			<td>+5 to Capture Rolls. Sets Bond Level to +1 after catch.</td>
		</tr>
		<tr>
			<td>Premier Ball</td>
			<td>No effect. Rare, and often considered a token of class.</td>
		</tr>
		<tr>
			<td>Dusk Ball</td>
			<td>+10 to Capture Rolls at night or in dark places like caves.</td>
		</tr>
		<tr>
			<td>Heal Ball</td>
			<td>+5 to Capture Rolls. Restores caught Pokémon’s health and cures all status effects.</td>
		</tr>
		<tr>
			<td>Quick Ball</td>
			<td>+15 to Capture Rolls only if used in the first round of combat.</td>
		</tr>
		<tr>
			<td>Dream Ball</td>
			<td>+5 to Capture Rolls made against Pokémon affected by the Sleep condition.</td>
		</tr>
	</tbody>
</InfoTable>

<style>
	td:first-child {
		white-space: pre;
	}
</style>