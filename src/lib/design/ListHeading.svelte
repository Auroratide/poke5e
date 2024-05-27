<script lang="ts">
	export let title: string
</script>

<div class="flex-column space-bottom">
	<p class="large-font space-bottom">{title}</p>
	<div class="flex-row space-between">
		<p class="indent small-font no-space">
			<slot name="link"></slot>
		</p>
		<slot name="action"></slot>
	</div>
</div>

<style>
	.flex-row {
		display: flex;
		align-items: center;
	}

	.space-between {
		justify-content: space-between;
	}

	.space-bottom {
		margin-bottom: 0.25em;
	}

	.large-font {
		font-size: var(--font-sz-neptune);
		font-weight: bold;
	}

	.small-font {
		font-size: var(--font-sz-venus);
	}

	.indent {
		text-indent: 1em;
	}

	.no-space {
		margin: 0;
	}
</style>