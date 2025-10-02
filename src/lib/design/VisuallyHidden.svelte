<script lang="ts">
	export let inline = false
</script>

{#if inline}
	<span class="visually-hidden">
		<slot></slot>
	</span>
{:else}
	<div class="visually-hidden">
		<slot></slot>
	</div>
{/if}
