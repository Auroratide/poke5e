<script lang="ts">
	import { Url } from "$lib/site/url"
	import { Button } from "$lib/ui/elements"
	import { ActionArea, Saveable } from "$lib/ui/forms"
	import { Title } from "$lib/ui/layout"
	import { Card } from "$lib/ui/page"
	import { m } from "$lib/site/i18n"
	import type { TrainerStore } from "../trainers"
	import { LevelUp, LevelUpForm } from "$lib/poke5e/level-up"
	import { TrainerLevelTable } from "$lib/poke5e/level-up/TrainerLevelTable"
	import { goto } from "$app/navigation"

	let {
		trainer,
	}: {
		trainer: TrainerStore
	} = $props()

	let canEdit = $derived($trainer.update != null)

	const effects = $derived(TrainerLevelTable.toLevel($trainer.info.level.next())($trainer.info))

	let saving = $state(false)
	const applyLevelUp = async () => {
		saving = true
		const updatedTrainer = LevelUp.apply($trainer.info, effects)
		await $trainer.update?.info(updatedTrainer).then(() => {
			return $trainer.update?.trainerFeats(updatedTrainer) ?? Promise.resolve()
		}).then(() => {
			goto(Url.trainers($trainer.info.readKey))
		}).catch(() => {
			saving = false
		})
	}
</script>

<Title value={m.levelUp()} />
<Card title={m.levelUpName({ name: $trainer.info.name })}>
	{#if canEdit}
		<Saveable {saving}>
			<section>
				<p>{m.levelUpInstructions()}</p>
			</section>
			<LevelUpForm effects={effects} />
			<ActionArea>
				<Button href={Url.trainers($trainer.info.readKey)} variant="subtle">{m.back()}</Button>
				<Button on:click={applyLevelUp}>{m.confirm()}</Button>
			</ActionArea>
		</Saveable>
	{:else}
		<section>
			<p>{m.noLevelUpPermission()}</p>
		</section>
		<ActionArea>
			<Button href={Url.trainers($trainer.info.readKey)} variant="subtle">{m.back()}</Button>
		</ActionArea>
	{/if}
</Card>
