<script lang="ts">
	import type { LevelUpEffect } from "./effects/LevelUpEffect.svelte"
	import { m } from "$lib/site/i18n"
	import { ActionArea, Saveable } from "$lib/ui/forms"
	import { Button } from "$lib/ui/elements"
	import { LevelUp } from "./LevelUp"

	let {
		saving,
		backHref,
		effects,
		onsubmit,
	}: {
		saving: boolean,
		backHref: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		effects: LevelUpEffect<any, any>[],
		onsubmit: () => void
	} = $props()

	let errors = $derived(LevelUp.listErrors(effects))
	let hasError = $derived(errors.length > 0)
</script>


<Saveable {saving}>
	<section>
		<p>{m.levelUpInstructions()}</p>
	</section>
	{#each effects as effect}
		<effect.Field value={effect} />
	{/each}
	<ActionArea error={hasError ? errors.join(" ") : undefined}>
		<Button href={backHref} variant="subtle">{m.back()}</Button>
		<Button on:click={onsubmit} disabled={hasError}>{m.confirm()}</Button>
	</ActionArea>
</Saveable>
