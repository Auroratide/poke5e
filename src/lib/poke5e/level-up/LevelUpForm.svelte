<script lang="ts">
	import type { LevelUpEffect } from "./effects/LevelUpEffect.svelte"
	import { m } from "$lib/site/i18n"
	import { ActionArea, Saveable } from "$lib/ui/forms"
	import { Button } from "$lib/ui/elements"
	import { LevelUp } from "./LevelUp"

	let {
		saving,
		backHref,
		onback,
		effects,
		onsubmit,
	}: {
		saving: boolean,
		backHref?: string,
		/** Takes precedence over backHref */
		onback?: () => void,
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
		{#if onback}
			<Button on:click={onback} variant="subtle">{m.back()}</Button>
		{:else}
			<Button href={backHref} variant="subtle">{m.back()}</Button>
		{/if}
		<Button on:click={onsubmit} disabled={hasError}>{m.confirm()}</Button>
	</ActionArea>
</Saveable>
