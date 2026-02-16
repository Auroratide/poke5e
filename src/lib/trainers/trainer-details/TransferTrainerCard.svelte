<script lang="ts">
	import { Card } from "$lib/ui/page"
	import type { TrainerStore } from "../trainers"
	import { ActionArea, PasswordField, TextField, WithButton, Saveable } from "$lib/ui/forms"
	import { Button } from "$lib/ui/elements"
	import { Url } from "$lib/site/url"
	import { Title } from "$lib/ui/layout"
	import findTransfer from "./find-transfer.webp"
	import { browser } from "$app/environment"
	
	export let trainer: TrainerStore

	const domain = browser ? window.location.origin : "https://poke5e.app"

	let accessKey = ""
	$: accessKey = accessKey.toLocaleUpperCase().replace(/[^a-zA-Z0-9]/g, "")

	let searching = false
	let couldNotFind = ""
	let success = false
	const verify = () => {
		searching = true
		trainer.verifyAccess(accessKey).then((isVerified) => {
			if (isVerified) {
				success = true
			} else {
				couldNotFind = accessKey
			}
		}).finally(() => {
			searching = false
		})
	}

	$: name = $trainer?.info.name ?? ""
	$: canEdit = $trainer.update != null
</script>

<Title value="Transfer {name}" />
<Card title="Transfer {name}">
	{#if success}
		<section>
			<p><strong>Success!</strong></p>
			<p>You can now manage {name} and their pokemon.</p>
			<ActionArea>
				<Button href="{Url.trainers($trainer?.info.readKey)}">Go to Trainer's Page</Button>
			</ActionArea>
		</section>
	{:else}
		{#if canEdit}
			<section>
				<p>You can <strong>transfer</strong> this trainer to another player or device using one of the two links below.</p>
				<p>The <strong>Read-Only Link</strong> allows the other player or device to look at a trainer and their pokémon without being able to edit them. This kind of transfer is useful for things like sharing character sheets to the DM or other players.</p>
				<p>
					<PasswordField label="Read-Only Link" value="{domain}{Url.trainers($trainer.info.readKey)}" disabled copiable />
				</p>
				<p>The <strong>Edit Access Link</strong> allows the other player or device to edit the trainer and their pokémon. This kind of transfer is useful for managing a trainer on multiple devices, or allowing the DM to hand over control of a pre-made player character.</p>
				<p>
					<PasswordField label="Edit Access Link" value="{domain}{Url.trainers($trainer.info.readKey, undefined, undefined, $trainer.writeKey)}" disabled copiable />
				</p>
			</section>
		{/if}
		<section>
			{#if canEdit}<h2>Access Key</h2>{/if}
			<p>A trainer's <dfn>Access Key</dfn> is a special code that allows you to manage a trainer's info and their pokemon. Each trainer has a unique key, and the key must be saved to each device from which you want to manage the trainer.</p>
		</section>
		{#if canEdit}
			<section>
				<p>You currently have {name}'s access key saved to this device. To share this key, press Show below.</p>
				<PasswordField label="Access Key" value={$trainer.writeKey} disabled copiable />
			</section>
		{:else}
			<Saveable saving={searching} caption="Searching...">
				<section>
					<p>You currently do not have permission to manage {name}. To obtain permission, put {name}'s access key into the field below and press Submit.</p>
					<form on:submit|preventDefault={verify} class="vertical spaced-lg">
						<WithButton label="Submit" type="submit">
							<TextField label="Access Key" bind:value={accessKey} placeholder="e.g. JM7WEZ0YKW3WGC8I" disabled={searching} required />
						</WithButton>
						{#if couldNotFind.length > 0 && couldNotFind === accessKey}
							<p class="font-sm error">The provided access key does match this trainer's key</p>
						{/if}
					</form>
				</section>
				<hr />
				<section>
					<p>If you are managing {name} from another device, you can find their access key from the trainer's page, or conduct a link-based transfer.</p>
					<figure class="spaced-lg">
						<img src={findTransfer} alt="'Transfer' is a button at the bottom of the trainer's page." width="800" height="250" />
						<figcaption>Click this button to get the access key</figcaption>
					</figure>
				</section>
			</Saveable>
		{/if}
		<ActionArea>
			<Button href="{Url.trainers($trainer?.info.readKey)}" variant="ghost">Go Back</Button>
		</ActionArea>
	{/if}
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