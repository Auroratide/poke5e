<script lang="ts">
	import { DragIcon } from "../icons"
</script>

<reorder-handle class="drag-container">
	<span class="drag-icon"><DragIcon /></span>
</reorder-handle>

<style>
	.drag-container {
		padding: 0.5em;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.drag-container:hover .drag-icon {
		opacity: 1;
	}

	.drag-icon {
		display: flex;
		inline-size: 1.5em;
		opacity: 0.667;
		align-items: center;
		justify-content: center;
	}
</style>
