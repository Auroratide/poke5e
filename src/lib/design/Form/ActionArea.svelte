<div class="gap-between-items to-right padding-preventing-overflow">
    <slot></slot>
</div>

<style>
    .gap-between-items {
        display: flex;
        gap: 0.5em;
    }

    .to-right {
        justify-content: flex-end;
    }

    .padding-preventing-overflow {
        padding: 0 1em 1em;
    }
</style>
