<script lang="ts">
	import { page } from "$app/stores"
	import Page from "$lib/design/Page.svelte"
	import MoveList from "$lib/moves/MoveList.svelte"
	import Hit from "$lib/design/icon/Hit.svelte"
	import Loader from "$lib/design/Loader.svelte"
	import { moves } from "$lib/moves/store"

	$: ssrMoves = $page.data.movesList
	$: movesToRender = ssrMoves ?? $moves
</script>

<Page theme="blue">
	<Hit slot="icon" />
	<nav slot="side" class="table" aria-label="Pokemon List">
		{#if movesToRender !== undefined}
			<MoveList moves={movesToRender} />
		{:else}
			<Loader />
		{/if}
	</nav>
	<slot></slot>
</Page>

<style>
	nav {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
