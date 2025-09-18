<script>
	import Card from "$lib/design/Card.svelte"
	import Saveable from "$lib/design/Saveable.svelte"
	import { goto } from "$app/navigation"
	import { Url } from "$lib/url"
	import findTrainerIdImg from "$lib/assets/find-trainer-id.png"
	import Title from "$lib/design/Title.svelte"
	import { WithButton, TextField } from "$lib/design/forms"
	import { fakemonStore } from "$lib/fakemon/store"
	import { SpeciesIdentifier } from "$lib/creatures/species"

	let id = ""
	$: id = id.toLocaleUpperCase().replace(/[^a-zA-Z0-9.]/g, "")

	let couldNotFind = ""

	let searching = false
	const onSubmit = () => {
		const identifier = new SpeciesIdentifier(id)
		if (!identifier.isFakemon()) {
			couldNotFind = id
			return
		}

		searching = true
		fakemonStore.get(identifier.toFakemonReadKey()).then((fakemon) => {
			if (fakemon) {
				goto(Url.fakemon(identifier.toFakemonReadKey()))
			} else {
				searching = false
				couldNotFind = id
			}
		})
	}
</script>

<Title value="Find Fakémon by ID" />
<Card title="Find Fakémon by ID">
	<Saveable saving={searching} caption="Searching...">
		<section>
			<p>Enter the fakémon's unique ID below and click "Search".</p>
			<form on:submit|preventDefault={onSubmit} class="vertical spaced-lg" disabled={searching}>
				<WithButton label="Search" type="submit">
					<TextField label="Fakémon ID" bind:value={id} maxlength={15} placeholder="e.g. F.H4PF8E2GZA0A" disabled={searching} required />
				</WithButton>
				{#if couldNotFind.length > 0 && couldNotFind === id}
					<p class="font-sm error">No fakémon is registered with this id</p>
				{/if}
			</form>
		</section>
		<hr />
		<section>
			<p>Each fakémon has a unique 14-character ID. You can find it on its page, pictured below.</p>
			<figure class="spaced-lg">
				<img src={findTrainerIdImg} alt="The label 'ID' denotes the fakémon's id." width="800" height="256" />
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

	.font-sm {
		font-size: 1rem;
	}

	.error {
		font-style: italic;
		color: var(--skin-danger-text);
	}

	.vertical {
		display: flex;
		flex-direction: column;
	}
	
	img {
		width: 100%;
		height: 100%;
	}
</style>