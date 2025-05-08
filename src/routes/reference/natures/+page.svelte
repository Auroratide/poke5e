<script>
	import { Url } from "$lib/url"
	import ReferencePage from "../ReferencePage.svelte"
	import Rules2018 from "./2018"
	import Rules2024 from "./2024"
	import { rulesVersion } from "$lib/design/rules-version"
</script>

<ReferencePage title="Natures">
	<section>
		<p>Each Pokémon has their own personality - their own wants, needs, likes and dislikes. Taking care of your Pokémon means building a trusting relationship with them and accepting them for who they are.</p>
		{#if $rulesVersion === "2018"}
			<Rules2018.NatureTable />
		{:else}
			<Rules2024.NatureTable />
		{/if}
		<p><strong>Note</strong>: The <a href="{Url.trainers()}">Trainers Tool</a> does not, currently, apply Nature modifications. This maximizes flexibility for tables that prefer using Natures entirely for their narrative power.</p>
	</section>
	<section>
		<h2>Custom Natures</h2>
		<p>Personality is highly diverse and impossible to distill into a finite number of terms. Inventing custom natures can allow your table to more richly roleplay your trainers' Pokémon and their relationships with each other.</p>
		<p>By default, custom natures do not modify attributes. You may work with your DM on what makes sense, or roll a {#if $rulesVersion === "2018"}d20{:else}d100{/if} to apply one of the effects of the natures in the above table.</p>
	</section>
</ReferencePage>
