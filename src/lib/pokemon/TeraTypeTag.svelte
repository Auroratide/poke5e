<script lang="ts">
	import type { TeraPokeType } from "./types"

	export let type: TeraPokeType
</script>

<span class="tera-type-tag" style:--skin-local-bg="var(--skin-{type}-bg)">
   {type}
</span>

<style>
   .tera-type-tag {
      --inset-amount: 0.25em;
      display: inline-block;
      background: var(--skin-local-bg);
      color: var(--skin-bg-text);
      text-transform: capitalize;
      box-shadow: 0 -0.667em 0 0em oklch(0% 0 0 / 0.2) inset;
      padding: 0.0625em 0.5em;
      clip-path: polygon(var(--inset-amount) 0%, calc(100% - var(--inset-amount)) 0%, 100% 50%, calc(100% - var(--inset-amount)) 100%, var(--inset-amount) 100%, 0% 50%);
   }
</style>
