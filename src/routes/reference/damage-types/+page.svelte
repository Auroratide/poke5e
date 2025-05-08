<script>
	import InfoTable from "$lib/design/InfoTable.svelte"
	import TypeCalculator from "./TypeCalculator.svelte"
	import ReferencePage from "../ReferencePage.svelte"
</script>

<ReferencePage title="Damage Types">
	<section>
		<p>Pokémon 5e replaces the standard 5e damage types (bludgeoning, slashing, etc) with fire, water, grass, ice, ground, rock, electric, fighting, ghost, psychic, poison, bug, steel, dark, fairy, and normal.</p>
	</section>
	<section>
		<h2>Resistance, Vulnerability, Immunity</h2>
		<p>Unlike the games, vulnerability and resistance follow 5e rules, which means a Pokémon vulnerable to a damage type would take twice the damage. A Pokémon resistant would take half the damage. There is no "double vulnerability" or "double resistance" due to dual types.</p>
		<p>The multiplier for vulnerability and resistance is applied after all other effects of damage are calculated.</p>
		<p>If a Pokémon is "immune" to a damage type, it is immune to all damage and secondary effects of damaging moves of that type, but still may be affected by non-damaging moves of that type. For example, a normal-type Pokémon is immune to damage and flinch chance of Astonish, but can be Confused by Confuse Ray.</p>
	</section>
	<section>
		<h2>Type Calculator</h2>
		<p>This tool lets you view the resistances, vulnerabilities, and immunities of different type combinations. It lets you include more than two types, in case that's relevant for your campaign.</p>
		<TypeCalculator />
	</section>
	<section>
		<h2>Converting between D&D Damage Types</h2>
		<p>If you encounter D&D creatures on your adventures, you may use this guide to convert between Pokémon damage types and the standard 5e damage types. </p>
		<InfoTable label="Pokémon to D&D">
			<thead>
				<tr>
					<th>Pokémon Type</th>
					<th>D&D Type</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Normal</td>
					<td>Bludgeoning, Slashing, Piercing</td>
				</tr>
				<tr>
					<td>Fire</td>
					<td>Fire</td>
				</tr>
				<tr>
					<td>Water</td>
					<td>Cold</td>
				</tr>
				<tr>
					<td>Grass</td>
					<td>Poison, Acid</td>
				</tr>
				<tr>
					<td>Electric</td>
					<td>Lightning</td>
				</tr>
				<tr>
					<td>Ice</td>
					<td>Cold</td>
				</tr>
				<tr>
					<td>Fighting</td>
					<td>Bludgeoning</td>
				</tr>
				<tr>
					<td>Poison</td>
					<td>Poison</td>
				</tr>
				<tr>
					<td>Ground</td>
					<td>Thunder, Bludgeoning</td>
				</tr>
				<tr>
					<td>Flying</td>
					<td>Slashing</td>
				</tr>
				<tr>
					<td>Psychic</td>
					<td>Psychic</td>
				</tr>
				<tr>
					<td>Bug</td>
					<td>Acid, Piercing</td>
				</tr>
				<tr>
					<td>Rock</td>
					<td>Bludgeoning</td>
				</tr>
				<tr>
					<td>Ghost</td>
					<td>Necrotic</td>
				</tr>
				<tr>
					<td>Dragon</td>
					<td>Piercing, Slashing, Fire</td>
				</tr>
				<tr>
					<td>Dark</td>
					<td>Necrotic</td>
				</tr>
				<tr>
					<td>Steel</td>
					<td>Thunder</td>
				</tr>
				<tr>
					<td>Fairy</td>
					<td>Force, Radiant</td>
				</tr>
			</tbody>
		</InfoTable>
		<InfoTable label="D&D to Pokémon">
			<thead>
				<tr>
					<th>D&D Type</th>
					<th>Pokémon Type</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Bludgeoning</td>
					<td>Normal, Fighting, Ground, Rock</td>
				</tr>
				<tr>
					<td>Slashing</td>
					<td>Normal, Flying, Dragon</td>
				</tr>
				<tr>
					<td>Piercing</td>
					<td>Normal, Bug, Dragon</td>
				</tr>
				<tr>
					<td>Cold</td>
					<td>Water, Ice</td>
				</tr>
				<tr>
					<td>Poison</td>
					<td>Grass, Poison</td>
				</tr>
				<tr>
					<td>Acid</td>
					<td>Grass, Bug</td>
				</tr>
				<tr>
					<td>Psychic</td>
					<td>Psychic</td>
				</tr>
				<tr>
					<td>Fire</td>
					<td>Fire</td>
				</tr>
				<tr>
					<td>Necrotic</td>
					<td>Ghost, Dark</td>
				</tr>
				<tr>
					<td>Radiant</td>
					<td>Fairy</td>
				</tr>
				<tr>
					<td>Force</td>
					<td>Fairy</td>
				</tr>
				<tr>
					<td>Thunder</td>
					<td>Ground, Steel</td>
				</tr>
				<tr>
					<td>Lightning</td>
					<td>Electric</td>
				</tr>
			</tbody>
		</InfoTable>
		<h3>Magic Damage</h3>
		<p>D&D often makes a distinction between magical and non-magical damage. In Pokémon 5e, if a Pokémon would normally be immune to bludgeoning, slashing, or piercing damage, it instead takes normal damage if the source of that damage is considered magical.</p>
	</section>
</ReferencePage>
