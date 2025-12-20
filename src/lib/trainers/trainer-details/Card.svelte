<script lang="ts">
	import Info from "./Info.svelte"
	import { Card } from "$lib/ui/page"
	import { Button } from "$lib/ui/elements"
	import { ActionArea } from "$lib/ui/forms"
	import type { TrainerStore } from "../trainers"
	import { Url } from "$lib/site/url"
	import { PageAction } from "../page-action"
	import { Title } from "$lib/ui/layout"
	import { Level } from "$lib/ui/elements"
	import type { InventoryItem, TrainerInfo } from "../types"

	export let trainer: TrainerStore
	$: canEdit = $trainer.update != null

	const onUpdate = (e: CustomEvent<TrainerInfo>) => {
		$trainer.update?.info(e.detail, {
			optimistic: true,
		})
	}

	const onUpdateItem = (e: CustomEvent<InventoryItem>) => {
		$trainer.update?.inventoryItem(e.detail, {
			optimistic: true,
		})
	}
</script>

<Title value="{$trainer.info.name}" />
<Card title={$trainer.info.name}>
	<div slot="header-extra" style:padding-inline-end="0.5em">
		<Level value={$trainer.info.level.data} />
	</div>
	<Info trainer={$trainer.info} editable={canEdit} on:update={onUpdate} on:update-item={onUpdateItem} />
	<ActionArea>
		<Button href="{Url.trainers($trainer.info.readKey, undefined, PageAction.accessKey)}" variant="ghost">Access Key</Button>
		<Button href="{Url.trainers($trainer.info.readKey, undefined, PageAction.removeTrainer)}" variant="ghost">Remove</Button>
		{#if $trainer.update}
			<Button href="{Url.trainers($trainer.info.readKey, undefined, PageAction.restTrainer)}" variant="success">Rest</Button>
			<Button href="{Url.trainers($trainer.info.readKey, undefined, PageAction.editTrainer)}">Edit</Button>
		{/if}
	</ActionArea>
</Card>
