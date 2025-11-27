<script lang="ts">
	import { Card } from "$lib/ui/page"
	import { RulesVersionToggle } from "$lib/site/rules-version"
	import { Title } from "$lib/ui/layout"

	export let title: string
</script>

<Title value="{title}" />
<Card title="{title}">
	<RulesVersionToggle slot="header-extra" />
	<slot></slot>
</Card>
