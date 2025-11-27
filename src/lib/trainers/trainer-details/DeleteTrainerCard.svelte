<script lang="ts">
	import Card from "$lib/design/Card.svelte"
	import type { TrainerStore } from "../trainers"
	import Saveable from "$lib/design/Saveable.svelte"
	import { ActionArea } from "$lib/ui/forms"
	import { Button } from "$lib/ui/elements"
	import { Url } from "$lib/url"
	import { Title } from "$lib/ui/layout"
	import { goto } from "$app/navigation"
	
	export let trainer: TrainerStore

	let saving = false
	const retire = () => {
		saving = true
		$trainer.update?.retire().then(() => {
			goto(Url.trainers())
		}).catch(() => {
			saving = false
		})
	}

	$: name = $trainer?.info.name ?? ""
	$: canEdit = $trainer.update != null
</script>

<Title value="Retire {name}?" />
<Card title="Retire {name}?">
	{#if canEdit}
		<Saveable {saving}>
			<section>
					<p>Are you sure you want to retire {name}? This will delete all of their data, including all of their pokemon, from our records.</p>
					<p><strong>This is permanent and cannot be undone!</strong></p>
					<ActionArea>
						<Button href="{Url.trainers($trainer?.info.readKey)}" variant="ghost">Cancel</Button>
						<Button on:click={retire} variant="danger">Delete</Button>
					</ActionArea>
			</section>
		</Saveable>
	{:else}
		<section>
			<p>You do not have permission to retire this trainer.</p>
			<ActionArea>
					<Button href="{Url.trainers($trainer?.info.readKey)}">Go Back</Button>
			</ActionArea>
		</section>
	{/if}
</Card>