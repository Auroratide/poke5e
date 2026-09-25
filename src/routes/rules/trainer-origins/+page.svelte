<script lang="ts">
	import { Markdown } from "$lib/ui/rendering"
	import ReferencePage from "../ReferencePage.svelte"
	import type { PageData } from "./$types"
	import { m } from "$lib/site/i18n"
	import { capitalize } from "$lib/utils/string"
	import { Attributes } from "$lib/dnd/attributes"
	import { ColumnedList, Heading, Tag } from "$lib/ui/elements"
	import { TrainerOrigin } from "$lib/trainers/origins"
	import { currentEdition } from "$lib/site/edition"

	export let data: PageData
</script>

<ReferencePage title="Trainer Origins">
	{#if $currentEdition === "2024"}
		<section>
			<p class="smaller"><Tag>Note!</Tag> This has not (yet) been updated for 5.5e's character origins rules.</p>
		</section>
	{/if}
	<section>
		<p>Trainers come from all walks of life. When you create a trainer, you may choose one of these origins, gaining its ability score bonuses, skill proficiencies, origin feat, and languages.</p>
		<ColumnedList let:item items={data.items} columns={2}>
			<a href="#{item.id}">{item.name}</a>
		</ColumnedList>
	</section>
	{#each data.items as origin}
		<section>
			<Heading level="2" id="{origin.id}">{origin.name}</Heading>
			<Markdown value={origin.description} />

			<Heading level="3" id="{origin.id}-ability-scores">{origin.abilityScores.name}</Heading>
			<Markdown value={origin.abilityScores.description} />
			{#if Array.isArray(origin.abilityScores.values)}
				{#if TrainerOrigin.abilityScoresHasOptions(origin.abilityScores.values)}
					<p>{m.chooseOne()}:</p>
					<ul>
						{#each origin.abilityScores.values as option}
							<li>{m.yourScoreIncreases({
								scorePlus2: Attributes.getName(option[0]),
								scorePlus1: Attributes.getName(option[1]),
							})}</li>
						{/each}
					</ul>
				{:else}
					<p>{m.yourScoreIncreases({
						scorePlus2: Attributes.getName(origin.abilityScores.values[0]),
						scorePlus1: Attributes.getName(origin.abilityScores.values[1]),
					})}</p>
				{/if}
			{:else}
				<p>{m.anyTwoScoresIncrease()}</p>
			{/if}

			<Heading level="3" id="{origin.id}-proficiencies">{origin.proficiencies.name}</Heading>
			<Markdown value={origin.proficiencies.description} />
			<p>{m.youGainProficiency({ skills: origin.proficiencies.values.map((it) => capitalize(it)).join(", ")})}</p>

			<Heading level="3" id="{origin.id}-feats">{origin.feats.name}</Heading>
			<Markdown value={origin.feats.description} />
			<Markdown value={origin.feats.effect} />

			<Heading level="3" id="{origin.id}-languages">{m.languages()}</Heading>
			<p>{m.youKnowTwoLanguages({ one: origin.languages.values[0], two: origin.languages.values[1] })}</p>
		</section>
	{/each}
</ReferencePage>

<style>
	.smaller { font-size: var(--font-sz-venus); }
</style>