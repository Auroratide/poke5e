<script lang="ts">
	import { Url } from "$lib/site/url"
	import { Button } from "$lib/ui/elements"
	import { ActionArea } from "$lib/ui/forms"
	import { Title } from "$lib/ui/layout"
	import { Card } from "$lib/ui/page"
	import type { TrainerStore } from "../trainers"
	import type { PokemonId } from "../types"
	import { m } from "$lib/site/i18n"

	export let trainer: TrainerStore
	export let id: PokemonId

	$: canEdit = $trainer.update != null
	$: pokemon = $trainer.pokemon.find((it) => it.id === id)
</script>

<Title value="Transfer Pokemon" />
<Card title="Transfer {pokemon?.nickname} to another trainer">
	{#if canEdit}
		<section>
			<p>This let's you transfer a <em>copy</em> of this pokémon to another Trainer. There are two different ways to do this:</p>
			<ol>
				<li>Choose another trainer you own.</li>
				<li>Share a Transfer Code with a friend.</li>
			</ol>
		</section>
		<section>
			<h2>Choose a Trainer</h2>
			<p>This works if you own the trainer you are transfering to.</p>
			<p>(list trainers for which we have the write key, maybe as a select field)</p>
			<p>(confirmation button)</p>
		</section>
		<section>
			<h2>Share a Transfer Code</h2>
			<p>Use this if the trainer you are transfering to is owned by someone else.</p>
			<p>(A field which activates or deactivates the transfer code)</p>
			<p>(a way to copy it)</p>
		</section>
	{:else}
		<section>
			<p>You do not have permission to transfer this trainer's pokémon.</p>
		</section>
	{/if}
	<ActionArea>
		<Button href="{Url.trainers($trainer.info.readKey, id)}">{m.back()}</Button>
	</ActionArea>
</Card>
