<script lang="ts">
	import { StaticPage } from "$lib/ui/layout"
	import { MaintenanceStore } from "./MaintenanceStore"
	import { DateFormatter } from "./DateFormatter"
	import { FeatureToggles } from "$lib/site/FeatureToggles"
	import MaintenanceImg from "./gurdurr.png"
</script>

{#if !FeatureToggles.OverrideMaintenance() && $MaintenanceStore.status === "inprogress"}
	<StaticPage title="Undergoing maintenance!">
		<p>This part of the website is temporarily unavailable until scheduled maintenance is complete. Maintenance started at {DateFormatter.format($MaintenanceStore.scheduledStart)} and is expected to last {$MaintenanceStore.duration}.</p>
		<p><strong>Reason:</strong> {$MaintenanceStore.reason}</p>
		<p>
			<img src="{MaintenanceImg}" alt="Gurdurr" title="Gurdurr!!" />
		</p>
		<p>Thank you for your patience!</p>
	</StaticPage>
{:else}
	<slot></slot>
{/if}

<style>
	p { text-align: center; }

	img {
		display: block;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
		margin: auto;
		inline-size: 75%;
		max-inline-size: 10em;
	}
</style>