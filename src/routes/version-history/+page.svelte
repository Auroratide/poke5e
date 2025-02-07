<script lang="ts">
	import Title from "$lib/design/Title.svelte"
	import Card from "$lib/design/Card.svelte"
	import { versionHistory, currentVersion, getVersionsForGroup } from "./versions"
	import StaticPage from "$lib/design/StaticPage.svelte"
</script>

<Title value="Version History" />
<StaticPage>
	<section class="title-section">
		<h1>Version History</h1>
		<p>{currentVersion}</p>
	</section>
	<section class="versions-section">
		{#each versionHistory.groups as group}
			<Card title="{group.name}" level={2} inline>
				<section>
					<p>{group.description}</p>
					{#each getVersionsForGroup(group) as version}
						<h3>{version.name}</h3>
						<ul>
							{#each version.description as point}
								<li>{point}</li>
							{/each}
						</ul>
					{/each}
				</section>
			</Card>
		{/each}
	</section>
</StaticPage>

<style>
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