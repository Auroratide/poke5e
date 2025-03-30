<script lang="ts">
	import Editor, { type UpdateDetail } from "./Editor.svelte"
	import Card from "$lib/design/Card.svelte"
	import Button from "$lib/design/Button.svelte"
	import ActionArea from "$lib/design/Form/ActionArea.svelte"
	import type { TrainerStore } from "../trainers"
	import { goto } from "$app/navigation"
	import { Url } from "$lib/url"
	import Title from "$lib/design/Title.svelte"

	export let trainer: TrainerStore

	$: canEdit = $trainer.update != null
	let saving = false

	const onCancel = () => {
		goto(Url.trainers($trainer.info.readKey))
	}

	const onUpdate = (e: CustomEvent<UpdateDetail>) => {
		saving = true
		$trainer.update?.info(e.detail.trainer, {
			updateAvatar: e.detail.updateAvatar,
		}).then(() => {
			return $trainer.update?.inventory(e.detail.trainer) ?? Promise.resolve()
		}).then(() => {
			saving = false
			goto(Url.trainers($trainer.info.readKey))
		}).catch(() => {
			saving = false
		})
	}
</script>

<Title value="Edit {$trainer.info.name}" />
<Card title={$trainer.info.name}>
	{#if canEdit}
		<Editor trainer={$trainer.info} on:update={onUpdate} on:cancel={onCancel} {saving} />
	{:else}
		<section>
			<p>You do not have permission to edit this trainer.</p>
			<ActionArea>
				<Button href="{Url.trainers($trainer.info.readKey)}">Go Back</Button>
			</ActionArea>
		</section>
	{/if}
</Card>
