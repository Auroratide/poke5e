<script lang="ts">
	import { onMount } from "svelte"
	import ReferencePage from "../ReferencePage.svelte"
	import type { PageData } from "./$types"
	import { page } from "$app/state"

	let {
		data,
	}: {
		data: PageData
	} = $props()

	onMount(() => {
		// I'm not sure why, but Svelte is not properly jumping to this element
		// So I had to do it... manually?
		if (page.url.hash) {
			window.setTimeout(() => {
				const target = document.querySelector(page.url.hash)
				target?.scrollIntoView()
			}, 10)
		}
	})
</script>

<ReferencePage title={data.metadata.title}>
	<section>
		<data.Content />
	</section>
</ReferencePage>
