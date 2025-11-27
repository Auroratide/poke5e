<script lang="ts">
	export let hasImage: boolean = false
	export let size = "clamp(8rem, 12.66vw, 9.5rem)"
</script>

<section class="info column lg:row">
	<div style:flex="1" style:width="100%">
		<slot></slot>
	</div>
	{#if hasImage}
		<div class="column">
			<div style:--size="{size}" class="square-image">
				<slot name="art"></slot>
			</div>
			<slot name="after-art"></slot>
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
		gap: 0.5em;
	}

	@media screen and (min-width: 70rem) {
		.lg\:row {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
		}
	}

	.square-image {
		width: var(--size);
		height: var(--size);
		padding: 0;
	}
</style>