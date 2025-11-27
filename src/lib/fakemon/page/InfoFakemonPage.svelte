<script lang="ts">
	import PokemonSpeciesCard from "$lib/creatures/species/PokemonSpeciesCard.svelte"
	import { Button } from "$lib/ui/elements"
	import { ActionArea } from "$lib/ui/forms"
	import { Title } from "$lib/ui/layout"
	import { Url } from "$lib/url"
	import type { SingleFakemonStore } from "../store/SingleFakemonStore"
	import { PageAction } from "./actions"

	export let fakemon: SingleFakemonStore
	$: canEdit = $fakemon.update != null
</script>

<Title value="{$fakemon.value.data.species.name}" />
<PokemonSpeciesCard value={$fakemon.value.species}>
	<div slot="footer">
		<ActionArea>
			<Button href="{Url.fakemon($fakemon.value.data.readKey, PageAction.accessKey)}" variant="ghost">Access Key</Button>
			<Button href="{Url.fakemon($fakemon.value.data.readKey, PageAction.remove)}" variant="ghost">Remove</Button>
			{#if canEdit}
				<Button href="{Url.fakemon($fakemon.value.data.readKey, PageAction.edit)}">Edit</Button>
			{/if}
		</ActionArea>
	</div>
</PokemonSpeciesCard>
