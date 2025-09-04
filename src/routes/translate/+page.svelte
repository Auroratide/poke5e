<script lang="ts">
	import Button from "$lib/design/Button.svelte"
	import StaticPage from "$lib/design/StaticPage.svelte"
	import { Url } from "$lib/url"
</script>

<StaticPage title="Help Translate Poké 5e">
	<section class="center">
		<p>You can help translate this site to other languages using button below! This will take you to a spreadsheet where you can input translations.</p>
		<p>
			<Button href="{Url.external.translations()}" variant="big">Translation Spreadsheet</Button>
		</p>
		<p>At the moment, the site does not support multiple languages. In the future, translations in the spreadsheet will be transferred to this site.</p>
		<!-- Cannot work. See: https://github.com/cryptpad/cryptpad/issues/1040 -->
		<!-- <iframe title="matrix" frameborder="0" src="???" /> -->
	</section>
</StaticPage>

<style>
	section {
		display: flex;
		flex-direction: column;
		/* block-size: calc(100% - 2.75em); */
	}

	.center {
		text-wrap: balance;
		text-align: center;
	}

	/* iframe {
		inline-size: 100%;
		flex: 1;
	} */
</style>
