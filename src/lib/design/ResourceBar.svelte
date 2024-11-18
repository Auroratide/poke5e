<script lang="ts">
	import VisuallyHidden from "./VisuallyHidden.svelte"

	export let current: number
	export let max: number
	export let secondary: boolean = false

	$: percentage = Math.max(100 * current / max, 0)
	$: status = percentage >= 50 ? "healthy" : percentage >= 20 ? "warning" : "danger"
</script>

<div role="meter" aria-valuenow="{current}" aria-valuemin="0" aria-valuemax="{max}" aria-valuetext="{current} / {max}" class:secondary class="meter {status}">
	<div class="bar" style:inline-size="{Math.max(100 * current / max, 0)}%"></div>
</div>

<style>
	.meter {
		display: block;
		background-color: var(--skin-bar-bg);
		inline-size: 100%;
		block-size: 0.5em;
		overflow: hidden;
	}

	.bar {
		background-color: var(--skin-local-fill);
		block-size: 0.5em;
	}

	.healthy {
		--skin-local-fill: var(--skin-bar-healthy);
	}

	.warning {
		--skin-local-fill: var(--skin-bar-warning);
	}

	.danger {
		--skin-local-fill: var(--skin-bar-danger);
	}

	.meter.secondary {
		--skin-local-fill: var(--skin-bar-secondary);
	}
</style>