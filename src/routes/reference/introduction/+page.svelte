<script lang="ts">
	import { page } from "$app/stores"
	import { onMount } from "svelte"
	import ReferencePage from "../ReferencePage.svelte"
	import type { PageData } from "./$types"

	export let data: PageData

	onMount(() => {
		// I'm not sure why, but Svelte is not properly jumping to this element
		// So I had to do it... manually?
		if ($page.url.hash) {
			window.setTimeout(() => {
				const target = document.querySelector($page.url.hash)
				target?.scrollIntoView()
			}, 10)
		}
	})
</script>

<ReferencePage title="{data.metadata.title}">
	<section>
		<svelte:component this={data.Content}/>
	</section>
</ReferencePage>
