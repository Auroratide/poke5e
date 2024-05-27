<script lang="ts">
	import type { PageData } from "./$types"
	import Layout from "./_layout.svelte"
	import TmList from "$lib/moves/TmList.svelte"
	import Title from "$lib/design/Title.svelte"

	export let data: PageData
	$: tms = data.tms
</script>

<Title value="TMs" />
<Layout>
	<TmList slot="list" tms={tms} />
</Layout>
