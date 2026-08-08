<script lang="ts">
	import { TrainerPaths } from "$lib/trainers/paths"
	import { renderHtml } from "$lib/ui/rendering/render"
	import { rulesVersion } from "$lib/site/rules-version"
	import { ColumnedList, Heading } from "$lib/ui/elements"
	import ReferencePage from "../ReferencePage.svelte"

	$: paths = TrainerPaths[$rulesVersion] 

	const asId = (name: string) => name.replaceAll(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase()
</script>

<ReferencePage title="Trainer Paths">
	<section>
		<p>There are many ways and reasons to train Pokémon. At the 2nd level, depending on your long term goals, choose one of the following paths.</p>
	</section>
	<aside aria-labelledby="shortcuts-label">
		<strong id="shortcuts-label" class="space-after">List of Paths</strong>
		<ColumnedList let:item items={paths} columns={2}>
			<a href="#{asId(item.name)}">{item.name}</a>
		</ColumnedList>
	</aside>
	{#each paths as path}
		<section>
			<Heading level="2" id="{asId(path.name)}">{path.name}{#if $rulesVersion === "2018"}<sub>'18</sub>{/if}</Heading>
			{#if path.supplement}
				<p><strong>Requires Supplement:</strong> <a href="{path.supplement.url}">{path.supplement.name}</a></p>
			{/if}
			{@html renderHtml(path.features.level2.description)}
			<Heading level="3" id="{asId(path.name)}-level-5">{path.features.level5.name}</Heading>
			{@html renderHtml(path.features.level5.description)}
			<Heading level="3" id="{asId(path.name)}-level-9">{path.features.level9.name}</Heading>
			{@html renderHtml(path.features.level9.description)}
			<Heading level="3" id="{asId(path.name)}-level-15">{path.features.level15.name}</Heading>
			{@html renderHtml(path.features.level15.description)}
		</section>
	{/each}
</ReferencePage>

<style>
	section :global(h2 sub) {
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