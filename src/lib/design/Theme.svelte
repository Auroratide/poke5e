<script lang="ts">
    export let theme: 'blue' | 'red'
</script>

<div class="theme theme-{theme}">
    <slot></slot>
</div>

<style>
    .theme {
        height: 100%;
    }

    .theme-blue {
        --theme-main: hsl(180, 57%, 48%);
        --theme-dark: hsl(178, 55%, 43%);
        --theme-text: hsl(176, 60%, 32%);
    }

    .theme-red {
        --theme-main: hsl(355, 72%, 53%);
        --theme-dark: hsl(355, 66%, 45%);
        --theme-text: hsl(355, 66%, 45%);
    }
</style>