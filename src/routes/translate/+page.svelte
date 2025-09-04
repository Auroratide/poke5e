<script lang="ts">
	import StaticPage from "$lib/design/StaticPage.svelte"
</script>

<StaticPage title="Help Translate Poké 5e" containersize="full" height="full">
	<section>
		<p class="center">You can help translate this site to other languages using the chart below!</p>
		<iframe title="matrix" frameborder="0" src="https://cryptpad.fr/sheet/#/2/sheet/edit/6ZZJPR3+06iQ+kX51fjhIO0e/embed/" />
	</section>
</StaticPage>

<style>
	section {
		display: flex;
		flex-direction: column;
		block-size: calc(100% - 2.75em);
	}

	.center {
		text-wrap: balance;
		text-align: center;
	}

	iframe {
		inline-size: 100%;
		flex: 1;
	}
</style>
