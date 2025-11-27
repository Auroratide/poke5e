<script lang="ts">
	export let selected: boolean = false
</script>

<tab-item {selected} for={$$props.for}>
	<span class="mute-if-not-selected">
		<slot></slot>
	</span>
</tab-item>

<style>
	tab-item {
		flex: 1;
		border: none;
		background: none;
		padding: 0.25em 0.75em;
		text-align: center;
		border-radius: 0.25em;
	}

	tab-item:not([selected]) .mute-if-not-selected {
		opacity: 0.8;
	}

	tab-item:not([selected]):hover .mute-if-not-selected,
	tab-item:not([selected]):focus .mute-if-not-selected {
		opacity: 1;
	}

	tab-item[selected] {
		background: var(--skin-bg);
		color: var(--skin-bg-text);
		font-weight: bold;
	}
</style>
