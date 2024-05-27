<script lang="ts">
	import Info from "./Info.svelte"
	import Card from "$lib/design/Card.svelte"
	import Button from "$lib/design/Button.svelte"
	import ActionArea from "$lib/design/Form/ActionArea.svelte"
	import type { TrainerStore } from "../trainers"
	import { Url } from "$lib/url"
	import { PageAction } from "../page-action"
	import Title from "$lib/design/Title.svelte"

	export let trainer: TrainerStore
</script>

<Title value="{$trainer.info.name}" />
<Card title={$trainer.info.name}>
	<Info trainer={$trainer.info} />
	<ActionArea>
		<Button href="{Url.trainers($trainer.info.readKey, undefined, PageAction.accessKey)}" variant="ghost">Access Key</Button>
		<Button href="{Url.trainers($trainer.info.readKey, undefined, PageAction.removeTrainer)}" variant="ghost">Remove</Button>
		{#if $trainer.update}
			<Button href="{Url.trainers($trainer.info.readKey, undefined, PageAction.editTrainer)}">Edit</Button>
		{/if}
	</ActionArea>
</Card>
