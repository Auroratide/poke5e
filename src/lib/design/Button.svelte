<script lang="ts">
	export let variant: "solid" | "ghost" | "danger" = "solid"
	export let type: "submit" | "button" | "reset" = "button"
	export let align: "center" | "left" = "center"
	export let width: "auto" | "full" = "auto"
	export let disabled: boolean = false
	export let href: string | undefined = undefined
</script>

{#if href != null}
	<a {href} on:click class="button {variant} {align} {width}" class:disabled>
		<slot></slot>
	</a>
{:else}
	<button on:click {type} class="button {variant} {align} {width}" {disabled}>
		<slot></slot>
	</button>
{/if}

<style>
	.button {
		position: relative;
		border-radius: 1.5em;
		border: none;
		padding: 0.25em 0.75em;
		cursor: pointer;
		text-decoration: none;
	}

	.button:hover::before, .button:focus::before {
		content: '>';
		color: var(--skin-bg-dark);
		font-weight: 900;
		position: absolute;
		top: -0.28em;
		left: -0.325em;
		font-size: 2.5em;
		-webkit-text-stroke: 0.03em var(--skin-bg-text);
	}

	.button:active::before {
		left: -0.27em;
	}

	.button.solid {
		background-color: var(--skin-bg-dark);
		color: var(--skin-bg-text);
	}

	.button.ghost {
		background-color: transparent;
		color: var(--skin-bg-dark);
	}

	.button.ghost:hover,
	.button.ghost:focus,
	.button.ghost:active {
		background-color: var(--skin-input-bg);
	}

	.button.danger {
		background-color: var(--skin-danger-bg);
		color: var(--skin-bg-text);
	}

	.button.left {
		text-align: left;
	}

	.button.full {
		width: 100%;
	}

	a.button.disabled {
		pointer-events: none;
	}

	.button:disabled,
	.button.disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.button:disabled:hover::before,
	.button:disabled:focus::before,
	.button:disabled:active::before,
	.button.disabled:hover::before,
	.button.disabled:focus::before,
	.button.disabled:active::before {
		display: none;
	}
</style>