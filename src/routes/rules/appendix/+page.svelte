<script>
	import { Url } from "$lib/site/url"
	import ReferencePage from "../ReferencePage.svelte"
	import TableOfContents from "../TableOfContents.svelte"
	import { Appendix } from "../references"
	import { Heading } from "$lib/ui/elements"
</script>

<ReferencePage title="Appendix">
	<section>
		<p>The <strong>Appendix</strong> contains reference tables and important terminology. The <a href="{Url.reference.coreRules()}">Core Rules</a>, <a href="{Url.pokemon()}">Pokémon List</a>, and <a href="{Url.moves()}">Move List</a> reference things listed here.</p>
	</section>
	<section>
		<Heading level="2" id="table-of-contents">Table of Contents</Heading>
		<TableOfContents items={$Appendix} />
	</section>
</ReferencePage>
