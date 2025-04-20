<script lang="ts">
	import Card from "$lib/design/Card.svelte"
	import type { TrainerStore } from "../trainers"
	import Saveable from "$lib/design/Saveable.svelte"
	import { ActionArea, PasswordField, TextField, WithButton } from "$lib/design/forms"
	import Button from "$lib/design/Button.svelte"
	import { Url } from "$lib/url"
	import Title from "$lib/design/Title.svelte"
	import findAccessKey from "$lib/assets/find-access-key.png"
	
	export let trainer: TrainerStore

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

<Title value="{name}'s Access Key" />
<Card title="{name}'s Access Key">
	{#if success}
		<section>
			<p><strong>Success!</strong></p>
			<p>You can now manage {name} and their pokemon.</p>
			<ActionArea>
				<Button href="{Url.trainers($trainer?.info.readKey)}">Go to Trainer's Page</Button>
			</ActionArea>
		</section>
	{:else}
		<section>
			<p>A trainer's <dfn>Access Key</dfn> is a special code that allows you to manage a trainer's info and their pokemon. Each trainer has a unique key, and the key must be saved to each device from which you want to manage the trainer.</p>
		</section>
		{#if canEdit}
			<section>
				<p>You currently have {name}'s access key saved to this device. To share this key, press Reveal below.</p>
				<PasswordField label="Access Key" value={$trainer.writeKey} disabled />
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
					<p>If you are managing {name} from another device, you can find their access code from the trainer's page.</p>
					<figure class="spaced-lg">
						<img src={findAccessKey} alt="'Access Key' is a button at the bottom of the trainer's page." width="800" height="250" />
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