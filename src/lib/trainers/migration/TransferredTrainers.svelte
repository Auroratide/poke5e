<script lang="ts">
	import type { TrainerListStore } from "../trainers"
	import Button from "$lib/design/Button.svelte"
	import { OLD_ORIGIN } from "./origins"

	export let trainers: TrainerListStore

	$: trainerNames = $trainers.map((it) => it.name)
</script>

{#if trainerNames.length === 0}
	<p class="success">Found no trainers to transfer. You may now close this dialog. Or, if this is wrong, you may have to manually transfer your trainer IDs.</p>
	<form method="dialog">
		<div class="center">
			<Button href="{OLD_ORIGIN}/storage-migration/poke5e">View Trainer IDs</Button>
			<Button type="submit">Finish</Button>
		</div>
	</form>
{:else}
	<p class="success">Successfully transferred {trainerNames.join(", ")}! You may now close this dialog.</p>
	<form method="dialog">
		<div class="center"><Button type="submit">Finish</Button></div>
	</form>
{/if}

<style>
	.success { color: var(--skin-success-text); }
	p { line-height: 1.4; }
	.center {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 1em;
	}
</style>