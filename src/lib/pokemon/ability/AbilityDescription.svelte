<script lang="ts">
	import type { Ability } from "./Ability"
	import { AbilityStore } from "./AbilityStore"
	import { Markdown } from "$lib/ui/rendering"
	import { Popover } from "$lib/ui/elements"
	import { m } from "$lib/site/i18n"
	import { HelpIcon } from "$lib/ui/icons"

	let {
		value,
		allAbilities,
	}: {
		value: Ability,
		// optional, for ssr
		allAbilities?: Ability[],
	} = $props()

	const uid = $props.id()
	const popoverId = `untraceable-${uid}`

	let untraceableNames = $derived(
		(allAbilities ?? $AbilityStore.result ?? [])
			.filter((it) => it.untraceable)
			.map((it) => it.name)
			.sort((a, b) => a.localeCompare(b)),
	)
</script>

<Markdown inline value={value.description} />
{#if value.isTrace && untraceableNames.length > 0}
	<div class="popover-info">
		<Popover id={popoverId} size="lg">
			<span slot="activator" class="activator">
				<HelpIcon label="Rules Version" />
				<span>{m.listUntraceableAbilities()}</span>
			</span>
			<p>{untraceableNames.join(", ")}</p>
		</Popover>
	</div>
{/if}

<style>
	.popover-info {
		margin-block-start: 0.5em;
	}

	.activator {
		color: var(--theme-text);
		text-decoration: underline;
		display: flex;
		align-items: center;
		gap: 0.25em;
	}
</style>
