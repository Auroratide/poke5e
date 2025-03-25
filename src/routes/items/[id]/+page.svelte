<script lang="ts">
	import type { PageData } from "./$types"
	import PokeItem from "$lib/items/PokeItem.svelte"
	import Title from "$lib/design/Title.svelte"

	export let data: PageData
	$: item = data.item
</script>

<Title value={item.name} />
<PokeItem {item} />
