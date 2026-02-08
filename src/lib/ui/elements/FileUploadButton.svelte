<script lang="ts">
	import VisuallyHidden from "./VisuallyHidden.svelte";

	export let id: string
	export let variant: "solid" | "ghost" | "danger" | "success" | "subtle" | "big" = "solid"
	export let align: "center" | "left" = "center"
	export let width: "auto" | "full" = "auto"
	export let disabled: boolean = false
	export let accept: string | undefined = undefined
</script>

<label class="button {variant} {align} {width}" class:disabled for="{id}"><slot></slot></label>
<VisuallyHidden inline>
	<input {id} type="file" on:change {accept} {disabled} />
</VisuallyHidden>

<style>
	.button {
		display: inline-block;
		position: relative;
		border-radius: 1.5em;
		border: none;
		padding: 0.25em 0.75em;
		cursor: pointer;
		text-decoration: none;
		line-height: 1.2;
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

	.button.subtle {
		background-color: var(--skin-input-bg);
		color: var(--skin-bg-dark);
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

	.button.success {
		background-color: var(--skin-success-bg);
		color: var(--skin-bg-text);
	}

	.button.big {
		position: relative;
		display: block;
		inline-size: min(15em, 100%);
		padding: 1em 1.25em;
		font-size: var(--font-sz-uranus);
		overflow: hidden;
		background-color: var(--skin-content);
		border-radius: 2em;
		box-shadow: var(--elev-cirrus);
		margin-inline: auto;
		text-decoration: none;
		color: var(--skin-content-text);
		text-align: center;
	} .button.big:hover::before, .button.big:hover::after, .button.big:focus::before, .button.big:focus::after {
		content: none;
	} .button.big:hover, .button.big:focus {
		background-color: var(--skin-bg);
		color: var(--skin-bg-text);
	}

	.button.left {
		text-align: left;
	}

	.button.full {
		display: inline-block;
		width: 100%;
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