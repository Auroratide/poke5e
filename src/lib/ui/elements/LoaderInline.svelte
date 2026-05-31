<script>
	import VisuallyHidden from "./VisuallyHidden.svelte"
	import { m } from "$lib/site/i18n"

</script>
<span class="loader-inline">
	<VisuallyHidden>{m.loading()}</VisuallyHidden>
	<span>.</span>
	<span>.</span>
	<span>.</span>
</span>
