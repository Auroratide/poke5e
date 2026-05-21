<script lang="ts">
	import PokemonSpeciesCard from "$lib/poke5e/species/PokemonSpeciesCard.svelte"
	import { Button } from "$lib/ui/elements"
	import { ActionArea } from "$lib/ui/forms"
	import { Title } from "$lib/ui/layout"
	import { Url } from "$lib/site/url"
	import type { SingleFakemonStore } from "../store/SingleFakemonStore"
	import { PageAction } from "./actions"
	import { m } from "$lib/site/i18n"
	import { TagList, TagListInfo } from "$lib/poke5e/tags"
	import { FeatureToggles } from "$lib/site/FeatureToggles"

	export let fakemon: SingleFakemonStore
	$: canEdit = $fakemon.update != null

	const onSaveTags = async (newList: TagList) => {
		const updated = $fakemon.value.copy({
			tags: newList,
		})
		await $fakemon.tags.update(updated)
	}
</script>

<Title value="{$fakemon.value.data.species.name}" />
<PokemonSpeciesCard value={$fakemon.value.species} dismissToHref="{Url.fakemon()}">
	<div slot="footer">
		{#if FeatureToggles.Tagging()}
			<section>
				<TagListInfo value={$fakemon.value.tags} onsave={onSaveTags} />
			</section>
		{/if}
		<ActionArea>
			<Button href="{Url.fakemon($fakemon.value.data.readKey, PageAction.accessKey)}" variant="ghost">{m.accessKey()}</Button>
			<Button href="{Url.fakemon($fakemon.value.data.readKey, PageAction.remove)}" variant="ghost">{m.remove()}</Button>
			{#if canEdit}
				<Button href="{Url.fakemon($fakemon.value.data.readKey, PageAction.edit)}">{m.edit()}</Button>
			{/if}
		</ActionArea>
	</div>
</PokemonSpeciesCard>
