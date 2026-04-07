<script lang="ts">
	import { Markdown } from "$lib/ui/rendering"
	import ReferencePage from "../ReferencePage.svelte"
	import type { PageData } from "./$types"
	import { m } from "$lib/site/i18n"
	import { capitalize } from "$lib/utils/string"
	import { Attributes } from "$lib/dnd/attributes"
	import { ColumnedList } from "$lib/ui/elements"
	import { TrainerOrigin } from "$lib/trainers/origins"

	export let data: PageData
</script>

<ReferencePage title="Trainer Origins">
	<section>
		<p>Trainers come from all walks of life. When you create a trainer, you may choose one of these origins, gaining its ability score bonuses, skill proficiencies, origin feat, and languages.</p>
		<ColumnedList let:item items={data.items} columns={2}>
			<a href="#{item.id}">{item.name}</a>
		</ColumnedList>
	</section>
	{#each data.items as origin}
		<section>
			<h2 id="{origin.id}">{origin.name}</h2>
			<Markdown value={origin.description} />

			<h3>{origin.abilityScores.name}</h3>
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

			<h3>{origin.proficiencies.name}</h3>
			<Markdown value={origin.proficiencies.description} />
			<p>{m.youGainProficiency({ skills: origin.proficiencies.values.map((it) => capitalize(it)).join(", ")})}</p>

			<h3>{origin.feats.name}</h3>
			<Markdown value={origin.feats.description} />
			<Markdown value={origin.feats.effect} />

			<h3>{m.languages()}</h3>
			<p>{m.youKnowTwoLanguages({ one: origin.languages.values[0], two: origin.languages.values[1] })}</p>
		</section>
	{/each}
</ReferencePage>
