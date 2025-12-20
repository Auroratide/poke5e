<script lang="ts">
	import { InfoTable } from "$lib/ui/elements"
	import { formatMoney } from "$lib/pokemon/money"
	import { Url } from "$lib/url"
	import ReferencePage from "../ReferencePage.svelte"
	import { rulesVersion } from "$lib/site/rules-version"
	import { EggGroup } from "$lib/pokemon/egg-group"
	import SimplePokemonList from "$lib/pokemon/SimplePokemonList.svelte"
	import { Details } from "$lib/ui/elements"
	import { Loader } from "$lib/ui/elements"
	import { PokemonSpecies, SpeciesStore } from "$lib/poke5e/species"

	const pokemon = SpeciesStore.canonList()

	$: byEggGroup = EggGroup.groupBy($pokemon ?? [])
	$: groupEntries = Array.from(byEggGroup.entries()).sort((a, b) => a[0].localeCompare(b[0]))

	const alphabetical = (a: PokemonSpecies, b: PokemonSpecies) => a.name.localeCompare(b.name)
</script>

<ReferencePage title="Breeding">
	<section>
		<p>Pokémon do not simply appear out of thin air - they are born into your world as babies and grow and thrive to become powerful monsters. This guide sets the stage as a simplistic form of Pokémon breeding and egg development to add variety to every species in your game.</p>
	</section>
	<section>
		<h2>Pokémon Eggs</h2>
		<p>A Pokémon egg is an object from which most Pokémon are known to hatch. An egg's shell will usually have a pattern that reflects the appearance of the Pokémon developing inside.</p>
		<p>Eggs are fragile and should be kept safe. Eggs have an AC of 8 and 10 HP. When an egg drops to 0 HP, it breaks and the Pokémon inside is lost.</p>
	</section>
	<section>
		<h2>Creating an Egg</h2>
		<p>At the end of each in-game day, trainers may have two of their Pokémon "breed" in an attempt to create an egg. Breeding has the following requirements:</p>
		<ul>
			<li>Pokémon will only breed in they have the same trainer, or if their respective trainers are in the same party.</li>
			<li>Each Pokémon must be at <a href="{Url.reference.bonds()}">Bond Level</a> 2 or higher.</li>
			<li>One of the Pokémon is male, and the other Pokémon is female.</li>
			<li>The Pokémon share a common Egg Group, as noted on their stat blocks. One exception to this is Pokémon in the Undiscovered egg group cannot breed.</li>
			<li>The trainer has an available Pokéslot open for the egg.</li>
		</ul>
		<p>To determine whether or not a breeding attempt was successful, a player will roll a straight d20 against a DC determined by the total Bond Levels of both parent Pokémon.</p>
		<InfoTable label="Breeding DC">
			<thead>
				<tr>
					<th>Total Bond</th>
					<th>Success DC</th>
				</tr>
			</thead>
			<tbody>
				<tr><td>4</td><td>19</td></tr>
				<tr><td>5</td><td>18</td></tr>
				<tr><td>6</td><td>17</td></tr>
			</tbody>
		</InfoTable>
	</section>
	<section>
		<h2>Incubation</h2>
		<p>When an egg is created, it begins an incubation counter to determine how long it will take for the egg to hatch. Progress against this timer may only be made if the egg is being carried by its trainer through the night or a significant portion of the prior session.</p>
		<p>A trainer will roll 1d100 + 50 at the beginning of each in-campaign day (or session), and reduce the remaining counter by the result. Hatch times below are listed based on the Species Rating of Pokémon inside the egg.</p>
		<InfoTable label="Hatch Times">
			<thead>
				<tr>
					<th>SR</th>
					<th>Hatch Time</th>
					<th>SR</th>
					<th>Hatch Time</th>
				</tr>
			</thead>
			<tbody>
				<tr><td>1/8</td><td>125</td><td>7</td><td>1200</td></tr>
				<tr><td>1/4</td><td>250</td><td>8</td><td>1300</td></tr>
				<tr><td>1/2</td><td>500</td><td>9</td><td>1400</td></tr>
				<tr><td>1</td><td>600</td><td>10</td><td>1500</td></tr>
				<tr><td>2</td><td>700</td><td>11</td><td>1600</td></tr>
				<tr><td>3</td><td>800</td><td>12</td><td>1700</td></tr>
				<tr><td>4</td><td>900</td><td>13</td><td>1800</td></tr>
				<tr><td>5</td><td>1000</td><td>14</td><td>1900</td></tr>
				<tr><td>6</td><td>1100</td><td>15</td><td>2000</td></tr>
			</tbody>
		</InfoTable>
		<h3>Incubators</h3>
		<p>Incubators may be available for sale, offering an artificial, self-contained habitat especially catered to keeping your egg in pristine condition while you wait for it to hatch. Once an incubator has been used, however, it loses its effectiveness for the next egg and is no better than a backpack.</p>
		<p>Each incubator allows you to reduce the Hatch Time counter by an additional amount at the start of each day.</p>
		<InfoTable label="Incubators">
			<thead>
				<tr>
					<th>Type</th>
					<th>Effect</th>
					<th>Cost</th>
				</tr>
			</thead>
			<tbody>
				<tr><td>Basic</td><td>Reduce Hatch Time by 1d20 daily</td><td>{formatMoney(1000)}</td></tr>
				<tr><td>Plus</td><td>Reduce Hatch Time by 2d20 daily</td><td>{formatMoney(3000)}</td></tr>
				<tr><td>Super</td><td>Reduce Hatch Time by 3d20 daily</td><td>{formatMoney(10000)}</td></tr>
			</tbody>
		</InfoTable>
	</section>
	<section>
		<h2>Hatching</h2>
		<p>Once the Hatch Time for an egg reaches 0, it hatches! Use the following rules to determine what the Pokémon is and its initial kit.</p>
		<h3>Species</h3>
		<p>The resulting Pokémon's species is that of the <strong>female</strong> parent's lowest evolutionary form, and at its minimum found level listed in its stat block.</p>
		<h3>Nature</h3>
		<p>The Nature of the hatched Pokémon should be determined by a random {#if $rulesVersion === "2018"}d20{:else}d100{/if} roll against the <a href="{Url.reference.natures()}">Nature Table</a>. It is not affected by the breeding parents.</p>
		<h3>Gender</h3>
		<p>The gender of the hatched Pokémon should be determined by a d100 roll against the Gender Rate in the hatched Pokémon's stat block.</p>
		<p>For example, say you've hatched an Eevee which has a gender rate of 12.5% female and 87.5% male. A d100 roll from 1-13 will result in a female Eevee, and a roll from 14-100 will result in a male Eevee.</p>
		<h3>Moves</h3>
		<p>A bred Pokémon is unique due to the ability to inherit certain moves from its parents that it may not normally learn, or learn at a later level. At hatching, you may select any "Starting Moves" from the Pokémon's move list as its known moves at level 1.</p>
		<p>The following moves are immediately added to a hatched Pokémon's "Starting Moves" pool to be selected:</p>
		<ul>
			<li>Any <strong>Egg Move</strong> listed in the hatched Pokémon's stat block that is <em>known</em> by either parent at the time of breeding.</li>
			<li>Any move <em>known</em> by both parents at the time of breeding, so long as it is able to be learned by the hatched Pokémon in its natural progression (excluding TMs).</li>
		</ul>
		<h3>Ability</h3>
		<p>Flip a coin. On a heads, the hatched Pokémon inherits the female parent's ability. On a tails, its ability is randomly determined from the list of abilities on its stat block.</p>
		<h3>Bond Level</h3>
		<p>All hatched Pokémon begin at Bond Level 1. If it spent its entire incubation period in your party, then it starts at Bond Level 2.</p>
	</section>
	<section>
		<h2>Example</h2>
		<p>Your trainer attempts to breed their <strong>Male Alolan Raticate</strong> with their <strong>Female Luxio</strong>. You've checked that both are at least Bond Level +2 and are in the same Egg Group (Field), and have rolled high enough against the DC based on their combined Bond Levels. Success!</p>
		<ol>
			<li><strong>Species:</strong> The resulting Pokémon will be a level 1 Shinx because Shinx is the lowest evolutionary form of the female parent (Luxio), and the minimum found level of a Shinx in the wild is 1. According to the hatch time table, this egg begins with an incubation counter of 250 due to Shinx being of Species Rating 1/4.</li>
			<li><strong>Nature:</strong> Roll a d100 to determine its nature.</li>
			<li><strong>Gender:</strong> A Shinx appears in the wild at a 50% female/50% male rate, according to its stat block. Roll a d100. On a result of 50 or below, it is a female. On a result of 51 or higher, it is a male.</li>
			<li><strong>Moves:</strong> Let's assume your Alolan Raticate knows Quick Attack, Tackle, Pursuit, and Crunch; and your Luxio knows Leer, Tackle, Crunch, and Discharge. Shinx will be able to learn any of its Starting moves, in addition to <strong>Crunch</strong> since both parents know it, and <strong>Quick Attack</strong>, since its an Egg Move that Alolan Raticate knows.</li>
			<li><strong>Ability:</strong> Let's assume Luxio has the Rivalry ability. Flip a coin. On a heads, Shinxs will inherit Rivalry. On a tails, its ability is chosen randomly between Rivalry, Intimidate, and Guts.</li>
			<li><strong>Bond Level</strong>: Shinx's initial Bond Level is 1.</li>
		</ol>
	</section>
	<section>
		<h2>Special Caveats/Rules</h2>
		<p>There are just a few circumstances that should be noted here when considering breeding.</p>
		<h3>Ditto</h3>
		<p>Ditto is a very special case of genderless Pokémon. Any Pokémon can breed with it, regardless of gender or Egg Group. The species of the hatched Pokémon that results from breeding with a Ditto is always based on the "non-ditto" Pokémon, whether male or female.</p>
		<h3>Undiscovered Group</h3>
		<p>Baby and Legendary Pokémon cannot breed. These are listed in the "Undiscovered" Egg Group for convenience.</p>
		<h3>Gendered Species</h3>
		<p>Certain species of Pokémon such as Nidoran have specific genders that have their own stat blocks. Breeding with one may result in a Pokémon of a different species than itself.</p>
		<p>For example: A Nidoran Female may produce a Nidoran Female or Nidoran Male egg, which should be determined with a d100 roll against the gender rate listed in its stat block.</p>
	</section>
	<section>
		<h2>Egg Groups</h2>
		{#if ($pokemon ?? []).length === 0}
			<Loader />
		{/if}
		{#each groupEntries as [groupName, group]}
			<div class="space-after">
				<h3 class="cap">{groupName}</h3>
				{#if group.exclusive.length > 0}
					<Details title="Exclusive to group">
						<SimplePokemonList pokemon={group.exclusive.sort(alphabetical)} />	
					</Details>
				{/if}
				{#if group.shares.length > 0}
					<Details title="Shares another egg group">
						<SimplePokemonList pokemon={group.shares.sort(alphabetical)} />	
					</Details>
				{/if}
			</div>
		{/each}
	</section>
</ReferencePage>

<style>
	td {
		text-align: center;
	}

	.space-after { margin-block-end: 1.5em; }
</style>