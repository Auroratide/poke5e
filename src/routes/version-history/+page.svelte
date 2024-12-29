<script lang="ts">
	import Title from "$lib/design/Title.svelte"
	import Card from "$lib/design/Card.svelte"
</script>

<Title value="Version History" />
<main>
	<section class="title-section">
		<h1>Version History</h1>
		<p>v1.0.0</p>
	</section>
	<section class="versions-section">
		<Card title="v1.0" level={2} inline>
			<section>
				<p>Initial version of the app. Includes reference material for pokemon, moves, and TMs, as well as the ability to manage trainers and pokemon to a basic level.</p>
				<h3>v1.0.0</h3>
				<ul>
					<li>Pokemon reference, including basic stats, movesets, and evolutionary lines.</li>
					<li>Move reference, including description and contest stats.</li>
					<li>TM reference, including list of pokemon that can learn them.</li>
					<li>Trainer app, with the ability to create a team of pokemon and manage their current stats.</li>
				</ul>
			</section>
		</Card>
	</section>
</main>

<style>
	main {
		max-inline-size: calc(0.5 * var(--container-width));
		margin: auto;
		overflow: auto;
		block-size: 100%;
		padding: 2em 1em;
	}

	.title-section {
		text-align: center;
		margin-block-end: 3em;
	}

	.title-section h1 {
		font-size: var(--font-sz-saturn);
		margin-block-end: 0.25em;
	}

	.title-section p {
		font-size: var(--font-sz-uranus);
		font-weight: bold;
		line-height: 1.5;
	}

	.versions-section {
		display: flex;
		flex-direction: column;
		gap: 2em;
	} .versions-section p {
		line-height: 1.4;
	} .versions-section h3 {
		font-size: var(--font-sz-earth);
		font-weight: bold;
		margin-block: 0.5em 0.25em;
	} .versions-section ul {
		line-height: 1.25;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		padding: 0 0 0 1em;
	}
</style>