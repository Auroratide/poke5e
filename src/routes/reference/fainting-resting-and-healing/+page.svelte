<script>
	import Card from "$lib/design/Card.svelte"
	import Title from "$lib/design/Title.svelte"
</script>

<Title value="Fainting, Resting, and Healing" />
<Card title="Fainting, Resting, and Healing">
	<section>
		<p>The rules for HP, healing, and resting for Pokémon are the same as in D&D 5e, with some extensions.</p>
	</section>
	<section>
		<h2>Reaching 0 HP</h2>
		<p>When a Pokémon reaches 0 HP, what happens to it depends on the circumstances. Additionally, a downed/fainted Pokémon may stabilize in different ways.</p>
		<ul>
			<li>In sanctioned combat (e.g. a gym battle), all damage is presumed non-lethal. Pokémon downed in sanctioned combat do not need to make death saving throws.</li>
			<li>In other combat scenarios (e.g. a wild battle), downed Pokémon must make death saving throws until stabilized.</li>
			<li>While inside a Pokéball, a Pokémon does not need to make death saving throws. After spending 10 uninterrupted minutes inside a Pokéball, the Pokémon stabilizes at 0 HP.</li>
			<li>When a trainer's Pokémon reaches 0 HP, the trainer may use their reaction to immediately recall the Pokémon to its pokéball and send out another Pokémon.</li>
		</ul>
		<h3>Pokémon Death</h3>
		<p>Like in D&D 5e, a Pokémon dies if it reaches its third failed death saving throw. There is no known way for a deceased Pokémon to be revived. It is rumored that only legendary Pokémon may have such power.</p>
	</section>
	<section>
		<h2>Healing</h2>
		<p>There are three main ways to heal your Pokémon.</p>
		<ul>
			<li>Bring them to a Pokécenter.</li>
			<li>Take a long or short rest.</li>
			<li>Give them potions or food.</li>
		</ul>
		<h3>Pokécenters</h3>
		<p>Pokécenters are small hospital-like facilities that can heal your Pokémon to full health and cure all their statuses in less than 30 minutes. In a traditional Pokémon setting, Pokécenters offer their services for free to those with Trainer Licenses.</p>
		<p>Neither PP nor hit dice are replenished at a Pokécenter.</p>
		<p>Pokécenters are also able to treat more serious injuries Pokémon endure, the same way a hospital would for people. Such operations usually take longer than 30 minutes.</p>
		<h3>Resting</h3>
		<p>Long rests take at least eight hours and refresh all Pokémon health, statuses, and PP.</p>
		<p>Short rests can be as little as a half an hour and recover hit points based on normal 5e rules. PP is not recovered on short rests, and short rests do not revive fainted Pokémon.</p>
		<h3>Potions and Food</h3>
		<p>Certain items and food can be given to Pokémon as an action, or in some cases consumed as a reaction, to restore HP, PP, or status. These items cannot be given to Pokémon within Pokéballs.</p>
	</section>
</Card>
