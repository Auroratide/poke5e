<script lang="ts">
	import { Url } from "$lib/site/url"
	import { Button } from "$lib/ui/elements"
	import { ActionArea, Saveable } from "$lib/ui/forms"
	import { Title } from "$lib/ui/layout"
	import { Card } from "$lib/ui/page"
	import { m } from "$lib/site/i18n"
	import type { TrainerStore } from "./trainers";
	import { LevelUp, LevelUpTrainer } from "$lib/poke5e/level-up";
	import { TrainerLevelTable } from "$lib/poke5e/level-up/TrainerLevelTable";

	let {
		trainer,
	}: {
		trainer: TrainerStore
	} = $props()

	$effect(() => {
		console.log($trainer.info)
	})

	let canEdit = $derived($trainer.update != null)

	const template = $derived(TrainerLevelTable.toLevel($trainer.info.level.next())($trainer.info))

	let saving = $state(false)
	const applyLevelUp = async () => {
		// saving = true
		const updatedTrainer = LevelUp.apply($trainer.info, template)
		console.log(updatedTrainer)
		// const updatedTrainer = trainer.levelUp
		// $trainer.update?.info(updatedTrainer)
	}
</script>

<Title value="Level Up" />
<Card title="Level Up yay!">
	{#if canEdit}
		<Saveable {saving}>
			<section>
				<p>Congratulations yay!</p>
			</section>
			<LevelUpTrainer trainer={$trainer.info} effects={template} />
			<ActionArea>
				<Button href={Url.trainers($trainer.info.readKey)} variant="subtle">{m.back()}</Button>
				<Button on:click={applyLevelUp}>Confirm</Button>
			</ActionArea>
		</Saveable>
	{:else}
		<section>
			<p>You do not have permission to level uo this trainer.</p>
		</section>
		<ActionArea>
			<Button href={Url.trainers($trainer.info.readKey)} variant="subtle">{m.back()}</Button>
		</ActionArea>
	{/if}
</Card>
