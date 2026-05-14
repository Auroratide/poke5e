<script>
	import ReferencePage from "../ReferencePage.svelte"
	import { Url } from "$lib/site/url"
	import TableOfContents from "../TableOfContents.svelte"
	import { CoreRules } from "../references"
</script>

<ReferencePage title="Core Rules">
	<section>
		<p>The <strong>Core Rules</strong> detail the minimum additions to Dungeons and Dragons (D&D) in order to play Pokémon 5e. They cover things such as creating a character, catching and leveling up Pokémon, and how to conduct combat.</p>
		<p>Pokémon has many mechanics. To simplify the system, not every mechanic is represented in the Core Rules. However, the community has adapted many mechanics into D&D, listed as optional <a href="{Url.reference.supplements()}">Supplements</a>. Pokémon 5e is designed to be played with as many or as few of these supplements as you want!</p>
	</section>
	<section>
		<h2>Table of Contents</h2>
		<TableOfContents items={$CoreRules} />
	</section>
</ReferencePage>
