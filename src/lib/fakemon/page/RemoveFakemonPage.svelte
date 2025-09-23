<script lang="ts">
	import Card from "$lib/design/Card.svelte"
	import Saveable from "$lib/design/Saveable.svelte"
	import { ActionArea } from "$lib/design/forms"
	import Button from "$lib/design/Button.svelte"
	import { Url } from "$lib/url"
	import Title from "$lib/design/Title.svelte"
	import { goto } from "$app/navigation"
	import type { SingleFakemonStore } from "../store"
	
	export let fakemon: SingleFakemonStore

	let saving = false
	const remove = () => {
		saving = true
		fakemon.remove().then(() => {
			goto(Url.fakemon())
		}).catch(() => {
			saving = false
		})
	}

	$: name = $fakemon?.value.data.species.name ?? ""
</script>

<Title value="Remove {name}?" />
<Card title="Remove {name}?">
	<Saveable {saving}>
		<section>
			<p>Are you sure you want to remove <strong>{name}</strong>? This will remove {name} from your list of fakémon.</p>
			<p>This is not a permanent removal. The fakémon can still be accessed via their access code, and they will continue to exist on other devices' lists until removed from those devices explicitly.</p>
			<ActionArea>
				<Button href="{Url.fakemon($fakemon?.value.data.readKey)}" variant="ghost">Cancel</Button>
				<Button on:click={remove} variant="danger">Remove</Button>
			</ActionArea>
		</section>
	</Saveable>
</Card>