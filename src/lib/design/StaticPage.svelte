<script lang="ts">
	import Container from "./Container.svelte"
</script>

<main>
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
