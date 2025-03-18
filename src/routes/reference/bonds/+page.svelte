<script>
	import Card from "$lib/design/Card.svelte"
	import InfoTable from "$lib/design/InfoTable.svelte"
	import Title from "$lib/design/Title.svelte"
	import { Url } from "$lib/url"
</script>

<Title value="Bonds" />
<Card title="Bonds">
	<section>
		<p>The bond between a Pokémon and its trainer is not always stable; It can ebb and flow as the two parties interact with one another. In Pokémon 5e, the relationship between a Pokémon and its trainer moves through various <dfn>Bond Levels</dfn>. These levels each have different effects on the ability of a Pokémon, how well they listen to you, and even whether or not certain Pokémon can evolve.</p>
	</section>
	<section>
		<h2>Bond Levels</h2>
		<p>The following table describes the effects of each Bond Level:</p>
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
		<h3>Raising/Lowering Bond</h3>
		<p>Ultimately, the Bond Level of a Pokémon is determined by an agreement between you and the DM. Relationships are highly narrative, so there are no prescribed rules dictating when bond increases or decreases.</p>
		<p>Examples of raising bond may include spending time with a Pokémon, seeking out snack and foods that the Pokémon enjoys, winning a particularly difficult battle, and so on.</p>
		<p>Lowering bond may involve catching a Pokémon in an undeserving way, leaving a Pokémon in the PC for too long, allowing a Pokémon to faint from poison instead of healing it with antidote, and more.</p>
		<p>Keep in mind that every Pokémon has a personality. Discover how your Pokémon's <a href="{Url.reference.natures()}">Nature</a> interacts with your trainer's own personality!</p>
	</section>
	<section>
		<h2 id="bond-points">Bond Points</h2>
		<p>Pokémon with a good bond with their trainer may spend Bond Points equal to their Bond Level for the benefits below. Your Pokémon regains expended Bond Points at the end of a long rest.</p>
		<p><strong>Advantage:</strong> When you roll a d20 for an ability check, attack roll, or saving throw, you can spend 1 Bond Point to gain advantage on the roll.</p>
		<p><strong>Disadvantage:</strong> When a creature rolls a d20 for an attack roll against you, you can spend 1 Bond Point to impose disadvantage on the roll.</p>
	</section>
</Card>

<style>
	td:first-child {
		text-align: center;
	}
</style>