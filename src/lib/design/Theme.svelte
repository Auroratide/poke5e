<script lang="ts" context="module">
    export type ThemeColor = 'blue' | 'red' | 'purple' | 'green'
</script>

<script lang="ts">
    export let theme: ThemeColor
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