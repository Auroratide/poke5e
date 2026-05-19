<script>
	import { FlatDl } from "$lib/ui/elements"
	import ReferencePage from "../ReferencePage.svelte"
	import { rulesVersion } from "$lib/site/rules-version"
	import Rules2018 from "./2018"
	import Rules2024 from "./2024"
	import { Url } from "$lib/site/url"
</script>

<ReferencePage title="Catching Pokémon">
	<section>
		<p>Catching Pokémon is crucial to your success as a trainer. There are several rules to follow when catching Pokémon:</p>
		<ul>
			<li>To attempt to catch a Pokémon, use the Throw Pokéball action.</li>
			<li>A trainer can hold no more Pokémon than their Pokéslots allow. If a trainer's Pokéslots are full when a Pokémon is caught, the trainer must choose one Pokémon to send to their PC.</li>
			<li>A Pokéball is destroyed on a failed catch attempt.</li>
			<li>A caught Pokémon retains its level, all status effects, and current HP at the time of the catch.</li>
			<li>It is impossible for a Trainer to catch a Pokémon whose level is greater than their current level.</li>
			<li>A fainted Pokémon cannot be caught.</li>
		</ul>
		<p>When a Pokémon is caught:</p>
		<ul>
			<li>A caught Pokémon is given the minimum amount of experience for that Pokémon’s level to start.</li>
			<li>Catching a Pokémon gives 1/5 the normal XP.</li>
		</ul>
		<p>Pokéballs are not the only way to catch Pokémon. There may be Pokémon in the wild that are friendly and happy to join you in your adventures. Feel free to try narratively interesting ways of forming a team!</p>
	</section>
	<section>
		<h2>Throw Pokéball Action</h2>
		<FlatDl>
			<dt>Time</dt>
			<dd>1 Action</dd>
			<dt>Range</dt>
			<dd>60ft</dd>
			<dt>Consumes</dt>
			<dd>1 Pokéball variant</dd>
		</FlatDl>
		<p>You hurl a Pokéball at a wild Pokémon in attempt to capture it. Make an Animal Handling skill check. You have advantage on the throw if the Pokémon is poisoned, restrained, asleep, burning, confused, paralyzed, or frozen.</p>
		<p>If you succeed the DC, the wild Pokémon is captured.</p>
		<p>The base DC is equal to:</p>
		{#if $rulesVersion === "2018"}
			<Rules2018.Formula />
		{:else}
			<Rules2024.Formula />
		{/if}
	</section>
	<section>
		<h2>Pokéball Types</h2>
		{#if $rulesVersion === "2018"}
			<Rules2018.Pokeballs />
		{:else}
			<Rules2024.Pokeballs />
		{/if}
	</section>
	<section>
		<h2>Examples</h2>
		{#if $rulesVersion === "2018"}
			<Rules2018.Examples />
		{:else}
			<Rules2024.Examples />
		{/if}
	</section>
	{#if $rulesVersion === "2024"}
		<section>
			<h2>Where to Catch Pokémon</h2>
			<p>The only hard rule is that a Pokémon cannot be captured via a pokéball if its been registered to a trainer via one of their own pokéballs. Otherwise, wild Pokémon can be found in many contexts:</p>
			<ul>
				<li>In undeveloped wildlands, their natural habitat</li>
				<li>Throughout cities, living amongst people</li>
				<li>In designated parks or safari zones</li>
			</ul>
			<p>Pokémon stat blocks reference biomes in which they are most usually found.</p>
			<p>If you're a DM, read more about <a href="{Url.reference.encounters()}">Building Encounters</a>.</p>
		</section>
	{/if}
</ReferencePage>
