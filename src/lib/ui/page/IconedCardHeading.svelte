<div class="row">
	<h3 class="no-margin"><slot></slot></h3>
	<span aria-hidden="true"><slot name="icon"></slot></span>
</div>

<style>
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-block-end: 0.5em;
	}

	h3.no-margin { margin: 0; }
</style>
