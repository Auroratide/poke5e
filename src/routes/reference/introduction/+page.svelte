<script lang="ts">
	import ReferencePage from "../ReferencePage.svelte"
	import type { PageData } from "./$types"

	export let data: PageData
</script>

<ReferencePage title="{data.metadata.title}">
	<section>
		<svelte:component this={data.Content}/>
	</section>
</ReferencePage>
