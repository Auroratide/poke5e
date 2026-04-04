<script lang="ts">
	import { MaintenanceStore } from "./MaintenanceStore"
	import { DateFormatter } from "./DateFormatter"
	import { FeatureToggles } from "$lib/site/FeatureToggles"
</script>

{#if !FeatureToggles.OverrideMaintenance() && $MaintenanceStore.status === "upcoming"}
	<p>Maintenance is scheduled for <strong><time datetime="{$MaintenanceStore.scheduledStart.toISOString()}">{DateFormatter.format($MaintenanceStore.scheduledStart)}</time></strong>, lasting for about {$MaintenanceStore.duration}. During maintenance, Trainers and Fakémon will not be available.</p>
{/if}

<style>
	p {
		font-size: var(--font-sz-venus);
		text-align: center;
		background: var(--skin-content);
		padding-block: 0.5em;
		padding-inline: 0.5em;
		border-radius: 1em;
		color: var(--red-text);
	}
</style>
