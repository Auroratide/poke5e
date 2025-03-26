<script lang="ts">
	import type { Pokemon } from "$lib/creatures/types"
	import ColumnedList from "$lib/design/ColumnedList.svelte"
	import { Url } from "$lib/url"

	export let pokemon: Pick<Pokemon, "id" | "name">[]
</script>

<ColumnedList let:item items={pokemon}>
	<a href="{Url.pokemon(item.id)}">{item.name}</a>
</ColumnedList>
