<script lang="ts">
	import { Url } from "$lib/site/url"
	import { HelpIcon } from "$lib/ui/icons"
	import Popover from "../../ui/elements/Popover.svelte"
	import { rulesVersion } from "./RulesVersion"
	import { TogglePill } from "$lib/ui/elements"
	import type { Snippet } from "svelte"

	let {
		id = "rules-version-fieldset",
		legend: l,
	}: {
		id?: string,
		legend?: Snippet,
	} = $props()
</script>

<TogglePill
	{id}
	leftlabel="'18"
	leftvalue="2018"
	rightlabel="'24"
	rightvalue="2024"
	bind:group={$rulesVersion}
>
	{#snippet legend()}
		{#if l}
			{@render l()}
		{:else}
			<Popover id="{id}-popover">
				<HelpIcon slot="activator" label="Rules Version" />
				<p>You may choose to use either the updated "2024" rules, or use the "2018" rules found in the original handbook.<br />See: <a href="{Url.reference.introduction()}#rulesets">2024 Rule Updates</a></p>
			</Popover>
		{/if}
	{/snippet}
</TogglePill>
