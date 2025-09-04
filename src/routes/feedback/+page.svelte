<script lang="ts">
	import Button from "$lib/design/Button.svelte"
import StaticPage from "$lib/design/StaticPage.svelte"
	import Title from "$lib/design/Title.svelte"
	import { Url } from "$lib/url"
</script>

<Title value="Feedback" />
<StaticPage title="Got Feedback?" subtitle="Help make Pokémon 5e better!">
	<section>
		<p>Found a problem? Want to suggest a feature?<br />Let me know by creating an <strong>issue</strong>:</p>
		<p><Button variant="big" href="{Url.external.newIssue()}">Create Issue</Button></p>
		<p><strong>Note:</strong> I currently use <a href="https://github.com/">Github</a> to track issues. You will need a Github account to create an issue.</p>
	</section>
</StaticPage>

<style>
	section {
		text-align: center;
	}
</style>