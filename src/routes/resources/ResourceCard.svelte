<script lang="ts">
	import { Button } from "$lib/ui/elements"
	import { Card } from "$lib/ui/page"
	import { Markdown } from "$lib/ui/rendering"
	import type { Resource } from "./Resource"

	let {
		value,
	}: {
		value: Resource,
	} = $props()
</script>

<Card title={value.name} level={2} inline>
	<section>
		<Markdown value={value.description} />
		<div class="call-to-action">
			<Button href={value.href}>{value.cta} ↗</Button>
		</div>
		<figure>
			<img-zoom>
				<img src={value.img} alt={value.alt} />
			</img-zoom>
			<figcaption>{value.caption}</figcaption>
		</figure>
		<Markdown value={value.details} />
	</section>
</Card>

<style>
	.call-to-action {
		font-size: var(--font-sz-neptune);
		text-align: center;
		margin-block: 2em;
	}
</style>