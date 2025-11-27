<script lang="ts">
	import { Card } from "$lib/ui/page"
	import { ActionArea, PasswordField, TextField, WithButton, Saveable } from "$lib/ui/forms"
	import { Button } from "$lib/ui/elements"
	import { Url } from "$lib/url"
	import { Title } from "$lib/ui/layout"
	import findAccessKey from "./assets/access-key.webp"
	import type { SingleFakemonStore } from "../store"
	
	export let fakemon: SingleFakemonStore

	let accessKey = ""
	$: accessKey = accessKey.toLocaleUpperCase().replace(/[^a-zA-Z0-9]/g, "")

	let searching = false
	let couldNotFind = ""
	let success = false
	const verify = () => {
		searching = true
		fakemon.verifyAccess(accessKey).then((isVerified) => {
			if (isVerified) {
				success = true
			} else {
				couldNotFind = accessKey
			}
		}).finally(() => {
			searching = false
		})
	}

	$: name = $fakemon?.value.species.data.name ?? ""
	$: canEdit = $fakemon?.update != null
</script>

<Title value="{name}'s Access Key" />
<Card title="{name}'s Access Key">
	{#if success}
		<section>
			<p><strong>Success!</strong></p>
			<p>You can now manage {name}.</p>
			<ActionArea>
				<Button href="{Url.fakemon($fakemon?.value.data.readKey)}">Go to Fakémon's Page</Button>
			</ActionArea>
		</section>
	{:else}
		<section>
			<p>A fakémon's <dfn>Access Key</dfn> is a special code that allows you to manage the fakémon's info. Each fakémon has a unique key, and the key must be saved to each device from which you want to manage the fakémon.</p>
		</section>
		{#if canEdit}
			<section>
				<p>You currently have {name}'s access key saved to this device. To share this key, press Reveal below.</p>
				<PasswordField label="Access Key" value={$fakemon.value.data.writeKey} disabled />
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
							<p class="font-sm error">The provided access key does match this fakémon's key</p>
						{/if}
					</form>
				</section>
				<hr />
				<section>
					<p>If you are managing {name} from another device, you can find their access code from the fakémon's page.</p>
					<figure class="spaced-lg">
						<img src={findAccessKey} alt="'Access Key' is a button at the bottom of the fakémon's page." width="1172" height="307" />
						<figcaption>Click this button to get the access key</figcaption>
					</figure>
				</section>
			</Saveable>
		{/if}
		<ActionArea>
			<Button href="{Url.fakemon($fakemon?.value.data.readKey)}" variant="ghost">Go Back</Button>
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