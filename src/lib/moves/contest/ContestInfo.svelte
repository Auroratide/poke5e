<script lang="ts">
	import type { ContestDetails } from "./ContestDetails"
	import { m } from "$lib/site/i18n"
	import HeartNumber from "./HeartNumber.svelte"

	export let value: ContestDetails

	const translations = {
		cool: () => m["moves.cool"](),
		beauty: () => m["moves.beauty"](),
		cute: () => m["moves.cute"](),
		clever: () => m["moves.clever"](),
		tough: () => m["moves.tough"](),
	}
</script>

<div class="multi-tag" style:--skin-contest="var(--skin-contest-{value.contest}">
	<div class="header">
		<p><strong>{translations[value.contest]()}</strong></p>
	</div>
	<div class="main">
		<dl>
			<div>
				<dt>{m["moves.appeal"]()}</dt>
				<dd><HeartNumber filled value={value.appeal} /></dd>
			</div>
			<div>
				<dt>{m["moves.jam"]()}</dt>
				<dd><HeartNumber value={value.jam} /></dd>
			</div>
		</dl>
		<p class="footer">{value.effect.name}</p>
	</div>
</div>
<p>{value.effect.effect}</p>

<style>
	.multi-tag {
		display: flex;
		flex-direction: column;
		max-inline-size: 25em;
		margin-inline: auto;
		margin-block-end: 0.75em;
	}

	.multi-tag .header {
		display: flex;
		flex-direction: column;
		background-color: var(--skin-contest);
		color: var(--skin-bg-text);
		padding: 0.125em 1.5em;
		align-items: center;
		justify-content: center;
		text-transform: capitalize;
		margin: 0;
		border-radius: 1em 1em 0 0;
	}

	.multi-tag .header p {
		margin: 0;
	}

	.multi-tag .main {
		background: var(--skin-bg);
		color: var(--skin-bg-text);
		padding: 0.25em 1.5em;
		border-radius: 0 0 1em 1em;
	}

	.multi-tag .footer {
		margin-block: 0.5em;
		font-size: var(--font-sz-mars);
		text-align: center;
		text-wrap: balance;
	}

	.multi-tag dl {
		display: flex;
		justify-content: space-around;
		margin-block: 0.25em;
	}
	.multi-tag dt {
		font-size: var(--font-sz-venus);
		text-align: center;
	}
	.multi-tag dd {
		padding: 0;
		margin: 0;
		text-align: center;
	}
</style>
