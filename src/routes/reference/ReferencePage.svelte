<script lang="ts">
	import { Card } from "$lib/ui/page"
	import { RulesVersionToggle } from "$lib/site/rules-version"
	import { Title } from "$lib/ui/layout"
	import { Url } from "$lib/site/url"

	export let title: string
</script>

<Title value="{title}" />
<Card title="{title}" dismissToHref="{Url.reference.all()}">
	<RulesVersionToggle slot="header-extra" />
	<slot></slot>
</Card>
