<script lang="ts">
	import Card from "$lib/design/Card.svelte"
	import Saveable from "$lib/design/Saveable.svelte"
	import { goto } from "$app/navigation"
	import { Url } from "$lib/url"
	import findId from "./assets/id.webp"
	import { Title } from "$lib/ui/layout"
	import SearchFakemonById from "../search/SearchFakemonById.svelte"
	import type { SearchFakemonByIdDetail } from "../search"

	let searching = false
	const onSubmit = (e: CustomEvent<SearchFakemonByIdDetail>) => {
		goto(Url.fakemon(e.detail.value.data.readKey))
	}
</script>

<Title value="Find Fakémon by ID" />
<Card title="Find Fakémon by ID">
	<Saveable saving={searching} caption="Searching...">
		<section>
			<p>Enter the fakémon's unique ID below and click "Search".</p>
			<SearchFakemonById on:found={onSubmit} />
		</section>
		<hr />
		<section>
			<p>Each fakémon has a unique 14-character ID. You can find it on its page, pictured below.</p>
			<figure class="spaced-lg">
				<img src={findId} alt="The label 'ID' denotes the fakémon's id." width="1208" height="422" />
				<figcaption>Use this ID for searching</figcaption>
			</figure>
			<p>Searching by a fakémon's ID can allow you to use a friend's or DM's fakémon in your campaign.</p>
		</section>
	</Saveable>
</Card>

<style>
	.spaced-lg {
		margin-bottom: 1em;
	}
	
	img {
		width: 100%;
		height: 100%;
	}
</style>