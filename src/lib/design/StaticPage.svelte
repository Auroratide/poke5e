<script lang="ts">
	import Container from "./Container.svelte"
	import { MAIN_CONTENT_ID } from "./SkipLinks.svelte"
</script>

<main id="{MAIN_CONTENT_ID}">
	<Container half>
		<slot></slot>
	</Container>
</main>

<style>
	main {
		margin: auto;
		overflow: auto;
		height: 100%;
		padding: 2em 1em;
	}
</style>
