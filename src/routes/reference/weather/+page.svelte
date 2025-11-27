<script>
	import ReferencePage from "../ReferencePage.svelte"
	import Rules2018 from "./2018"
	import Rules2024 from "./2024"
	import { rulesVersion } from "$lib/site/rules-version"
</script>

<ReferencePage title="Weather">
	<section>
		<p>Weather plays a significant role on most Pokémon journeys. Many Pokémon have abilities that are affected by the surrounding weather or terrain, and weather can impact the power of certain Pokémon types.</p>
		{#if $rulesVersion === "2018"}
			<Rules2018.WeatherTable />
		{:else}
			<Rules2024.WeatherTable />
		{/if}
	</section>
</ReferencePage>
