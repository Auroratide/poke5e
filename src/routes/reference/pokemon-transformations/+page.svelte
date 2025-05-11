<script>
	import TeraTypeTag from "$lib/pokemon/TeraTypeTag.svelte"
	import IconedCardHeading from "$lib/design/IconedCardHeading.svelte"
	import ReferencePage from "../ReferencePage.svelte"
	import Rules2018 from "./2018"
	import Rules2024 from "./2024"
	import { rulesVersion } from "$lib/design/rules-version"
</script>

<ReferencePage title="Pokémon Transformations">
	<section>
		<p>A <dfn>transformation</dfn> grants a pokemon a temporary, but potent, boost in power by altering its form and capabilities. Any pokemon can undergo one of four kinds of transformations:</p>
		<ul>
			<li><a href="#mega-evolution">Mega Evolution</a></li>
			<li><a href="#z-move">Z-Move</a>{#if $rulesVersion === "2018"}<sub>'24</sub>{/if}</li>
			<li><a href="#dynamax">Dynamax</a>{#if $rulesVersion === "2018"}<sub>'24</sub>{/if}</li>
			<li><a href="#terastallization">Terastallization</a>{#if $rulesVersion === "2018"}<sub>'24</sub>{/if}</li>
		</ul>
		{#if $rulesVersion === "2018"}
			<p><strong>Note:</strong> Only Mega Evolution existed in the 2018 ruleset. The 2024 rules for the other forms are reprinted here for convenience.</p>
		{/if}
		<p>A pokemon may only undergo a single transformation per long rest. Additionally, due to the equipment needed to perform these transformations, a trainer may only induce each kind of transformation once per long rest.</p>
		<p>Most sanctioned battles only allow a single transformation. Some venues only allow a specific kind of transformation. Others allow any, and yet others disallow them entirely.</p>
	</section>
	<section>
		<h2 id="mega-evolution">Mega Evolution</h2>
		{#if $rulesVersion === "2018"}
			<Rules2018.MegaEvolution />
		{:else}
			<Rules2024.MegaEvolution />
		{/if}
	</section>
	<section>
		<h2 id="z-move">Z-Move{#if $rulesVersion === "2018"}<sub>'24</sub>{/if}</h2>
		<p>A pokemon empowered with Z-Power may unleash a single, ultra-powerful move.</p>
		<p>A pokemon may only use a Z-Move if it meets all of these conditions:</p>
		<ul>
			<li>It is at least level 6.</li>
			<li>It is holding a Z-Crystal.</li>
			<li>The type of Z-Crystal matches the type of at least one of the pokemon's known moves.</li>
			<li>Its trainer possesses a Z-Ring.</li>
		</ul>
		<p>When empowered, the pokemon chooses one of its known moves which has the same type as the type of Z-Crystal it is holding. This move:</p>
		<ul>
			<li>Cannot miss its target(s).</li>
			<li>If it requires a saving throw, the DC increases by 5.</li>
			<li>If it deals damage or heals, double the number of dice and the MOVE bonus (for example, a move that normally deals 2d6 + MOVE damage now deals 4d6 + 2&times;MOVE damage).</li>
			<li>If it confers a stackable effect, two extra stacks of that effect are applied (for example, if the move grants +1 to AC and can stack, then it applies +3 to AC instead).</li>
			<li>If the move does not benefit from any of the above effects, work with your DM on a cool custom effect!</li>
		</ul>
	</section>
	<section>
		<h2 id="dynamax">Dynamax{#if $rulesVersion === "2018"}<sub>'24</sub>{/if}</h2>
		<p>When a pokemon dynamaxes, it warps the space around it to gains tremendous size and strength.</p>
		<p>A pokemon may only dynamax if it meets all of these conditions:</p>
		<ul>
			<li>It is at least level 10.</li>
			<li>There is enough space around it to fit a Gargantuan creature.</li>
			<li>Its trainer possesses a Dynamax Band</li>
		</ul>
		<p>When a pokemon dynamaxes:</p>
		<ul>
			<li>It gains temporary HP equal to its current HP.</li>
			<li>Its size becomes Gargantuan.</li>
			<li>It becomes immune to all non-volatile status conditions (flinching, confusion, prone).</li>
			<li>It cannot be voluntarily nor forcibly switched out.</li>
			<li>Damage rolls it makes are rolled twice, and it may choose either result.</li>
		</ul>
		<p>A dynamaxed pokemon reverts back to its original form when any of the conditions are met:</p>
		<ul>
			<li>At the end of combat, if used during combat.</li>
			<li>After 1 minute, if used outside of combat.</li>
			<li>When the pokemon loses all of its temporary HP.</li>
			<li>When the pokemon faints.</li>
			<li>If the trainer loses possession of their Dynamax Band.</li>
		</ul>
	</section>
	<section>
		<h2 id="terastallization">Terastallization{#if $rulesVersion === "2018"}<sub>'24</sub>{/if}</h2>
		<p>When a pokemon terastallizes, it shimmers like a gem and changes its typing.</p>
		<p>Each pokemon has a special <dfn>Tera Type</dfn> which is one of the 18 primary types or the Stellar type. For most pokemon, their Tera Type is the same as their primary type, but rarely, pokemon may possess a Tera Type that differs from their customary typing entirely.</p>
		<p>A pokemon may only terastallize if it meets all of these conditions:</p>
		<ul>
			<li>It is at least level 6.</li>
			<li>Its trainer possesses a Tera Orb.</li>
		</ul>
		<p>Wild pokemon may terastallize if their Tera Type differs from both their primary and secondary types.</p>
		<p>When a pokemon terastallizes:</p>
		<ul>
			<li>Its type changes to its Tera Type; its resistances, vulnerabilities, and immunities change accordingly.</li>
			<li>It retains the STAB bonus of its original typing.</li>
			<li>If the pokemon's Tera Type is the same as either its primary or secondary types, then its STAB bonus for the Tera Type doubles.</li>
			<li>Other moves or effects cannot change this pokemon's type.</li>
			<li>It becomes vulnerable to Stellar-type damage.</li>
		</ul>
		<p>A terastallized pokemon reverts back to its original form when any of the conditions are met:</p>
		<ul>
			<li>At the end of combat, if used during combat.</li>
			<li>After 1 minute, if used outside of combat.</li>
			<li>When the pokemon faints.</li>
			<li>If the trainer loses possession of their Tera Orb.</li>
		</ul>
		<IconedCardHeading>
			Stellar Type
			<TeraTypeTag slot="icon" type="stellar" />
		</IconedCardHeading>
		<p>Some pokemon may terastallize into the Stellar Type.</p>
		<p>Pokemon with the Stellar tera type retain the vulnerabilities and resistances of their original type when terastallized.</p>
		<p>A pokemon that is terastallized is vulnerable to Stellar-type moves.</p>
	</section>
</ReferencePage>
