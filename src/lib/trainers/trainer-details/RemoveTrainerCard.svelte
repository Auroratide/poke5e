<script lang="ts">
	import { Card } from "$lib/ui/page"
	import type { TrainerStore } from "../trainers"
	import { ActionArea, Saveable } from "$lib/ui/forms"
	import { Button } from "$lib/ui/elements"
	import { Url } from "$lib/url"
	import { Title } from "$lib/ui/layout"
	import { goto } from "$app/navigation"
	
	export let trainer: TrainerStore

	let saving = false
	const remove = () => {
		saving = true
		$trainer.remove().then(() => {
			goto(Url.trainers())
		}).catch(() => {
			saving = false
		})
	}

	$: name = $trainer?.info.name ?? ""
</script>

<Title value="Remove {name}?" />
<Card title="Remove {name}?">
	<Saveable {saving}>
		<section>
			<p>Are you sure you want to remove {name}? This will remove {name} from your list of trainers.</p>
			<p>This is not a permanent removal. The trainer can still be accessed via their access code, and they will continue to exist on other devices' lists until removed from those devices explicitly.</p>
			<ActionArea>
				<Button href="{Url.trainers($trainer?.info.readKey)}" variant="ghost">Cancel</Button>
				<Button on:click={remove} variant="danger">Remove</Button>
			</ActionArea>
		</section>
	</Saveable>
</Card>