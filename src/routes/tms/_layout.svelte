<!-- Cannot use named slots with normal layouts -->
<!-- https://github.com/sveltejs/kit/issues/627 -->

<script lang="ts">
	import Page from "$lib/design/Page.svelte"
	import TmList from "$lib/moves/TmList.svelte"
	import Disc from "$lib/design/icon/Disc.svelte"
	import Loader from "$lib/design/Loader.svelte"
	import { tms } from "$lib/moves/store"
</script>

<Page theme="purple">
	<Disc slot="icon" />
	<nav slot="side" aria-label="TM List">
		<slot name="list">
			{#if $tms !== undefined}
					<TmList tms={$tms} />
			{:else}
					<Loader />
			{/if}
		</slot>
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
