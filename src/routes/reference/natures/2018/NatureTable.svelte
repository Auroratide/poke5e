<script lang="ts">
	import InfoTable from "$lib/design/InfoTable.svelte"
	import NatureRow from "./NatureRow.svelte"
</script>

<p>As such, any Pokémon you come into contact with has its own <dfn>Nature</dfn> that may affect their ability scores and sticks with them for their entire life. The following table can be used by the DM to randomly give Pokémon a nature with a roll of a d20. When you choose your starter, you may choose any of the following with their effects.</p>
<InfoTable label="Natures">
	<thead>
		<tr>
			<th>d20</th>
			<th>Nature</th>
			<th>Increase</th>
			<th>Decrease</th>
		</tr>
	</thead>
	<tbody>
		<NatureRow name="Reckless" index={0} increase="str" decrease="dex" />
		<NatureRow name="Rash" index={1} increase="str" decrease="con" />
		<NatureRow name="Brave" index={2} increase="str" decrease="wis" />
		<NatureRow name="Arrogant" index={3} increase="str" decrease="cha" />

		<NatureRow name="Skittish" index={4} increase="dex" decrease="str" />
		<NatureRow name="Hasty" index={5} increase="dex" decrease="con" />
		<NatureRow name="Energetic" index={6} increase="dex" decrease="cha" />
		<NatureRow name="Clumsy" index={7} increase="dex" decrease="wis" />

		<NatureRow name="Apathetic" index={8} increase="con" decrease="dex" />
		<NatureRow name="Stubborn" index={9} increase="con" decrease="wis" />
		<NatureRow name="Grumpy" index={10} increase="con" decrease="cha" />
		<NatureRow name="Relaxed" index={11} increase="con" decrease="str" />

		<NatureRow name="Careful" index={12} increase="wis" decrease="str" />
		<NatureRow name="Curious" index={13} increase="wis" decrease="con" />
		<NatureRow name="Naughty" index={14} increase="wis" decrease="cha" />

		<NatureRow name="Cheerful" index={15} increase="cha" decrease="dex" />
		<NatureRow name="Sassy" index={16} increase="cha" decrease="dex" />
		<NatureRow name="Innocent" index={17} increase="cha" decrease="wis" />

		<NatureRow name="Hardy" index={18} increase="ac" decrease="dex" />
		<NatureRow name="Nimble" index={19} increase="ac" decrease="str" />
	</tbody>
</InfoTable>
