import { Url } from "$lib/url"
import type { TrainerPath } from "./TrainerPath"

export const TrainerPaths: TrainerPath[] = [ {
	name: "Ace Trainer",
	features: {
		level2: {
			description: ["Your goal is to become one of the strongest trainers in the world, and so you excel in battle. All of your Pokémon gain a +1 bonus to their attack and damage rolls."],
		},
		level5: {
			name: "Battle Master",
			description: ["When you reach level 5, you gain a number of battle dice (d6) equal to 1 + your Dexterity modifier (minimum of 1). You may assign one of these to any of your Pokémon to be added to a single attack or damage roll, after the result of the initial roll. You replenish your pool of battle dice at each long rest."],
		},
		level9: {
			name: "Rapid Switching",
			description: ["When you reach level 9, your Pokémon can choose to take a single action or move on the turn they are switched. They still cannot use a bonus action or a reaction on that turn.", "Additionally, your battle dice become a d8."],
		},
		level15: {
			name: "Tactical Mastery",
			description: ["Certain trainers choose to excel in one arena, utilizing it to its fullest potential. When you reach level 15, choose an ability score. Each of your Pokémon increases that ability score by one. You must choose the same ability score to increase for all of your Pokémon. This increase will also apply to all Pokémon you catch in the future.", "Additionally, your battle dice become a d10."],
		},
	},
}, {
	name: "Hobbyist",
	features: {
		level2: {
			description: [`You think being a trainer requires being very good at a little bit of everything. Select one additional <a href="${Url.reference.specializations()}">Specialization</a> and two new skill proficiencies for your trainer. The specialization you choose must be different from any specializations you already have.`],
		},
		level5: {
			name: "Versatile",
			description: ["At level 5, you gain a number of skill dice (d6) equal to 1 + your Wisdom modifier (minimum of 1). You may assign one of these to any of your Pokémon to be added to a single skill check or saving throw, after the result of the initial roll. You replenish your pool of skill dice at each long rest."],
		},
		level9: {
			name: "Generalist",
			description: ["At level 9, you can add half your Proficiency Bonus (round down) to any ability check you make that uses a skill proficiency you lack and that doesn't otherwise use your Proficiency Bonus. You may also add half your Proficiency Bonus (round down) to any ability check your Pokémon make that uses a skill they lack.", "Additionally, your skill dice become a d8."],
		},
		level15: {
			name: "Multitalented",
			description: ["At level 15, each of your Pokemon may become proficient in one additional skill of your choice. You may choose a different skill per Pokemon, and this will apply to all Pokemon you catch in the future.", "Additionally, your skill dice become a d10."],
		},
	},
}, {
	name: "Nurse",
	features: {
		level2: {
			description: ["You have a nurturing touch and a skill for mentoring Pokémon to bring out the best in them. You gain proficiency in the Medicine skill. Every time you use an item or ability to heal a Pokémon, that Pokémon regains addtional hit points equal to your Wisdom modifier (minimum one)."],
		},
		level5: {
			name: "Pokéchef",
			description: ["You excel at creating meals for your Pokémon, seemingly out of nothing. At level 5, you are frequently prepared with some sort of edible treat, granting 2d4+2 hit points when given. You can give the treat to a creature as a bonus action and other creatures can administer it as an action. You can use this feature a number of times equal to your proficiency modifier per long rest."],
		},
		level9: {
			name: "Field Medic",
			description: ["At 9th level, you can perform first aid in the heat of battle. As an action, you may make a Medicine Check DC 12 to cure an adjacent Pokémon of a non-volatile status effect.", "In addition, your Pokéchef treat now heals 3d10+6 hit points."],
		},
		level15: {
			name: "Tip-top Shape",
			description: ["When you reach level 15, your Pokémon have advantage on saving throws against acquiring negative status conditions.", "In addition, your Pokéchef treat now heals 4d12+10 hit points."],
		},
	},
}, {
	name: "Researcher",
	features: {
		level2: {
			description: ["You wish to learn more about Pokémon and the secrets that they hold within. Due to your heightened understanding of your Pokémon, you may add your Intelligence modifier (minimum one) to any skill check your Pokémon makes. You may use this abiliy a number of times equal to your proficiency bonus per long rest."],
		},
		level5: {
			name: "Analyst",
			description: ["At level 5 your keen mind allows you to discern details about a Pokémon others might overlook. As an action, you can make a Investigation check contested by a Pokémon’s Deception check. If you succeed, you learn that Pokémon’s ability and the name of one random move it knows."],
		},
		level9: {
			name: "Evolution Expert",
			description: ["At level 9, your understanding of the secrets behind Pokémon evolution allows you to enhance the process. When one of your Pokémon evolves, you may use two of its evolution points to spend on a feat."],
		},
		level15: {
			name: "Professor",
			description: ["At level 15, you are an expert in your field. You many now use your Analyst ability as a bonus action. Additionally, your Analyst ability now reveals either one additional ability or move the target Pokémon has."],
		},
	},
}, {
	name: "Ranger",
	features: {
		level2: {
			description: ["You are comfortable in the wild, and have an incredible respect for Pokémon in their natural habitat. You gain proficiency in Nature and Survival. In addition, your walking speed increases by 10, and you gain a climbing and swimming speed equal to half your walking speed."],
		},
		level5: {
			name: "Capture Styler",
			description: ["As a Pokémon Ranger you use a special tool to capture Pokémon called a Capture Styler. At level 5, if you have run all the way around a Pokémon, drawing a closed shape by the path you traveled, you gain a +10 to capturing that Pokémon."],
		},
		level9: {
			name: "Partners",
			description: ["At level 9, after each long rest, you may choose one of your Pokémon to be your partner for the day. Your partner Pokémon may add your Wisdom modifier to any skill check they make. They may also add your Wisdom modifier to attack rolls made against wild Pokémon."],
		},
		level15: {
			name: "Poké Assist",
			description: ["At level 15, your partner Pokémon boosts the power of your Capture Styler. When any of your Pokémon use a move that is the same type as either of your partner Pokémon's types, the move's attack roll is made with advantage. Additionally, you have advantage on making captures against Pokémon that share a type with your partner Pokémon."],
		},
	},
} ]
