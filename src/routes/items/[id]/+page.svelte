<script lang="ts">
	import type { PageData } from "./$types"
	import PokeItem from "$lib/items/PokeItem.svelte"
	import { Title } from "$lib/ui/layout"

	export let data: PageData
	$: item = data.item
</script>

<Title value={item.name} />
<PokeItem {item} />
