<script lang="ts">
    export let primary = false
</script>

<!-- svelte-ignore a11y-no-redundant-roles -->
<td role="cell" class:primary>
    <slot></slot>
</td>
