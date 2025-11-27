<script lang="ts">
	import Card from "$lib/design/Card.svelte"
	import Button from "$lib/design/Button.svelte"
	import { trainers } from "./trainers"
	import { goto } from "$app/navigation"
	import { base } from "$app/paths"
	import {
		ActionArea,
		Form,
		Fieldset,
		TextField,
		MarkdownField,
		HintText,
	} from "$lib/ui/forms"
	import Title from "$lib/design/Title.svelte"

	let name = ""
	let description = ""
	
	let saving = false
	$: disabled = saving
	const onCreate = () => {
		saving = true
		trainers.new({
			name,
			description,
		}).then(({ info }) => {
			goto(`${base}/trainers?id=${info.readKey}`)
		}).catch(() => {
			saving = false
		})
	}

	const cancel = () => {
		goto(`${base}/trainers`)
	}
</script>

<Title value="Create Trainer" />
<Card title="Create a New Trainer">
	<Form onsubmit={onCreate} {saving}>
		<Fieldset title="Basic Info">
			<TextField label="Name" bind:value={name} {disabled} required />
			<MarkdownField label="Description" bind:value={description} rows={6} {disabled} />
		</Fieldset>
		<HintText>Once your trainer is created, you will be able to edit their stats, Pokémon, and inventory!</HintText>
		<ActionArea>
			<Button on:click={cancel} variant="ghost" {disabled}>Cancel</Button>
			<Button type="submit" {disabled}>Finish!</Button>
		</ActionArea>
	</Form>
</Card>
