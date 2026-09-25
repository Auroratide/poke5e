<script>
	import { Url } from "$lib/site/url"
	import ReferencePage from "../ReferencePage.svelte"
	import TableOfContents from "../TableOfContents.svelte"
	import { Supplements } from "../references"
	import { Heading } from "$lib/ui/elements"
</script>

<ReferencePage title="Supplements">
	<section>
		<p>These <strong>Supplements</strong> contain optional adaptations, created by the community, that you can use to enhance your games. Either Pokémon mechanics (like breeding) are adapted to D&D, or D&D mechanics (like feats) are added to Pokémon 5e.</p>
		<p>Pokémon 5e can be played with as many or as few of these supplements as you want! For the minimum rules necessary to play Pokémon 5e, refer to the <a href="{Url.reference.coreRules()}">Core Rules</a>.</p>
	</section>
	<section>
		<Heading level="2" id="table-of-contents">Table of Contents</Heading>
		<TableOfContents items={$Supplements} />
	</section>
</ReferencePage>
