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
			description: ["When you reach level 5, you gain a number of battle dice (d6) equal to 1 + your Wisdom modifier (minimum of 1). You may assign one of these to any of your Pokémon to be added to a single attack or damage roll, after the result of the initial roll. You replenish your pool of battle dice at each long rest."],
		},
		level9: {
			name: "Max Potential",
			description: ["Certain trainers choose to excel in one area, utilizing it to its fullest potential. When you reach level 9, choose to increase all of your Pokémon’s speed by 10, increase their STR by 1, increase their DEX by 1, or increase their CON by 1."],
		},
		level15: {
			name: "Rapid Switching",
			description: ["When you reach level 15, you can recall and release Pokémon as a bonus action instead of a standard action. You may use this feature a number of times equal to 1 + your Wisdom modifier (minimum of 1). This pool resets at each long rest. A Pokémon may not be switched out until after the end of its first full turn in combat (Unless by item or move like Volt Switch, U-Turn, etc)."],
		},
	},
}, {
	name: "Hobbyist",
	features: {
		level2: {
			description: [`You choose to dabble in a variety of skills to take care of your Pokémon. At level 2, select one additional <a href="${Url.reference.specializations()}">Specialization</a> and two new skill proficiencies for your trainer.`],
		},
		level5: {
			name: "Versatile",
			description: ["At level 5, you gain a number of skill dice (d6) equal to 1 + your WIS modifier (minimum of 1). You may assign one of these to any of your Pokémon to be added to a single skill check or saving throw, after the result of the initial roll. You replenish your pool of skill dice at each long rest."],
		},
		level9: {
			name: "Many Faces",
			description: ["At level 9, you may select a second-, fifth-, or ninth-level feature of any of the other trainer path."],
		},
		level15: {
			name: "Skill Switch",
			description: ["At level 15, you are a master of teaching your Pokémon new strategies to aid in battle. At each long rest, choose a feat from the “Additional Feats” section of page 18 for all of your Pokémon to know for that day. The feat may be changed at each long rest."],
		},
	},
}, {
	name: "Poké Mentor",
	features: {
		level2: {
			description: ["You have a nurturing touch and a skill for mentoring Pokémon to bring out the best in them. Beginning at level 2, your TMs can be used twice before breaking."],
		},
		level5: {
			name: "Pokéchef",
			description: ["You excel at creating meals for your Pokémon, seemingly out of nothing. At level 5, you are frequently prepared with an \"Edible Treat\" for Pokémon, healing 2d4+2 hit points when given as an action. You can use this feature a number of times equal to 1 + your Wisdom modifier. This pool resets at each long rest."],
		},
		level9: {
			name: "Cheerleader",
			description: ["At level 9, once per short rest, you may use a bonus action to boost all allied Pokémon with inspiring words. Until your next turn, you may add your CHA modifier (minimum of 1) to all allied attack rolls OR damage rolls OR AC. In addition, your Pokéchef treat now heals 3d10+6 hit points."],
		},
		level15: {
			name: "Master Teacher",
			description: ["You have become an incredibly skilled teacher, and move learning is accelerated under your leadership. When you reach level 15, your Pokémon's moves may be learned and unlearned at each long rest instead of level up. In addition, your Pokéchef treat now heals 4d12+10 hit points."],
		},
	},
}, {
	name: "Researcher",
	features: {
		level2: {
			description: ["You wish to learn more about Pokémon and the secrets that they hold within. Beginning at level 2, due to your heightened understanding of your Pokémon, you may increase any skill check your Pokémon makes by your trainer's Wisdom or Intelligence modifier (minimum of 1). You must choose which at the time you choose this path."],
		},
		level5: {
			name: "Analyst",
			description: ["A keen mind allows you to discern details about a Pokémon others might overlook. At level 5, you can make a DC 12 Investigation check as a bonus action to determine a Pokémon’s level and identify one of its abilities as determined by the DM."],
		},
		level9: {
			name: "Evolution Expert",
			description: ["At level 9, your understanding of the secrets behind Pokémon evolution allows you to enhance the process. When one of your Pokémon evolves, you may use two of its evolution points to spend on a feat."],
		},
		level15: {
			name: "Professor",
			description: ["At level 15, you are an expert in your field. At any time, you may use a bonus action to identify all of a target's known moves. In addition, you learn and call out a target's weak spots, granting +2 to the attack rolls of all allied Pokémon within 60 feet of you until the end of your next turn. You may use this feature a number of times equal to 1 + your Intelligence modifier (minimum of 1). This pool resets at each long rest"],
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
			name: "Catching Expert",
			description: ["At level 9, any Pokémon you catch are instantly healed of their status ailments and have full health. In addition, you may now add your Charisma modifier to any catching attempt"],
		},
		level15: {
			name: "Disciplined Strikes",
			description: ["At level 15, you have trained your Pokémon to hold back or unleash power when necessary. When damaging a Pokémon enough to cause it to faint, you can choose to bring it to 1 HP instead."],
		},
	},
}, {
	name: "Nurse",
	features: {
		level2: {
			description: ["You have a pure heart and a healing spirit. You want the best for your Pokémon, and that involves always keeping them in tip-top shape. When you choose this path at level 2, gain proficiency in the Medicine skill. At each long rest or Pokémon center visit, your held Pokémon gain temporary hit points equal to your level."],
		},
		level5: {
			name: "Pure Heart",
			description: ["Your kindness radiates to all those around you. Starting at level 5, you have a pool of healing power that replenishes when you take a long rest. As an action, you can touch a willing creature and restore any number of hit points from this pool. The total pool is equal to your trainer level &times; 5."],
		},
		level9: {
			name: "Healing Spirit",
			description: ["Your healing spirit is transferred to your Pokémon. When you reach level 9, whenever you use a consumable that heals your Pokémon, or your Pokémon uses a healing move, roll the dice twice and take the higher result."],
		},
		level15: {
			name: "Joy",
			description: ["You have ascended to an ultimate Pokémon healer. When you reach level 15, once after each long rest, you can spend 1 hour to gain a similar advantage as visiting a Pokémon Center. Up to six Pokémon of your choice are fully healed and cured of all status effects."],
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
			description: ["Your Pokémon are trained to draw power from each other. When you reach level 5, Pokémon of the same type as your specialized types add 2 to their attack rolls."],
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
			description: ["You rule over your Pokémon with an iron fist, demanding respect and forming an unbreakable bond with your team. When you choose this path at level 2, your starter’s Loyalty increases to “Loyal”. In addition, all of your Pokémon double the saving throw and HP bonuses from positive Loyalty levels."],
		},
		level5: {
			name: "Follow Me",
			description: ["You have a firm hand, but a trusting presence. When you reach level 5, any new Pokémon you catch get a +1 bonus to Loyalty. In addition, your Pokémon's Loyalty level cannot be decreased by losing a battle."],
		},
		level9: {
			name: "Show Me What You've Got",
			description: ["Your confidence and leadership inspire your Pokémon to reach deep inside themselves for unknown power. At level 9, once per short rest, one of your Pokémon may double all damage dice from one of its moves OR activate a single move from one tier above moves that it currently can learn. (For example: A level 4 Bulbasaur can use Sleep Powder - a move only available at level 6 and above.) In the case of Pokémon that are already at the highest move tier level, it may double the damage dice OR activate any unknown move in its stat block. The choice to use this feature to double damage dice can occur after the result of the attack roll or saving throw from the move is known."],
		},
		level15: {
			name: "We're a Team",
			description: ["Your commanding presence is felt by all ally Pokémon on the battlefield. When you reach level 15, you may use a bonus action to speak a commanding phrase. Until the end of your next turn, all allied Pokémon within 60 feet of you have advantage on their attacks. You may use this feature a number of times equal to 1 + your Charisma modifier (minimum of 1). This pool resets at each long rest."],
		},
	},
}, {
	name: "Grunt",
	features: {
		level2: {
			description: ["Whether current or aspiring evil team member, your goal is to cast down all goody two shoe trainers and rise up in the ranks! Beginning at level 2, gain a pool of “Shadow Points” equal to your level. Your point pool increases with each level, and resets on each long rest. At level 2, you gain access to the “Sabotage” ability. As a reaction, you may spend any number of points to decrease the total result of an attack roll including modifiers) that hits your Pokémon if it would cause the attack to miss. The natural attack roll is unaffected by this ability for purposes of move effects, and attacks with a natural roll of 20 may not be decreased at all."],
		},
		level5: {
			name: "And Make It Double",
			description: ["You know the ins and outs of what it means to be a part of an evil team! At level 5, gain access to the “Dark Advantage” ability, allowing you to spend 3 Shadow Points to roll advantage on any skill check, attack roll or saving throw by you or your Pokémon."],
		},
		level9: {
			name: "Surrender Now",
			description: ["You have made it to the top ranks, commanding authority through your influence of the Shadow Arts. When you reach level 9, you gain the “Sinister Dodge” ability. As a reaction, you may spend 4 shadow points to add one level of resistance to a move that damages one of your Pokémon. (Vulnerable -> Neutral, Neutral -> Resistant, Resistant -> Immune)"],
		},
		level15: {
			name: "Prepare to Fight",
			description: ["With the evolution of your Shadow Abilities through your intense training, you and your Pokémon accept the darkness within and harness it. At level 15, gain access to the “Copy Meowth” ability, allowing you to spend 5 Shadow Points for any of your Pokémon to invoke the “Me First” reaction."],
		},
	},
}, {
	name: "Tactician",
	features: {
		level2: {
			description: ["You have an eye for detail and a unique set of skills to use in battle. Beginning at level 2, you gain a pool of \"Tactical Points\" equal to your trainer level. Your point pool increases with each level, and resets after each long rest. At level 2, when a Pokémon regains hit points from an item or move, you may increase the amount by 1d4 for each \"Tactical Point\" spent."],
		},
		level5: {
			name: "Directed Strike",
			description: ["You know precisely where to hit a Pokémon for the maximum amount of damage. At level 5 and higher, you can spend 2 \"Tactical Points\" to roll the damage for an attack twice, taking the higher result."],
		},
		level9: {
			name: "Raise Your Defenses",
			description: ["You are quickly able to sense an incoming blow to your Pokémon. At level 9 and higher, you can use a reaction to expend up to 3 of your \"Tactical Points\" to add to a Pokémon's AC, if it would cause an attack to miss."],
		},
		level15: {
			name: "Not This Time",
			description: ["At level 15, your Pokémon are trained to be unrelenting in battle, never holding back. After an opponent rolls a saving throw for one of your Pokémon's moves, you may increase the DC by up to 5 points if it would cause a failure, spending a \"Tactical Point\" for each increase."],
		},
	},
}, {
	name: "Ranger",
	features: {
		level2: {
			description: ["You are comfortable in the wild, and have an incredible respect for Pokémon in their natural habitat. When you choose this path at level 2, gain proficiency in Nature and Survival. If you were already proficient, gain expertise. In addition, your walking speed increases by 5, and you gain a climbing and swimming speed equal to your walking speed."],
		},
		level5: {
			name: "Deep Connection",
			description: ["You have the innate ability to communicate with Pokémon on a different level than others. At level 5, you can cast the \"Speak with Animals\" spell to attempt to communicate with a willing Pokémon, understanding their response in your own language. Each day, you can use this feature a number of times equal to your WIS or CHA modifier (minimum of 1)"],
		},
		level9: {
			name: "Strong Bond",
			description: ["Your Pokémon team understands that they are in this journey together. At level 9, you can bond with up to two Pokémon at each long rest."],
		},
		level15: {
			name: "Best Friends",
			description: ["At level 15, you may have two Active Pokémon to roam the world with you, outside their balls. In battle, on your turn, you follow the same rules as if you have one Active Pokémon. The three of you can still move up to your movement speeds, but one action/reaction/bonus action is still shared by the group. If any one of your Pokémon faints, you may release another to take its place."],
		},
	},
}, {
	name: "Guru",
	features: {
		level2: {
			description: ["You and your Pokémon are connected by way of more than just trainer and beast. Your past has trained you to be in complete control of your Mind, Body, and Spirit, and you transfer that aura to your Pokémon. When you choose this path at level 2, you gain proficiency in the Persuasion skill. In addition, Pokémon not yet able to be controlled by you are set at the \"Indifferent\" loyalty level instead of \"Disloyal\" until the Control Upgrade is met."],
		},
		level5: {
			name: "Mind",
			description: ["Your presence in battle keeps your Pokémon at ease, so that they can fully focus on the task at hand without distraction. At level 5, all of your Pokémon are proficient in Wisdom saving throws and have advantage on the roll to avoid failing confusion."],
		},
		level9: {
			name: "Body",
			description: ["You have trained your Pokémon to focus deep within themselves to unleash their full potential. At level 9, all of your Pokémon have access to both of their non-hidden abilities (if two are available). In addition, the Tireless feat now costs one ASI point instead of two at levels 4, 8, 12, 16, or 20. If any of your Pokémon already has this feature, they may gain one ASI at this time."],
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
			name: "Master of Traits",
			description: ["You are a master of your craft, able to raise a new Pokémon to your perfect specifications. When you reach level 15, for any future hatched Pokémon, you may ignore the roll and hand-pick the Gender, Nature, and Ability of the resulting Pokémon (from available options). In addition, if any of your future hatched Pokémon inherits at least one Egg Move, you may replace the inherited move(s) with any other move(s) from its Egg Moves list."],
		},
	},
} ]
