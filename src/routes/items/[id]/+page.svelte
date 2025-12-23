<script lang="ts">
	import type { PageData } from "./$types"
	import { Title } from "$lib/ui/layout"
	import { PokeItem } from "$lib/items"

	export let data: PageData
	$: item = data.item
</script>

<Title value={item.name} />
<PokeItem {item} />
