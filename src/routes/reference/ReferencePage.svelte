<script lang="ts">
	import Card from "$lib/design/Card.svelte"
	import { RulesVersionToggle } from "$lib/design/rules-version"
	import Title from "$lib/design/Title.svelte"

	export let title: string
</script>

<Title value="{title}" />
<Card title="{title}">
	<RulesVersionToggle slot="header-extra" />
	<slot></slot>
</Card>
