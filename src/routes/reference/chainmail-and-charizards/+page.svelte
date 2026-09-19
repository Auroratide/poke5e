<script lang="ts">
	import ReferencePage from "../ReferencePage.svelte"
	import type { PageData } from "./$types"

	let {
		data,
	}: {
		data: PageData
	} = $props()
</script>

<ReferencePage title={data.metadata.title}>
	<section>
		<data.Content />
	</section>
</ReferencePage>
