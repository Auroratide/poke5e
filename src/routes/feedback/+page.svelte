<script lang="ts">
	import StaticPage from "$lib/design/StaticPage.svelte"
	import Title from "$lib/design/Title.svelte"
</script>

<Title value="Feedback" />
<StaticPage title="Got Feedback?" subtitle="Help make Pokémon 5e better!">
	<section>
		<p>Found a problem? Want to suggest a feature?<br />Let me know by creating an <strong>issue</strong>:</p>
		<p><a class="button" href="https://github.com/Auroratide/poke5e/issues/new">Create Issue</a></p>
		<p><strong>Note:</strong> I currently use <a href="https://github.com/">Github</a> to track issues. You will need a Github account to create an issue.</p>
	</section>
</StaticPage>

<style>
	section {
		text-align: center;
	}

	.button {
		position: relative;
		display: block;
		inline-size: min(15em, 100%);
		font-size: var(--font-sz-uranus);
		padding: 1em 1.25em;
		overflow: hidden;
		background-color: var(--skin-content);
		border-radius: 2em;
		box-shadow: var(--elev-cirrus);
		margin-inline: auto;
		text-decoration: none;
		color: var(--skin-content-text);
		margin-block: 2em;
	} .button:hover, .button:focus {
		background-color: var(--skin-bg);
		color: var(--skin-bg-text);
	}
</style>