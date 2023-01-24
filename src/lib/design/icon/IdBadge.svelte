<script>
    export let label = 'Id Badge'
</script>

<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <title>{label}</title>
    <rect class="stroke" x="15" y="10" width="70" height="80" rx="10" />
    <line class="stroke" x1="50" y1="77" x2="75" y2="77" />
    <line class="stroke thin" x1="15" y1="70" x2="85" y2="60" />
    <circle class="stroke thin" cx="50" cy="34" r="10" />
</svg>

<style>
    .stroke {
        fill: none;
        stroke: var(--skin-local-stroke);
        stroke-width: 8;
    }

    .stroke.thin {
        stroke-width: 5;
    }
</style>