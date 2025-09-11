<script lang="ts">
	import { goto } from "$app/navigation"
	import Button from "$lib/design/Button.svelte"
	import Card from "$lib/design/Card.svelte"
	import { ActionArea } from "$lib/design/forms"
	import Title from "$lib/design/Title.svelte"
	import { Url } from "$lib/url"
	import type { SingleFakemonStore } from "../store/SingleFakemonStore"
	import FakemonEditor, { type SubmitDetail } from "./FakemonEditor.svelte"

	export let fakemon: SingleFakemonStore
	$: canEdit = $fakemon.update != null

	let saving = false

	const onCancel = () => {
		goto(Url.fakemon($fakemon.value.data.readKey))
	}

	const onSubmit = (e: CustomEvent<SubmitDetail>) => {
		saving = true

		$fakemon.update?.info(e.detail.fakemon, {
			media: e.detail.newMedia,
		}).then(() => {
			goto(Url.fakemon($fakemon.value.data.readKey))
		}).catch(() => {
			saving = false
		})
	}
</script>

<Title value="Edit {$fakemon.value.data.speciesName}" />
<Card title="Edit {$fakemon.value.data.speciesName}">
	{#if canEdit}
		<FakemonEditor fakemon={$fakemon.value} on:submit={onSubmit} on:cancel={onCancel} {saving} />
	{:else}
		<section>
			<p>You do not have permission to edit this fakémon.</p>
			<ActionArea>
				<Button href="{Url.fakemon($fakemon.value.data.readKey)}">Go Back</Button>
			</ActionArea>
		</section>
	{/if}
</Card>