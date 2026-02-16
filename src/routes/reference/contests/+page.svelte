<script lang="ts">
	import ReferencePage from "../ReferencePage.svelte"
	import { rulesVersion } from "$lib/site/rules-version"
	import type { PageData } from "./$types"

	export let data: PageData

	$: title = data[$rulesVersion].metadata.title
	$: Content = data[$rulesVersion].Content
</script>

<ReferencePage title="{title}">
	<section>
		<svelte:component this={Content} effects={data.effects} />
	</section>
</ReferencePage>
