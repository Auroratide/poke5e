<script lang="ts">
	import type { Item } from "./types"
	import Card from "../design/Card.svelte"
	import FlatDl from "../design/FlatDl.svelte"
	import { renderHtml } from "../rendering/render"
	import { formatMoney } from "$lib/pokemon/money"

	export let item: Item
</script>

<Card title={item.name}>
	<section class="info">
		<FlatDl>
			<dt>Type</dt>
			<dd class="cap">{item.type}</dd>
			<dt>Cost</dt>
			<dd>{formatMoney(item.cost)}</dd>
		</FlatDl>
	</section>
	<section class="description">
		{@html renderHtml(item.description)}
	</section>
</Card>
