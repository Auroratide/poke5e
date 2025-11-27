<script lang="ts">
	import { PokeballIcon } from "$lib/ui/icons"

	export let caption: string | undefined = undefined
</script>

<div class="loader">
	<div class="icon">
		<PokeballIcon label={caption ?? "Loading"} />
	</div>
	{#if caption}
		<p>{caption}</p>
	{/if}
</div>

<style>
	.loader {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		animation: fade 3s ease-in-out infinite;
	}

	.icon {
		color: var(--skin-local-color, var(--skin-content));
		font-size: var(--font-sz-jupiter);
		width: 3em;
		height: 3em;
		animation: spin 2s linear infinite;
	}

	p {
		color: var(--skin-local-color, var(--skin-content));
		font-size: 1.25em;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	@keyframes fade {
		0% { opacity: 0.25; }
		50% { opacity: 0.75; }
		100% { opacity: 0.25; }
	}
</style>