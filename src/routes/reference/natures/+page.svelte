<script>
	import Card from "$lib/design/Card.svelte"
	import Title from "$lib/design/Title.svelte"
	import InfoTable from "$lib/design/InfoTable.svelte"
	import { Url } from "$lib/url"
	import NatureRow from "./NatureRow.svelte"
	import OldNatureRow from "./OldNatureRow.svelte"
	import { Natures, NatureEffect } from "$lib/trainers/nature"
</script>

<Title value="Natures" />
<Card title="Natures">
	<section>
		<p>Each Pokémon has their own personality - their own wants, needs, likes and dislikes. Taking care of your Pokémon means building a trusting relationship with them and accepting them for who they are.</p>
		<p>As such, any Pokémon you come into contact with has its own <dfn>Nature</dfn> that may affect their ability scores and sticks with them for their entire life. The following table can be used by the DM to randomly give Pokémon a nature with a roll of a d100. When you choose your starter, you may choose any of the following with their effects.</p>
		<InfoTable label="Natures">
			<thead>
				<tr>
					<th>d100</th>
					<th>Nature</th>
					<th>Increase</th>
					<th>Decrease</th>
				</tr>
			</thead>
			<tbody>
				{#each Natures as nature, index}
					<NatureRow name="{nature}" {index} increase={NatureEffect[nature].increase} decrease={NatureEffect[nature].decrease} />
				{/each}
			</tbody>
		</InfoTable>
		<p><strong>Note</strong>: The <a href="{Url.trainers()}">Trainers Tool</a> does not, currently, apply Nature modifications. This maximizes flexibility for tables that prefer using Natures entirely for their narrative power.</p>
	</section>
	<section>
		<h2>Custom Natures</h2>
		<p>Personality is highly diverse and impossible to distill into a finite number of terms. Inventing custom natures can allow your table to more richly roleplay your trainers' Pokémon and their relationships with each other.</p>
		<p>By default, custom natures do not modify attributes. You may work with your DM on what makes sense, or roll a d100 to apply one of the effects of the natures in the above table.</p>
	</section>
	<hr />
	<section>
		<h2>Original Nature Table</h2>
		<p>The table above is updated to include all natures found in the games. The natures found in the original handbook are reprinted here if you prefer them.</p>
		<InfoTable label="Old Natures">
			<thead>
				<tr>
					<th>d20</th>
					<th>Nature</th>
					<th>Increase</th>
					<th>Decrease</th>
				</tr>
			</thead>
			<tbody>
				<OldNatureRow name="Reckless" index={0} increase="str" decrease="dex" />
				<OldNatureRow name="Rash" index={1} increase="str" decrease="con" />
				<OldNatureRow name="Brave" index={2} increase="str" decrease="wis" />
				<OldNatureRow name="Arrogant" index={3} increase="str" decrease="cha" />

				<OldNatureRow name="Skittish" index={4} increase="dex" decrease="str" />
				<OldNatureRow name="Hasty" index={5} increase="dex" decrease="con" />
				<OldNatureRow name="Energetic" index={6} increase="dex" decrease="cha" />
				<OldNatureRow name="Clumsy" index={7} increase="dex" decrease="wis" />
	
				<OldNatureRow name="Apathetic" index={8} increase="con" decrease="dex" />
				<OldNatureRow name="Stubborn" index={9} increase="con" decrease="wis" />
				<OldNatureRow name="Grumpy" index={10} increase="con" decrease="cha" />
				<OldNatureRow name="Relaxed" index={11} increase="con" decrease="str" />

				<OldNatureRow name="Careful" index={12} increase="wis" decrease="str" />
				<OldNatureRow name="Curious" index={13} increase="wis" decrease="con" />
				<OldNatureRow name="Naughty" index={14} increase="wis" decrease="cha" />

				<OldNatureRow name="Cheerful" index={15} increase="cha" decrease="dex" />
				<OldNatureRow name="Sassy" index={16} increase="cha" decrease="dex" />
				<OldNatureRow name="Innocent" index={17} increase="cha" decrease="wis" />

				<OldNatureRow name="Hardy" index={18} increase="ac" decrease="dex" />
				<OldNatureRow name="Nimble" index={19} increase="ac" decrease="str" />
			</tbody>
		</InfoTable>
	</section>
</Card>
