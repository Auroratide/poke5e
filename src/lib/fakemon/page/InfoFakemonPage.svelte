<script lang="ts">
	import PokemonSpeciesCard from "$lib/creatures/species/PokemonSpeciesCard.svelte"
	import Button from "$lib/design/Button.svelte"
	import { ActionArea } from "$lib/design/forms"
	import Title from "$lib/design/Title.svelte"
	import { Url } from "$lib/url"
	import type { SingleFakemonStore } from "../store/SingleFakemonStore"
	import { PageAction } from "./actions"

	export let fakemon: SingleFakemonStore
	$: canEdit = $fakemon.update != null
</script>

<Title value="{$fakemon.value.data.species.name}" />
<PokemonSpeciesCard value={$fakemon.value.species}>
	<div slot="footer">
		{#if canEdit}
			<ActionArea>
				<Button href="{Url.fakemon($fakemon.value.data.readKey, PageAction.edit)}">Edit</Button>
			</ActionArea>
		{/if}
	</div>
</PokemonSpeciesCard>
