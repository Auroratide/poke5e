<script lang="ts">
	export let hasImage: boolean = false
</script>

<section class="info column lg:row">
	<div style:flex="1" style:width="100%">
		<slot></slot>
	</div>
	{#if hasImage}
		<div style:--size="clamp(8rem, 12.66vw, 9.5rem)" class="square-image">
			<slot name="art"></slot>
		</div>
	{/if}
</section>

<style>
	section {
		margin-bottom: 0.5em;
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	@media screen and (min-width: 37.5rem) {
		.lg\:row {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
		}
	}

	.square-image {
		width: var(--size);
		height: var(--size);
		padding: 0.5rem 0 0.5rem 1rem;
	}
</style>