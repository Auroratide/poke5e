<script lang="ts">
	import { error } from "./store"

	const close = () => error.hide()
</script>

<dialog open={$error.hasError} aria-label="Something went wrong">
	<section>
		<p><strong>Something went wrong...</strong></p>
		<p class="font-sm">{$error.message}</p>
		<p class="font-sm">You can help by <a href="https://github.com/Auroratide/poke5e/issues/new">reporting this error</a>!</p>
	</section>
	<button on:click={close} class="close" aria-label="close" title="close">&times;</button>
</dialog>

<style>
	dialog {
		position: fixed;
		bottom: 2rem;
		right: -1.5rem;
		left: unset;
		border: none;
		border-right: 1.5rem solid var(--skin-danger-bg);
		background-color: var(--skin-danger-light);
		width: 28rem;
		max-width: 95vw;
		box-shadow: var(--elev-cirrus);
		padding: 0.75rem;
		opacity: 0;
		display: block;
		transition: opacity 0.25s ease-out, right 0.25s ease-out;
		pointer-events: none;
		z-index: 9;
	}

	dialog[open] {
		opacity: 1;
		right: 0;
		pointer-events: inherit;
	}

	.font-sm {
		font-size: var(--font-sz-venus);
	}

	p {
		margin-bottom: 0.5em;
	}

	p:last-child {
		margin: 0;
	}

	.close {
		border: none;
		background: none;
		border-radius: 0.5rem;
		font-size: var(--font-sz-neptune);
		cursor: pointer;
		display: block;
		width: 2rem;
		height: 2rem;
		position: absolute;
		top: 0.25rem;
		right: 0.25rem;
	}

	.close:hover, .close:focus {
		background: var(--skin-input-bg);
	}
</style>