<script lang="ts">
	import type { Attribute } from "$lib/dnd/attributes"

	export let index: number
	export let name: string
	export let increase: Attribute | "ac"
	export let decrease: Attribute | "ac"
</script>

<tr>
	<td>{index + 1}</td>
	<td><strong>{name}</strong></td>
	<td class="upper">+{#if increase === "ac"}1{:else}2{/if} {increase}</td>
	<td class="upper">-{#if decrease === "ac"}1{:else}2{/if} {decrease}</td>
</tr>
