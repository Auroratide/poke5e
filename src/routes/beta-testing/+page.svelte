<script lang="ts">
	import { Title } from "$lib/ui/layout"
	import { FeatureToggles } from "$lib/FeatureToggles"
	import { StaticPage } from "$lib/ui/layout"
	import BetaToggle from "./BetaToggle.svelte"
	import { Url } from "$lib/url"
</script>

<Title value="Beta Testing" />
<StaticPage title="Beta Testing">
	<section>
		<p>These features are slated to be released in the future! You can help by testing them out ahead of time, turning features on/off using the toggles below.</p>
		<p>If you encounter an issue, please leave some <a href="{Url.feedback()}">feedback</a> or let us know on our <a href="{Url.external.discord()}">Discord Channel</a>. The help is appreciated!</p>
		<ul>
		{#each Object.keys(FeatureToggles) as feature}
			<li><BetaToggle {feature} /></li>
		{/each}
		</ul>
	</section>
</StaticPage>

<style>
	ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>