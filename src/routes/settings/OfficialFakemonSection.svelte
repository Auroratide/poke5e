<script lang="ts">
	import { readdOfficialFakemon } from "$lib/fakemon/OfficialFakemonRemovedBanner"
	import { Button } from "$lib/ui/elements"
	import { Url } from "$lib/url"
</script>

<section>
	<h2>"Official" Fakémon</h2>
	<p>Previously, this site had some unofficial fakémon listed under the official pokémon list. They have been removed to keep the official list official. These fakémon included Brawleon, Minereon, Droideon, Terreon, Specteon, Eeveon, Pesteon, Aereon, Drakeon, Toxeon, Rookite, and Belseraph.</p>
	<p>For backward compatibility, you may re-add these fakémon to your <a href="{Url.fakemon()}">Fakémon Library</a> using the button below.</p>
	<p class="centered larger">
		<Button on:click={readdOfficialFakemon}>Re-add Old Fakémon</Button>
	</p>
</section>

<style>
	.centered { text-align: center; }
	.larger { font-size: var(--font-sz-neptune); }
</style>
