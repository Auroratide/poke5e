<script>
	import Card from "$lib/design/Card.svelte"
	import Title from "$lib/design/Title.svelte"
	import { TrainerPaths } from "$lib/trainers/paths"
	import { renderHtml } from "$lib/rendering/render"

	const paths = TrainerPaths["2024"]
</script>

<Title value="Trainer Paths" />
<Card title="Trainer Paths">
	<section>
		<p>There are many ways and reasons to train Pokémon. At the 2nd level, depending on your long term goals, choose one of the following paths.</p>
		<!-- <p><strong>Note:</strong> You may choose to use either updated "2024" trainer paths, or use the original "2018" trainer paths found in the original handbook.</p> -->
	</section>
	{#each paths as path}
		<section>
			<h2>{path.name}<!-- <sub>'24</sub> --></h2>
			{@html renderHtml(path.features.level2.description)}
			<h3>{path.features.level5.name}</h3>
			{@html renderHtml(path.features.level5.description)}
			<h3>{path.features.level9.name}</h3>
			{@html renderHtml(path.features.level9.description)}
			<h3>{path.features.level15.name}</h3>
			{@html renderHtml(path.features.level15.description)}
		</section>
	{/each}
</Card>

<!-- <style>
	h2 sub {
		font-weight: normal;
		padding-inline-start: 0.25em;
		font-size: 66.7%;
	}
</style> -->