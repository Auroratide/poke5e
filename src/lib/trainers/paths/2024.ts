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
			name: "Tactical Mastery",
			description: ["Certain trainers choose to excel in one arena, utilizing it to its fullest potential. When you reach level 9, choose an ability score. Each of your Pokémon increases that ability score by one. You must choose the same ability score to increase for all of your Pokémon. This increase will also apply to all Pokémon you catch in the future.", "Additionally, your battle dice become a d8."],
		},
		level15: {
			name: "Rapid Switching",
			description: ["When you reach level 15, your Pokémon can choose to take a single action or move on the turn they are switched (not both). They still cannot use a bonus action or a reaction on that turn.", "Additionally, your battle dice become a d10."],
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
	name: "Poké Mentor",
	features: {
		level2: {
			description: ["You have a skill for mentoring Pokémon to bring out the best in them. Beginning at level 2, your TMs can be used twice before breaking."],
		},
		level5: {
			name: "Retention",
			description: ["The Extra Move feat now costs one ASI point instead of two at levels 4, 8, 12, 16, or 20. If any of your Pokémon already has this feature, they may gain one ASI at this time."],
		},
		level9: {
			name: "Cheerleader",
			description: ["At level 9, once per short rest, you may use a bonus action to boost all allied Pokémon with inspiring words. Until your next turn, you may add your CHA modifier (minimum of 1) to all allied attack rolls OR damage rolls OR AC."],
		},
		level15: {
			name: "Master Teacher",
			description: ["You have become an incredibly skilled teacher, and move learning is accelerated under your leadership. When you reach level 15, your Pokémon's moves may be learned and unlearned at each long rest instead of level up."],
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
	name: "Pokémon Collector",
	features: {
		level2: {
			description: ["Your fascination with all the different types of Pokémon of the world drives your need to collect them all. Beginning at level 2, you now have expertise in Animal Handling, doubling your proficiency in this skill."],
		},
		level5: {
			name: "Gotta Catch 'Em All",
			description: ["At level 5, once per long rest, you may roll an Animal Handling check with advantage, even if the opponent is not suffering from a negative status effect."],
		},
		level9: {
			name: "Disciplined Strikes",
			description: ["At level 9, you have trained your Pokémon to hold back or unleash power when necessary. When damaging a Pokémon enough to cause it to faint, you can choose to bring it to 1 HP instead."],
		},
		level15: {
			name: "Expert Tracker",
			description: ["At level 15, you become an expert at tracking Pokémon. When you use your Pokémon Tracker class feature, you may roll a DC 11 Investigation or Nature check in order to encounter any single Pokémon in the list of wild Pokémon for the area. Additionally, you may now use the Pokémon Tracker class feature twice per long rest."],
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
	name: "Type Master",
	features: {
		level2: {
			description: ["You feel drawn to the elements, focusing your skills into a particular type of Pokémon. Beginning at level 2, increase the STAB of any Pokémon that is the same type as your specialization by +1 at all levels. If you select multiple specializations at later levels, the bonus applies to the new type as well. If your Pokémon is dual-type and you are specialized in both types, the bonus is +2."],
		},
		level5: {
			name: "Drawing Power",
			description: ["Your Pokémon are trained to draw power from each other. When you reach level 5, Pokémon of the same type as your specialized types add +2 to their attack rolls."],
		},
		level9: {
			name: "Storing Power",
			description: ["Your skills within your specialized types give your Pokemon a great defensive power. When you reach level 9, all of your carried Pokémon within your specialized types have resistance to a choice of one of your specialization types, determined at the time of gaining this feature. This type may never change, so choose wisely. If a Pokémon was once vulnerable to that type, it now takes the regular amount of damage."],
		},
		level15: {
			name: "Releasing Power",
			description: ["Your Pokémon are masters of their own types, focusing their energy in every attack they make. When you reach level 15, for Pokémon of the same types you are specialized in, their STAB can be added to any damaging move of their choosing, even if it is a different type from their own."],
		},
	},
}, {
	name: "Commander",
	features: {
		level2: {
			description: ["You rule over your Pokémon with an iron fist, demanding respect and forming an unbreakable bond with your team. When you choose this path at level 2, your starter’s Bond Level becomes +2. In addition, all of your with a positive Bond Level have 1 additional Bond Point."],
		},
		level5: {
			name: "Follow Me",
			description: ["You have a firm hand, but a trusting presence. When you reach level 5, any new Pokémon you catch get a +1 bonus to Bond Level (max Bond Level +2). In addition, your Pokémon's Bond Level cannot be decreased by losing a battle."],
		},
		level9: {
			name: "Show Me What You've Got",
			description: [
				"Your confidence and leadership inspire your Pokémon to reach deep inside themselves for unknown power. At level 9, your Pokémon may spend a Bond Point to use any move they can learn at one tier higher than their current tier or below. Each Pokémon may only do this once per long rest.",
				"For example, a Level 4 Bulbasaur can spend a Bond Point to use Sleep Power, since Sleep Power can be learned at one tier higher (level 6) than the Bulbasaur's current level.",
			],
		},
		level15: {
			name: "We're a Team",
			description: ["Your commanding presence is felt by all ally Pokémon on the battlefield. When you reach level 15, you may use your reaction to speak a commanding phrase, allowing one of your Pokémon to spend one of its Bond Points to confer its benefit for an allied Pokémon, even if this allied Pokémon is not one of your own."],
		},
	},
}, {
	name: "Grunt",
	features: {
		level2: {
			description: [
				"Whether current or aspiring evil team member, your goal is to cast down all goody two shoe trainers and rise up in the ranks! Beginning at level 2, gain a pool of <strong>“Shadow Points”</strong> equal to your level. Your point pool increases with each level, and resets on each long rest.",
				"At level 2, you gain access to the <strong>“Sabotage”</strong> ability. As a reaction, you may spend any number of points to decrease the total result of an attack roll including modifiers) that hits your Pokémon if it would cause the attack to miss. The natural attack roll is unaffected by this ability for purposes of move effects, and attacks with a natural roll of 20 may not be decreased at all."],
		},
		level5: {
			name: "Dark Advantage",
			description: ["You know the ins and outs of what it means to be a part of an evil team! At level 5, gain access to the <strong>“Dark Advantage”</strong> ability, allowing you to spend 3 Shadow Points to roll advantage on any skill check, attack roll or saving throw by you or your Pokémon."],
		},
		level9: {
			name: "Sinister Dodge",
			description: ["You have made it to the top ranks, commanding authority through your influence of your ruthless tactics. When you reach level 9, you gain the <strong>“Sinister Dodge”</strong> ability. As a reaction, you may spend 4 shadow points to add one level of resistance to a move that damages one of your Pokémon. (Vulnerable → Neutral, Neutral → Resistant, Resistant → Immune)"],
		},
		level15: {
			name: "Nefarious Stagger",
			description: ["No means are beneath you if it means attaining victory, so you and your Pokémon fully embrace the darkness within. At level 15, gain access to the <strong>“Nefarious Stagger”</strong> ability, allowing you to spend 2 Shadow Points whenever any of your Pokémon inflict the Flinched condition to inflict the Stunned condition instead."],
		},
	},
}, {
	name: "Tactician",
	features: {
		level2: {
			description: [
				"You have an eye for detail and a unique set of skills to use in battle. Beginning at level 2, you gain a pool of <strong>\"Tactical Points\"</strong> equal to your trainer level. Your point pool increases with each level, and resets after each long rest.",
				"At level 2, when a Pokémon regains hit points from an item or move, you may increase the amount by 1d4 for each \"Tactical Point\" spent."],
		},
		level5: {
			name: "Directed Strike",
			description: ["You know precisely where to hit a Pokémon for the maximum amount of damage. At level 5 and higher, you can spend 2 Tactical Points to roll the damage for an attack twice, taking the higher result."],
		},
		level9: {
			name: "Raise Your Defenses",
			description: ["You are quickly able to sense an incoming blow to your Pokémon. At level 9 and higher, you can use a reaction to expend up to 5 of your Tactical Points to add to a Pokémon's AC or Saving Throw, if it would cause an attack to miss or the Pokémon to succeed its save."],
		},
		level15: {
			name: "Not This Time",
			description: ["At level 15, your Pokémon are trained to be unrelenting in battle, never holding back. After an opponent rolls a saving throw for one of your Pokémon's moves, you may increase the DC by up to 5 points if it would cause a failure, spending a Tactical Point for each increase."],
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
			description: ["At level 15, your partner Pokémon boosts the power of your Capture Styler. When any of your Pokémon use a move that is the same type as either of your current partner Pokémon's types, the move's attack roll is made with advantage. Additionally, you have advantage on making captures against Pokémon that share a type with your partner Pokémon."],
		},
	},
}, {
	name: "Guru",
	features: {
		level2: {
			description: ["You and your Pokémon are connected by way of more than just trainer and beast. Your past has trained you to be in complete control of your Mind, Body, and Spirit, and you transfer that aura to your Pokémon. When you choose this path at level 2, your Max SR you can control increases by 1."],
		},
		level5: {
			name: "Mind",
			description: ["Your presence in battle keeps your Pokémon at ease, so that they can fully focus on the task at hand without distraction. At level 5, all of your Pokémon are proficient in Wisdom saving throws and have advantage on the roll to avoid failing confusion."],
		},
		level9: {
			name: "Body",
			description: ["You have trained your Pokémon to focus deep within themselves to unleash their full potential. At level 9, all of your Pokémon have access to two of their abilities (if two are available). In addition, the Tireless feat now costs one ASI point instead of two at levels 4, 8, 12, 16, or 20. If any of your Pokémon already has this feature, they may gain one ASI at this time."],
		},
		level15: {
			name: "Spirit",
			description: ["Your connection to your Pokémon is masterful. Trainer and beast move together in perfect harmony. At level 15, you may control a Pokémon as if it were an extension of your body. At the beginning of your turn, you may activate this feature to add your WIS modifier to all attack OR damage rolls your Pokémon makes until the beginning of your next turn. The option of attack OR damage must be selected each time this is activated, and cannot change during the round. You may use this feature a number of times equal to 1 + your Wisdom modifier (minimum of 1), resetting this pool at each long rest."],
		},
	},
}, {
	name: "Pokémon Breeder",
	features: {
		level2: {
			description: ["You have a fascination with Pokémon that has led you down the path of raising them carefully to create specific improvements in their species. Beginning at level 2, when you attempt to breed two Pokémon, you may add your WIS modifier to the d20 roll for a successful attempt."],
		},
		level5: {
			name: "Tender Love and Care",
			description: ["As a Breeder, you have studied Pokémon eggs and know just what they need to create the perfect environment for optimal growth, no matter the species. When you reach level 5, gain advantage on all rolls that reduce the incubation counter for Pokémon egg hatching times."],
		},
		level9: {
			name: "Good Genes",
			description: ["Your skill as a Breeder shines as people around begin to notice how much stronger your Pokémon seem to be than their typical counterparts. When you reach level 9, any Pokémon you hatch (or have hatched) from an egg gains 2 points to add to its abilities, or spend on a feat."],
		},
		level15: {
			name: "Enhanced Diversity",
			description: ["You are a master of your craft, able to unlock power from Pokémon never thought possible. When you reach level 15, for any future hatched Pokémon, it may inherit a single move from one of its parents that the parent knows, even if that move is not in the child Pokémon's moveset, as long as the parent's SR is less than 15."],
		},
	},
} ]
