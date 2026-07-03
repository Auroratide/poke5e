<script lang="ts">
	import { goto } from "$app/navigation"
	import { LevelUp, LevelUpForm } from "$lib/poke5e/level-up"
	import type { LevelUpEffect } from "$lib/poke5e/level-up/effects/LevelUpEffect.svelte"
	import { TrainerLevelTable } from "$lib/poke5e/level-up/TrainerLevelTable"
	import { m } from "$lib/site/i18n"
	import { Url } from "$lib/site/url"
	import { Button } from "$lib/ui/elements"
	import { ActionArea } from "$lib/ui/forms"
	import { Title } from "$lib/ui/layout"
	import { Card } from "$lib/ui/page"
	import type { TrainerStore } from "../trainers"

	let {
		trainer,
	}: {
		trainer: TrainerStore
	} = $props()

	let canEdit = $derived($trainer.update != null)
	let theTrainer = $trainer.info

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const effects = $derived(TrainerLevelTable.toLevel(theTrainer.level.next())(theTrainer) as LevelUpEffect<any, any, any>[])

	let saving = $state(false)
	const applyLevelUp = async () => {
		saving = true
		const updatedTrainer = LevelUp.apply(theTrainer, effects)
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
<Card title={m.levelUpName({ name: theTrainer.name })}>
	{#if canEdit}
		<LevelUpForm {saving} backHref={Url.trainers(theTrainer.readKey)} effects={effects} onsubmit={applyLevelUp} />
	{:else}
		<section>
			<p>{m.noLevelUpPermission()}</p>
		</section>
		<ActionArea>
			<Button href={Url.trainers(theTrainer.readKey)} variant="subtle">{m.back()}</Button>
		</ActionArea>
	{/if}
</Card>
