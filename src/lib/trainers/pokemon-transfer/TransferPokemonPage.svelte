<script lang="ts">
	import { WithSpecies } from "$lib/poke5e/species";
	import { m } from "$lib/site/i18n";
	import { Url } from "$lib/site/url";
	import { Button, Loader } from "$lib/ui/elements";
	import { ActionArea } from "$lib/ui/forms";
	import Saveable from "$lib/ui/forms/Saveable.svelte";
	import { Card } from "$lib/ui/page";
	import RequirePokemon from "../pokemon-details/RequirePokemon.svelte";
	import type { TrainerStore } from "../trainers";
	import type { PokemonId } from "../types";
	import { TransferCode } from "./TransferCode";
	import { provider } from "./TransferCodeDataProvider";

	let {
		trainer,
		id,
	}: {
		trainer: TrainerStore,
		id: PokemonId,
	} = $props()

	let pokemon = $derived($trainer.pokemon.find((it) => it.id === id))
	let writeKey = $derived($trainer.writeKey)
	let canEdit = $derived($trainer.update != null)
	let initializing = $derived(writeKey != null)
	let transferCode = $state<TransferCode | undefined>(undefined)

	$effect(() => {
		if (writeKey) {
			provider.get(writeKey, id).then((code) => {
				transferCode = code
			}).finally(() => {
				initializing = false
			})
		}
	})

	let generating = $state(false)
	async function generateCode() {
		if (writeKey) {
			generating = true
			provider.generate(writeKey, id).then((code) => {
				transferCode = code
			}).finally(() => {
				generating = false
			})
		}
	}

	let revoking = $state(false)
	async function revokeCode() {
		if (writeKey) {
			revoking = true
			provider.revoke(writeKey, id).then(() => {
				transferCode = undefined
			}).finally(() => {
				revoking = false
			})
		}
	}
</script>

<RequirePokemon trainer={$trainer} {id} titlePrefix="Transfer">
	<WithSpecies let:species ids={pokemon ? [pokemon.pokemonId] : []}>
		<Card title="Transfer {pokemon?.nickname ?? species.name}">
			{#if canEdit}
				<section>
					<p>This let's you transfer a <em>copy</em> of this pokémon to another Trainer.</p>
					<ol>
						<li>Generate a Transfer Code.</li>
						<li>Share the Transfer Code.</li>
						<li>Add the pokemon to the trainer using the Transfer Code.</li>
					</ol>
				</section>
				
				<section class="the-code">
					{#if initializing}
						<Loader caption="Finding code..." size="sm" />
					{:else}
						{#if transferCode == null}
							<Saveable saving={generating} size="sm">
								<p><Button on:click={generateCode} disabled={generating}>Generate Code</Button></p>
							</Saveable>
						{:else}
							<Saveable saving={revoking} size="sm">
								<p>Code:<br /><code>{transferCode}</code></p>
								<p><Button on:click={revokeCode} variant="danger" disabled={revoking}>Revoke Code</Button></p>
							</Saveable>
						{/if}
					{/if}
				</section>
			{:else}
				<section>
					<p>You do not have permission to transfer this trainer's pokémon. You must be an owner of the trainer in order to transfer their pokémon.</p>
				</section>
			{/if}
			<ActionArea>
				<Button href={Url.trainers($trainer.info.readKey, id)}>{m.back()}</Button>
			</ActionArea>
		</Card>
	</WithSpecies>
</RequirePokemon>

<style>
	.the-code {
		text-align: center;
		margin-block: 1.5em;
		font-size: var(--font-sz-neptune);
		min-block-size: 7em;
	}
</style>