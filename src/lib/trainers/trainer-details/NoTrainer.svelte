<script lang="ts">
	import type { ReadWriteKey } from "../types"
	import { Url } from "$lib/url"

	export let trainerKey: ReadWriteKey
</script>

<h1 class="large-font space-bottom bubble-padded">Cannot find trainer</h1>
<p class="bubble-padded">No trainer with id <strong>{trainerKey}</strong> seems to be registered.</p>
<p class="bubble">You can view a <a href="{Url.trainers()}">list of your trainers</a> or search by trainer id.</p>

<style>
	.large-font {
		font-size: var(--font-sz-neptune);
		font-weight: bold;
	}

	.space-bottom {
		margin-bottom: 1em;
	}

	.bubble {
		background: var(--skin-content);
		padding: 0.5rem 1rem;
		border-radius: 2em;
		box-shadow: var(--elev-cumulus);
	}

	.bubble-padded {
		padding-inline: 1rem;
	}
</style>