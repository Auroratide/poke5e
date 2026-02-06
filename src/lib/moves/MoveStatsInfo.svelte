<script lang="ts">
	import type { MoveStats } from "./MoveStats"
	import { PlusMinus } from "$lib/ui/elements"
	import { m } from "$lib/site/i18n"

	export let value: MoveStats
</script>

<dl class="move-stats-info">
	{#if value.toHit}
		<div>
			<dt>{m["moves.attack"]()}</dt>
			<dd><PlusMinus value={value.toHit} /> {m["moves.toHit"]()}</dd>
		</div>
	{/if}
	{#if value.save}
		<div>
			<dt><span class="upper">{value.save.attribute.join("/")}</span> {m["moves.save"]()}</dt>
			<dd>DC {value.save.dc}</dd>
		</div>
	{/if}
	{#if value.damage}
		<div>
			<dt>
				{#if value.damage.isHealing}
					{m["moves.healing"]()}
				{:else}
					{m["moves.damage"]()}
				{/if}
			</dt>
			<dd>{value.damage.dice}{#if value.damage.mod > 0}&nbsp;+ {value.damage.mod}{/if}</dd>
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
</style>