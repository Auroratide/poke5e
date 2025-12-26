<!--
	Syntax:
	* {{TYPE:ID}} -> render the thing's name
	* {{TYPE::ID}} -> render the thing's as a link
-->
<script lang="ts">
	import { onMount, onDestroy } from "svelte"
	import { PokemonSpecies, SpeciesIdentifier, SpeciesStore } from "$lib/poke5e/species"
	import { LoaderInline } from "$lib/ui/elements"
	import { MovesStore } from "$lib/moves/store"
	import { abilities } from "$lib/pokemon/store"
	import { Url } from "$lib/site/url"
	import { type Unsubscriber } from "svelte/store"
	import DomPurify from "dompurify"

	let loading = true
	let species: PokemonSpecies[] = []
	let unsubscribe: Unsubscriber = undefined

	onMount(() => {
		SpeciesStore.completeList().then((store) => {
			unsubscribe = store.subscribe((s) => {
				if (s != null && s.length > 0) {
					loading = false
					species = s
				}
			})
		})
	})

	onDestroy(() => {
		unsubscribe?.()
	})
	
	export let value: string

	const isFakemon = (id: string) => new SpeciesIdentifier(id).isFakemon()

	$: toRender = value
		.replaceAll(/{{pokemon:(:?)(.*?)}}/g, (_, link, id) => link !== "" ? `<a href="${isFakemon(id) ? Url.fakemon(new SpeciesIdentifier(id).toFakemonReadKey()) : Url.pokemon(id)}">${species.find((it) => it.id.data === id)?.data.name}</a>` : species.find((it) => it.id.data === id)?.data.name)
		.replaceAll(/{{move:(:?)(.*?)}}/g, (_, link, id) => link !== "" ? `<a href="${Url.moves(id)}">${$MovesStore.find((it) => it.id === id)?.name}</a>` : $MovesStore.find((it) => it.id === id)?.name)
		.replaceAll(/{{ability:(:?)(.*?)}}/g, (_, link, id) => link !== "" ? `<a href="${Url.reference.abilities()}#${id}">${$abilities.find((it) => it.id === id)?.name}</a>` : $abilities.find((it) => it.id === id)?.name)

	$: sanitized = DomPurify.sanitize(toRender, {
		FORBID_TAGS: ["style", "script"],
	})
</script>

{#if loading}
	<LoaderInline />
{:else}
	{@html sanitized}
{/if}
