<script lang="ts">
	import InfoTable from "$lib/design/InfoTable.svelte"
</script>

<InfoTable label="Bond Levels">
	<thead>
		<tr>
			<th>Level</th>
			<th>Effect</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>+3</td>
			<td>
				<p>This Pokémon has 3 <a href="#bond-points">Bond Points</a>.</p>
				<p>Pokémon at this level have an incredible bond with their trainers, willing to risk their own life for their trainer's safety.</p>
			</td>
		</tr>
		<tr>
			<td>+2</td>
			<td>
				<p>This Pokémon has 2 <a href="#bond-points">Bond Points</a>.</p>
				<p>This Pokémon puts great trust in their owners, and enjoys spending quality time with them.</p>
			</td>
		</tr>
		<tr>
			<td>+1</td>
			<td>
				<p>This Pokémon has 1 <a href="#bond-points">Bond Points</a>.</p>
				<p>A content Pokémon shows a fondness and respect for their owners. Caught Pokémon very rarely begin at any bond level higher than this.</p>
			</td>
		</tr>
		<tr>
			<td>+0</td>
			<td><p>A neutral Pokémon responds to its trainers commands. Most recently caught Pokémon begin at this level or lower depending on the circumstances of their catch.</p></td>
		</tr>
		<tr>
			<td>-1</td>
			<td><p>Upset Pokémon hold a small grudge against their trainers that affects them in battle.</p></td>
		</tr>
		<tr>
			<td>-2</td>
			<td>
				<p>At their discretion, the DM may have this Pokémon make an attack roll or ability check with disadvantage.</p>
				<p>Indifferent Pokémon do not care if their trainers win or lose. They will sometimes obey orders, and other times simply refuse to act.</p>
			</td>
		</tr>
		<tr>
			<td>-3</td>
			<td>
				<p>At their discretion, the DM may have this Pokémon disobey their trainer's order, either doing nothing or acting on their own.</p>
				<p>Disloyal Pokémon hold disdain for being captured, and would rather be free. They have no need to impress their trainers, and actively disobey orders.</p>
			</td>
		</tr>
	</tbody>
</InfoTable>

<style>
	td:first-child {
		text-align: center;
	}
</style>