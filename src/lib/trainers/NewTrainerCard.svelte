<script lang="ts">
	import { Card } from "$lib/ui/page"
	import { Button } from "$lib/ui/elements"
	import { trainers } from "./trainers"
	import { goto } from "$app/navigation"
	import {
		ActionArea,
		Form,
		Fieldset,
		TextField,
		MarkdownField,
		HintText,
	} from "$lib/ui/forms"
	import { Title } from "$lib/ui/layout"
	import { Url } from "$lib/site/url"
	import { m } from "$lib/site/i18n";

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
			goto(Url.trainers(info.readKey))
		}).catch(() => {
			saving = false
		})
	}

	const cancel = () => {
		goto(Url.trainers())
	}
</script>

<Title value="Create Trainer" />
<Card title="Create a New Trainer">
	<Form onsubmit={onCreate} {saving}>
		<Fieldset title="{m["universal.basicInfo"]()}">
			<TextField label={m["universal.name"]()} bind:value={name} {disabled} required />
			<MarkdownField label="Description" bind:value={description} rows={6} {disabled} />
		</Fieldset>
		<HintText>Once your trainer is created, you will be able to edit their stats, Pokémon, and inventory!</HintText>
		<ActionArea>
			<Button on:click={cancel} variant="ghost" {disabled}>{m["universal.cancel"]()}</Button>
			<Button type="submit" {disabled}>{m["universal.finish"]()}</Button>
		</ActionArea>
	</Form>
</Card>
