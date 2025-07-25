<script lang="ts">
	import type { PokemonTeraType } from "./PokemonTeraType"

	export let type: PokemonTeraType
</script>

<span class="tera-type-tag" style:--skin-local-bg="var(--skin-{type.data}-bg)">
   {type.data}
</span>

<style>
   .tera-type-tag {
      --inset-amount: 0.25em;
		--s1: 0.25em;
		--s2: 0.11em;
      display: inline-block;
      background: var(--skin-local-bg);
      color: var(--skin-bg-text);
      text-transform: capitalize;
      box-shadow: 0 -0.667em 0 0em oklch(0% 0 0 / 0.2) inset;
      padding: 0.0625em 0.625em;
		clip-path: polygon(
			calc(var(--inset-amount) + var(--s2)) var(--s1),
			var(--inset-amount) 0%,
			calc(var(--inset-amount) + var(--s1)) var(--s2),

			calc(100% - var(--inset-amount) - var(--s1)) var(--s2),
			calc(100% - var(--inset-amount)) 0%,
			calc(100% - var(--inset-amount) - var(--s2)) var(--s1),

			calc(100% - var(--s1)) calc(50% - var(--s2)),
			100% 50%,
			calc(100% - var(--s1)) calc(50% + var(--s2)),

			calc(100% - var(--inset-amount) - var(--s2)) calc(100% - var(--s1)),
			calc(100% - var(--inset-amount)) 100%,
			calc(100% - var(--inset-amount) - var(--s1)) calc(100% - var(--s2)),

			calc(var(--inset-amount) + var(--s1)) calc(100% - var(--s2)),
			var(--inset-amount) 100%,
			calc(var(--inset-amount) + var(--s2)) calc(100% - var(--s1)),

			var(--s1) calc(50% + var(--s2)),
			0% 50%,
			var(--s1) calc(50% - var(--s2))
		);
   }
</style>
