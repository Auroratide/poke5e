<script lang="ts">
	import ReferencePage from "../ReferencePage.svelte"
	import { currentEdition } from "$lib/site/edition"
	import type { PageData } from "./$types"

	export let data: PageData

	$: title = data[$currentEdition].metadata.title
	$: Content = data[$currentEdition].Content
</script>

<ReferencePage title="{title}">
	<section>
		<svelte:component this={Content} effects={data.effects} />
	</section>
</ReferencePage>
