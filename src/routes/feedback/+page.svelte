<script lang="ts">
	import { Button } from "$lib/ui/elements"
	import { StaticPage } from "$lib/ui/layout"
	import { Title } from "$lib/ui/layout"
	import { Url } from "$lib/site/url"
	import { DiscordIcon, GithubIcon } from "$lib/ui/icons"
</script>

<Title value="Feedback" />
<StaticPage title="Got Feedback?" subtitle="Help make Pokémon 5e better!">
	<section>
		<p>Found a problem? Want to suggest a feature?<br />There are two ways to let us know!</p>
		<p><Button variant="big" href="{Url.external.discord()}">
			<span class="inline-icon">
				<DiscordIcon />
				Join Discord
			</span>
		</Button></p>
		<p><Button variant="big" href="{Url.external.newIssue()}">
			<span class="inline-icon">
				<GithubIcon />
				Create Issue
			</span>
		</Button></p>
		<p><strong>Note:</strong> I currently use <a href="https://github.com/">Github</a> to track issues. You will need a Github account to create an issue.</p>
	</section>
</StaticPage>

<style>
	section {
		text-align: center;
	}

	.inline-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
	}
</style>