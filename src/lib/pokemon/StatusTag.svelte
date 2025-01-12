<script lang="ts">
	import { NonVolatileStatus } from "./status"

	export let value: NonVolatileStatus
	export let abbr = false

	$: description = NonVolatileStatus[value]
	$: name = value === "BadlyPoisoned" ? NonVolatileStatus.Poisoned.name : description.name
</script>

<span
	class="status-tag"
	title="{description.effect}"
	style:--skin-bg-local="var(--skin-status-{value.toLocaleLowerCase()})"
>{#if abbr} {description.abbr} {:else} {name} {/if}</span>

<style>
	.status-tag {
		display: inline-block;
		text-transform: uppercase;
		letter-spacing: -0.1ch;
		cursor: help;
		background: var(--skin-bg-local);
		color: var(--skin-status-text);
		box-shadow: var(--elev-stratus);
		padding: 0.0625em 0.125em;
	}
</style>
