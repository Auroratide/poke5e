<script>
	import Card from "$lib/design/Card.svelte"
	import Title from "$lib/design/Title.svelte"
	import { Url } from "$lib/url"
</script>

<Title value="Trainer Paths" />
<Card title="Trainer Paths">
	<section>
		<p>There are many ways and reasons to train Pokémon. At the 2nd level, depending on your long term goals, choose one of the following paths.</p>
	</section>
	<section>
		<h2>Ace Trainer</h2>
		<p>Your goal is to become one of the strongest trainers in the world, and so you excel in battle. All of your Pokémon gain a +1 bonus to their attack and damage rolls.</p>
		<h3>Battle Master</h3>
		<p>When you reach level 5, you gain a number of battle dice (d6) equal to your Dexterity modifier. These die can be added to a single attack or damage roll. You can assign any amount of the dice to any of your Pokémon at the end of each of your long rests. A Pokémon with a battle dice can use one of those dice when they roll an attack roll or damage roll. Each day when you assign your battle dice for the day, any previous day's assignments are removed.</p>
		<h3>Rapid Switching</h3>
		<p>When you reach level 9, your Pokémon can choose to take a single action or move on the turn they are switched. They still cannot use a bonus action or a reaction on that turn.</p>
		<p>Additionally, your battle dice become a d8.</p>
		<h3>Tactical Mastery</h3>
		<p>Certain trainers choose to excel in one arena, utilizing it to its fullest potential. When you reach level 15, choose an ability score. Each of your Pokémon increases that ability score by one. You must choose the same ability score to increase for all of your Pokémon. This increase will also apply to all Pokémon you catch in the future.</p>
		<p>Additionally, your battle dice become a d10.</p>
	</section>
	<section>
		<h2>Hobbyist</h2>
		<p>You think being a trainer requires being very good at a little bit of everything. Select one additional <a href="{Url.reference.specializations()}">Specialization</a> and two new skill proficiences for your trainer. The specialization you choose must be different from any specializations you already have.</p>
		<h3>Versatile</h3>
		<p>At level 5, you gain a number of skill dice (d6) equal to your Intelligence modifier. These dice may be added to a single skill check or saving throw. You can assign any amount of these dice to yourself or any of your Pokémon at the end of each of your long rests. Each day when you assign your skill dice for the day, any previous day's assignments are removed.</p>
		<h3>Generalist</h3>
		<p>At level 9, you can add half your Proficiency Bonus (round down) to any ability check you make that uses a skill proficiency you lack and that doesn't otherwise use your Proficiency Bonus. You may also add half your Proficiency Bonus (round down) to any ability check your Pokémon make that uses a skill they lack.</p>
		<p>Additionally, your skill dice become a d8.</p>
		<h3>Multitalented</h3>
		<p>At level 15, each of your Pokemon may become proficient in one additional skill of your choice. You may choose a different skill per Pokemon, and this will apply to all Pokemon you catch in the future.</p>
		<p>Additionally, your skill dice become a d10.</p>
	</section>
	<section>
		<h2>Nurse</h2>
		<p>You have a nurturing touch and a skill for mentoring Pokémon to bring out the best in them. You gain proficiency in the Medicine skill. Every time you use an item or ability to heal a Pokémon, that Pokémon regains addtional hit points equal to your Wisdom modifier (minimum one).</p>
		<h3>Pokéchef</h3>
		<p>You excel at creating meals for your Pokémon, seemingly out of nothing. At level 5, you are frequently prepared with some sort of edible treat, granting 2d4+2 hit points when given. You can give the treat to a creature as a bonus action and other creatures can administer it as an action. You can use this feature a number of times equal to your proficiency modifier per long rest.</p>
		<h3>Warning Words</h3>
		<p>At 9th level, you can call out in battle, warning your Pokémon of incoming threats. When one of your Pokémon would suffer damage, you may use your reaction to reduce the incoming damage by 2d6 plus your Wisdom modifier. You may use this ability a number of times equal to your Wisdom modifier per day (minimum one).</p>
		<h3>Tip-top Shape</h3>
		<p>When you reach level 15, your Pokémon have advantage on saving throws against negative status effects. Additionally, the amount you can reduce with your Warning Words ability increases to 3d6 plus your Wisdom modifier.</p>
	</section>
	<section>
		<h2>Researcher</h2>
		<p>You wish to learn more about Pokémon and the secrets that they hold within. Due to your heightened understanding of your Pokémon, you may add your Intelligence modifier (minimum one) to any skill check your Pokémon makes. You may use this abiliy a number of times equal to your proficiency bonus per long rest.</p>
		<h3>Analyst</h3>
		<p>At level 5 your keen mind allows you to discern details about a Pokémon others might overlook. As an action, you can make a Investigation check contested by a Pokémon’s Deception check. If you succeed, you learn that Pokémon’s ability and the name of one random move it knows.</p>
		<h3>Evolution Expert</h3>
		<p>At level 9, your understanding of the secrets behind Pokémon evolution allows you to enhance the process. When one of your Pokémon evolves, you may use two of its evolution points to spend on a feat.</p>
		<h3>Professor</h3>
		<p>At level 15, you are an expert in your field. You many now use your Analyst ability as a bonus action. Additionally, your Analyst ability now reveals either one additional ability or move the target Pokémon has.</p>
	</section>
	<section>
		<h2>Ranger</h2>
		<p>You are comfortable in the wild, and have an incredible respect for Pokémon in their natural habitat. You gain proficiency in Nature and Survival. In addition, your walking speed increases by 10, and you gain a climbing and swimming speed equal to half your walking speed.</p>
		<h3>Capture Styler</h3>
		<p>As a Pokémon Ranger you use a special tool to capture Pokémon called a Capture Styler. At level 5, if you have run all the way around a Pokémon, drawing a closed shape by the path you traveled, you gain a +10 to capturing that Pokémon.</p>
		<h3>Partners</h3>
		<p>At level 9, after each long rest, you may choose one of your Pokémon to be your partner for the day. Your partner Pokémon may add your Wisdom modifier to any skill check they make. They may also add your Wisdom modifier to attack rolls made against wild Pokémon.</p>
		<h3>Poké Assist</h3>
		<p>At level 15, your partner Pokémon boosts the power of your Capture Styler. When any of your Pokémon use a move that is the same type as either of your partner Pokémon's types, the move's attack roll is made with advantage. Additionally, you have advantage on making captures against Pokémon that share a type with your partner Pokémon.</p>
	</section>
</Card>
