<script lang="ts">
	import type { Gender } from "../trainers/types"
	export let gender: Gender
</script>

<span class="gender {gender}" title="{gender}" aria-label="{gender}"></span>

<style>
	.gender {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.25em;
		height: 1.25em;
		background-color: var(--skin-local-bg);
		border-radius: 1em;
		font-size: 75%;
		line-height: 1;

		&::before {
			color: var(--skin-gender-text);
			font-weight: bold;
		}
	}

	.male {
		--skin-local-bg: var(--skin-male-bg);

		&::before {
			content: '♂';
		}
	}

	.female {
		--skin-local-bg: var(--skin-female-bg);

		&::before {
			content: '♀';
		}
	}

	.none, .other {
		display: none;
	}
</style>