<script>
	import { Formula } from "$lib/ui/elements"
	import ReferencePage from "../ReferencePage.svelte"
	import { rulesVersion } from "$lib/site/rules-version"
	import one from "./1v1.webp"
	import two from "./2v2.webp"
	import four from "./4v4.webp"
</script>

<ReferencePage title="Encounters">
	{#if $rulesVersion === "2018"}
		<section>
			<p>There will be essentially two types of encounters in Pokémon 5e: Wild Pokémon encounters and Trainer Battles.</p>
		</section>
		<section>
			<h2>Wild Pokémon</h2>
			<p>Wild Pokémon encounters should be treated with caution. As a DM, you have a responsibility to continually introduce your players to new Pokémon of various levels throughout the campaign. Your trainers will want to go out into the wilderness to gain experience fighting as well as catching new Pokémon. Clusters of Pokémon should contain those of high and low levels, and the players should not know what those levels are until they have successfully captured a Pokémon. It is important to remember that Pokémon of higher levels cannot be caught until the trainer has also reached that level, and higher leveled Pokémon help players progress through their levels without having to do much training. As such, capture-focused expeditions should contain several Pokémon of lower levels, while battle-focused encounters should contain high level Pokémon to present a challenge to the player, perhaps even 1 or 2 Pokémon of much higher level than the players.</p>
			<p>Experience for wild Pokémon encounters should be given out at the discretion of the DM, based on participation in the fight by each PC, or distributed equally among all players.</p>
		</section>
		<section>
			<h2>Trainer Pokémon</h2>
			<p>Often in a campaign, your players will come across other trainers that will want to engage in a Pokémon battle. Combat for these fights are similar to wild Pokémon encounters with the exception that an enemy trainer’s Pokémon cannot be caught by any means.</p>
			<p>Additionally, Pokémon that belong to an enemy trainer are usually stronger than those found in the wild. When building trainer Pokémon, consider the fact that their Pokémon may have started at level 1 and have gone through an evolution or two with that trainer. Advance the enemy Pokémon just the same as a PC would advance their own Pokémon.</p>
			<p>It may be a good idea to give the entire party experience and money for defeating a trainer, in addition to experience gained from each defeated Pokémon.</p>
		</section>
	{:else}
		<section>
			<p>There will be essentially three types of encounters in Pokémon 5e: Wild Pokémon encounters, Trainer Battles, and Gym Battles.</p>
		</section>
		<section>
			<h2>Wild Pokémon</h2>
			<p>Encountering Pokémon in the wild can be dangerous! Players may venture into the wilderness to gain experience, catch new pokémon, or just as a part of travel. As a DM, you will want to balance the kinds of pokémon and their strength levels that players face throughout the campaign, both to create a feeling of risk and help players build an awesome team.</p>
			<p>When designing encounters with wild pokemon, keep the following in mind:</p>
			<ul>
				<li>Clusters of pokémon should contain a mix of low and high levels. Players may not know the precise levels of wild pokémon, though astute trainers may be able to assess their relative strength.</li>
				<li>On capture-focused expeditions, aim to have several pokémon of lower levels. On battle-focused encounters, include some high level pokémon to present a greater challenge.</li>
				<li>Rarely, trainers may encounter an especially strong pokémon, one that is perhaps several levels above their own pokémon. Nature is unbiased, and trainers know that fleeing is always an option!</li>
				<li>Wild pokémon are not restricted from attacking trainers directly if they perceive the trainer as a threat.</li>
			</ul>
			<p>Experience for wild Pokémon encounters should be given out at the discretion of the DM, based on participation in the fight by each PC, or distributed equally among all players.</p>
			<h3>A Note on SR vs CR</h3>
			<p>SR (Species Rating) is <strong>not</strong> equivalent to CR (Challenge Rating)! The guidance on designing properly challenging encounters is to use pokémon levels. Pokémon of the same level will be similarly strong.</p>
		</section>
		<section>
			<h2>Trainer Pokémon</h2>
			<p>Trainers battle one another in order to become stronger! Trainer battles can be initiated by either the players or trainers they encounter. Running a trainer battle is similar to running wild pokémon battles, with two exceptions: the opposing trainer's pokémon cannot be captured with pokéballs, and the trainer's actions may be limited depending on the rules of the contest.</p>
			<p>When designing encounters with trainers, keep the following in mind:</p>
			<ul>
				<li>Trainers' pokémon are usually stronger than those found in the wild. They may have an extra feat, benefit from trainer specialization, have moves only learned via TM, and have slightly elevated stats.</li>
				<li>Trainers direct their pokémon's moves with purpose and strategy. The more experienced the trainer, the more they will leverage type advantage, switching, pokémon abilities, and other synergies.</li>
				<li>What rules are in place for the trainer battle? Items allowed or disallowed? Single battle or double? Or, is the battle unsanctioned and therefore anything goes?</li>
				<li>Trainers may not engage in combat directly, nor direct their pokémon to attack other trainers. This results in a forfeiture of their Trainer License... and probably a lawsuit or two.</li>
			</ul>
			<p>It may be a good idea to give the entire party experience and money for defeating a trainer, in addition to experience gained from each defeated Pokémon.</p>

			<h3>Awarding Money</h3>
			<p>It is not an absolute requirement of Pokémon 5e that trainers hand over their money upon losing, though it may be a good way for your players to receive steady income over the course of a campaign. If you decide to do payouts, the following formula is a decent starting point for how much to award:</p>
			<Formula equals="Money" expression="(highest level pokémon)d4 × 100" />
			<p>For example, if Trainer Harmony's strongest pokémon was a Level 5 Tepig, award <strong>5d4 &times; 100</strong> pokédollars.</p>
			<p>Besides battles, get creative with other ways players can earn some cash: bounties, odd jobs, official contests, gym battles, and so on!</p>
		</section>
		<section>
			<h2>Gym Battles</h2>
			<p>Gym battles are an official assessment of a trainer's strength and readiness to face the Pokémon League. They are much like trainer battles, but generally more challenging and with official rules.</p>
			<ul>
				<li>Gym Leaders usually structure their teams around either a pokémon type (like Fire) or theme.</li>
				<li>Gym Leaders are generally among the strongest trainers in their region.</li>
				<li>Upon victory, it is good to award the players with a Gym Badge symbolizing their victory, a monetary or TM Move reward, and experience points for each defeated pokémon.</li>
			</ul>
			<p>Given that Dungeons and Dragons is not generally a 1v1 game, there are different ways you can run Gym Battles to involve everyone at the table. Feel free to experiment and work with your players on what is most fun to play!</p>

			<h3>Teamed Double Battles</h3>
			<p>The battle is a double battle. The Gym Leader controls two pokémon simultaneously, and two players each control one pokémon. The players not currently battling wait for one of their pokémon to be subbed in, either because one of the active pokémon fainted or because the Switch action was taken.</p>
			<p>The battle continues until either one pokémon from each player has fainted, or all of the Gym Leader's pokémon have fainted. The Gym Leader uses a total number of pokémon equal to the number of players.</p>
			<figure>
				<img src="{two}" alt="Players 1 and 2 battle the gym leader. Player 3 and 4 sit on the sideline." />
				<figcaption><p>Players 3 and 4 can be switched into the battle.</p></figcaption>
			</figure>
			
			<h3>Full Team vs Full Team</h3>
			<p>Each player controls a single pokémon on the battle field. The Gym Leader recruits employees at their gym to help out, and together they control a total number of pokémon equal to the number of players. The battle is two full teams fighting against each other at once!</p>
			<p>The match is over once all pokémon on a team have fainted.</p>
			<figure>
				<img src="{four}" alt="Players 1, 2, 3, and 4 face off against the gym leader and two extras." />
				<figcaption><p>The extra opponents help the Gym Leader manage four or more pokémon.</p></figcaption>
			</figure>

			<h3>Parallel 1v1s</h3>
			<p>If it's prefered to earn gym badges individually, you can still run the battles in such a way that everyone participates at the same time rather than each player awaiting their turn.</p>
			<p>You run an independent battle for each player, but in parallel. For example, Player 1 makes their action first, followed by the Gym Leader's response. Next, Player 2 makes their action in their battle, followed by the Gym Leader's response. And this continues until the last player's field has made their actions, and it loops back to Player 1.</p>
			<p>The advantage to running individual battles in parallel is all players participate together. The tradeoff is that as the DM, you essentially need to manage a board state for each player. It is up to you whether this is easier or harder than running single battles consecutively.</p>
			<figure>
				<img src="{one}" alt="Players 1, 2, 3, and 4 engage in individual battles against the Gym Leader." />
				<figcaption><p>Each battle is technically isolated from the others.</p></figcaption>
			</figure>
		</section>
	{/if}
</ReferencePage>
