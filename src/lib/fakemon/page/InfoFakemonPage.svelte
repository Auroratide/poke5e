<script lang="ts">
	import Button from "$lib/design/Button.svelte"
	import Card from "$lib/design/Card.svelte"
	import { ActionArea } from "$lib/design/forms"
	import Title from "$lib/design/Title.svelte"
	import { TypeTag } from "$lib/pokemon/types-2"
	import { Url } from "$lib/url"
	import type { SingleFakemonStore } from "../store/SingleFakemonStore"
	import { PageAction } from "./actions"
	import FakemonInfo from "./FakemonInfo.svelte"

	export let fakemon: SingleFakemonStore
	$: canEdit = $fakemon.update != null
</script>

<Title value="{$fakemon.value.data.speciesName}" />
<Card title="{$fakemon.value.data.speciesName}">
	<TypeTag slot="header-extra" type={$fakemon.value.type.data} />
	<FakemonInfo fakemon={$fakemon.value} />
	{#if canEdit}
		<ActionArea>
			<Button href="{Url.fakemon($fakemon.value.data.readKey, PageAction.edit)}">Edit</Button>
		</ActionArea>
	{/if}
</Card>
