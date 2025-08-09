<script lang="ts">
	import { goto } from "$app/navigation"
	import Button from "$lib/design/Button.svelte"
	import Card from "$lib/design/Card.svelte"
	import { ActionArea } from "$lib/design/forms"
	import Title from "$lib/design/Title.svelte"
	import { Url } from "$lib/url"
	import type { SingleFakemonStore } from "../store/SingleFakemonStore"
	import FakemonEditor from "./FakemonEditor.svelte"

	export let fakemon: SingleFakemonStore
	const canEdit = true

	let saving = false

	const onCancel = () => {
		goto(Url.fakemon($fakemon.value.data.readKey))
	}
</script>

<Title value="Edit {$fakemon.value.data.speciesName}" />
<Card title="Edit {$fakemon.value.data.speciesName}">
	{#if canEdit}
		<FakemonEditor fakemon={$fakemon.value} on:cancel={onCancel} {saving} />
	{:else}
		<section>
			<p>You do not have permission to edit this fakémon.</p>
			<ActionArea>
				<Button href="{Url.fakemon($fakemon.value.data.readKey)}">Go Back</Button>
			</ActionArea>
		</section>
	{/if}
</Card>