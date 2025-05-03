<script lang="ts">
	import Card from "$lib/design/Card.svelte"
	import Title from "$lib/design/Title.svelte"
	import { TrainerPaths } from "$lib/trainers/paths"
	import { renderHtml } from "$lib/rendering/render"
	import { rulesVersion, RulesVersionToggle } from "$lib/design/rules-version"
	import ColumnedList from "$lib/design/ColumnedList.svelte"

	$: paths = TrainerPaths[$rulesVersion] 

	const asId = (name: string) => name.replaceAll(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase()
</script>

<Title value="Trainer Paths" />
<Card title="Trainer Paths">
	<RulesVersionToggle slot="header-extra" />
	<section>
		<p>There are many ways and reasons to train Pokémon. At the 2nd level, depending on your long term goals, choose one of the following paths.</p>
		<p><strong>Note:</strong> You may choose to use either updated "2024" trainer paths, or use the original "2018" trainer paths found in the original handbook.</p>
		<!-- <RulesVersionToggle /> -->
	</section>
	<aside aria-labelledby="shortcuts-label">
		<strong id="shortcuts-label" class="space-after">List of Paths</strong>
		<ColumnedList let:item items={paths} columns={2}>
			<a href="#{asId(item.name)}">{item.name}</a>
		</ColumnedList>
	</aside>
	{#each paths as path}
		<section>
			<h2 id="{asId(path.name)}">{path.name}{#if $rulesVersion === "2018"}<sub>'18</sub>{/if}</h2>
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

<style>
	h2 sub {
		font-weight: normal;
		padding-inline-start: 0.25em;
		font-size: 66.7%;
	}

	aside {
		padding-inline: 1em;
		margin-block: 1em;
	}

	.space-after {
		display: block;
		margin-block-end: 0.25em;
	}
</style>