<script>
	import { Url } from "$lib/site/url"
	import ReferencePage from "../ReferencePage.svelte"
	import Table2018 from "./Table2018.svelte"
	import Table2024 from "./Table2024.svelte"
	import { rulesVersion } from "$lib/site/rules-version"
</script>

<ReferencePage title="Bonds">
	<section>
		{#if $rulesVersion === "2018"}
			<p><strong>Note:</strong> In the 2018 edition of the rules, this was referred to as "Loyalty".</p>
		{/if}
		<p>The bond between a Pokémon and its trainer is not always stable; It can ebb and flow as the two parties interact with one another. In Pokémon 5e, the relationship between a Pokémon and its trainer moves through various <dfn>Bond Levels</dfn>. These levels each have different effects on the ability of a Pokémon, how well they listen to you, and even whether or not certain Pokémon can evolve.</p>
	</section>
	<section>
		<h2>Bond Levels</h2>
		<p>The following table describes the effects of each Bond Level:</p>
		{#if $rulesVersion === "2018"}
			<Table2018 />
		{:else}
			<Table2024 />
		{/if}
		<h3>Raising/Lowering Bond</h3>
		<p>Ultimately, the Bond Level of a Pokémon is determined by an agreement between you and the DM. Relationships are highly narrative, so there are no prescribed rules dictating when bond increases or decreases.</p>
		<p>Examples of raising bond may include spending time with a Pokémon, seeking out snack and foods that the Pokémon enjoys, winning a particularly difficult battle, and so on.</p>
		<p>Lowering bond may involve catching a Pokémon in an undeserving way, leaving a Pokémon in the PC for too long, allowing a Pokémon to faint from poison instead of healing it with antidote, and more.</p>
		<p>Keep in mind that every Pokémon has a personality. Discover how your Pokémon's <a href="{Url.reference.natures()}">Nature</a> interacts with your trainer's own personality!</p>
	</section>
	{#if $rulesVersion !== "2018"}
		<section>
			<h2 id="bond-points">Bond Points</h2>
			<p>Pokémon with a good bond with their trainer may spend Bond Points equal to their Bond Level for the benefits below. Your Pokémon regains expended Bond Points at the end of a long rest.</p>
			<p><strong>Advantage:</strong> When you roll a d20 for an ability check, attack roll, or saving throw, you can spend 1 Bond Point to gain advantage on the roll.</p>
			<p><strong>Disadvantage:</strong> When a creature rolls a d20 for an attack roll against you, you can spend 1 Bond Point to impose disadvantage on the roll.</p>
		</section>
	{/if}
</ReferencePage>
