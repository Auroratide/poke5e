<script lang="ts">
	import { Title } from "$lib/ui/layout"
	import { Card } from "$lib/ui/page"
	import { versionHistory, currentVersion, getVersionsForGroup } from "./versions"
	import { StaticPage } from "$lib/ui/layout"
</script>

<Title value="Version History" />
<div class="version-page">
	<StaticPage title="Version History" subtitle="{currentVersion}">
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
</div>

<style>
	.version-page {
		height: 100%;
		overflow: hidden;
	}

	.version-page :global(header p) {
		font-weight: bold;
	}

	.versions-section {
		display: flex;
		flex-direction: column;
		gap: 2em;
	} .versions-section :global(h2) {
		margin: 0;
	} .versions-section section:last-child {
		margin: 0;
	}
</style>