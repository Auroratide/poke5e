<div class="window" aria-hidden="true">
    <div class="backdrop"></div>
</div>

<style lang="scss">
    .window {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        overflow: hidden;
    }

    .backdrop {
        position: absolute;
        top: 0;
        right: calc(50% + 8rem);
        bottom: 0;
        left: -1000rem;
        transform: skewX(var(--skew-angle));
        border-left: 10rem solid var(--theme-dark);
        border-right: 10rem solid var(--theme-dark);
        background-color: var(--theme-main);
        box-shadow: var(--elev-cirrus);
    }
</style>