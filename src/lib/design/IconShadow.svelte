<div class="window" aria-hidden="true">
	<div class="icon-shadow" data-transition-name="backicon">
		<slot></slot>
	</div>
</div>

<style>
	.window {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		overflow: hidden;
	}

	.icon-shadow {
		--skin-local-stroke: var(--skin-content);
		position: absolute;
		bottom: 0;
		right: 0;
		width: 50vmax;
		transform: rotate(var(--skew-angle)) translate(15%, 25%);
		transform-origin: center center;
		view-transition-name: backicon;
	}
</style>