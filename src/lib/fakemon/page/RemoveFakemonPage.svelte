<script lang="ts">
	import { Card } from "$lib/ui/page"
	import { ActionArea, Saveable } from "$lib/ui/forms"
	import { Button } from "$lib/ui/elements"
	import { Url } from "$lib/site/url"
	import { Title } from "$lib/ui/layout"
	import { goto } from "$app/navigation"
	import type { SingleFakemonStore } from "../store"
	import { m } from "$lib/site/i18n"
	
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
				<Button href="{Url.fakemon($fakemon?.value.data.readKey)}" variant="ghost">{m.cancel()}</Button>
				<Button on:click={remove} variant="danger">{m.remove()}</Button>
			</ActionArea>
		</section>
	</Saveable>
</Card>