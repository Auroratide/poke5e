<script lang="ts">
	export let primary = false
	export let cellVisibility: {
		largeScreenOnly: boolean,
		lastVisibleCell: boolean,
	}
</script>

<td role="cell" class:primary class:large-screen-only={cellVisibility.largeScreenOnly} class:last-visible-cell={cellVisibility.lastVisibleCell}>
	<slot></slot>
</td>

<style>
	@media screen and (max-width: 75rem) {
		.large-screen-only {
			display: none;
		}

		.last-visible-cell {
			border-top-right-radius: 1em;
			border-bottom-right-radius: 1em;
		}
	}
</style>