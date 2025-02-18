<script lang="ts">
	import { page } from "$app/stores"
	import Page from "$lib/design/Page.svelte"
	import TmList from "$lib/moves/TmList.svelte"
	import Disc from "$lib/design/icon/Disc.svelte"
	import Loader from "$lib/design/Loader.svelte"
	import { tms } from "$lib/moves/store"

	$: ssrTms = $page.data.tmsList
	$: tmsToRender = ssrTms ?? $tms
</script>

<Page theme="purple">
	<Disc slot="icon" />
	<nav slot="side" aria-label="TM List">
		{#if tmsToRender !== undefined}
			<TmList tms={tmsToRender} />
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
