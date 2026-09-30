<script lang="ts">
	import { Card } from "$lib/ui/page"
	import { EditionToggle } from "$lib/site/edition"
	import { Title } from "$lib/ui/layout"
	import { Url } from "$lib/site/url"

	export let title: string
</script>

<Title value="{title}" />
<Card title="{title}" dismissToHref="{Url.rules.all()}">
	<EditionToggle slot="header-extra" />
	<slot></slot>
</Card>
