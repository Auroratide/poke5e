<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { PlusMinus } from "$lib/ui/elements"
	import type { MoveStats } from "./MoveStats"

	export let value: MoveStats
</script>

<dl class="move-stats-info">
	{#if value.toHit}
		<div>
			<dt>{m["movesSection.attack"]()}</dt>
			<dd><PlusMinus value={value.toHit} /> {m["movesSection.toHit"]()}</dd>
		</div>
	{/if}
	{#if value.save}
		<div>
			<dt><span class="upper">{value.save.attribute.join("/")}</span> {m["movesSection.save"]()}</dt>
			<dd>DC {value.save.dc}</dd>
		</div>
	{/if}
	{#if value.damage}
		<div>
			<dt>
				{#if value.damage.isHealing}
					{m["movesSection.healing"]()}
				{:else}
					{m["movesSection.damage"]()}
				{/if}
			</dt>
			<dd class="row">
				<span>{value.damage.dice}{#if value.damage.mod > 0}&nbsp;+ {value.damage.mod}{/if}</span>
			</dd>
		</div>
	{/if}
</dl>

<style>
	.move-stats-info {
		display: flex;
		border-radius: 0 0 0.25em 0.25em;
		background: var(--skin-bg);
		color: var(--skin-bg-text);
	} .move-stats-info div {
		flex: 1;
		text-align: center;
		padding-block: 0.25em;
	}

	dt {
		font-size: var(--font-sz-mars);
		font-weight: bold;
	}

	dd {
		margin: 0;
		font-size: var(--font-sz-venus);
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25em;
	}
</style>