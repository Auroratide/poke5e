<script lang="ts">
    export let theme: 'blue' | 'red'
</script>

<!-- theme colors defined with css variables -->
<div class="theme theme-{theme}">
    <slot></slot>
</div>

<style>
    .theme {
        height: 100%;
    }
</style>