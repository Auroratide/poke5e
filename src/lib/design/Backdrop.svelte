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
        height: 100vh;
        transform: skewX(-20deg);
        border-left: 10rem solid #31aaa5;
        border-right: 10rem solid #31aaa5;
        background-color: #35c1c0;
        width: 100%;
        min-width: 50rem;
    }
</style>