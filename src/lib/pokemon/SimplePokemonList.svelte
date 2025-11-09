<script lang="ts">
	import type { PokemonSpecies } from "$lib/creatures/species"
	import ColumnedList from "$lib/design/ColumnedList.svelte"
	import { Url } from "$lib/url"

	export let pokemon: Pick<PokemonSpecies, "id" | "name">[]
</script>

<ColumnedList let:item items={pokemon}>
	<a href="{Url.pokemon(item.id.data)}">{item.name}</a>
</ColumnedList>
