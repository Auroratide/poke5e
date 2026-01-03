import type { Feat } from "./Feat"
import { level, oneOfAttributes } from "./Prerequisite"

const seePhb = (page: number) => `See Dungeons & Dragons Player Handbook, p${page}`

export const DndFeats: Feat[] = [ {
	name: "Actor",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["cha"], 13)],
	description: seePhb(202),
}, {
	name: "Alert",
	category: "Origin",
	description: seePhb(200),
}, {
	name: "Archery",
	category: "Fighting Style",
	description: seePhb(209),
}, {
	name: "Athlete",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["str", "dex"], 13)],
	description: seePhb(202),
}, {
	name: "Blind Fighting",
	category: "Fighting Style",
	description: seePhb(209),
}, {
	name: "Boon of Combat Prowess",
	category: "Epic Boon",
	prerequisites: [level(19)],
	description: seePhb(210),
}, {
	name: "Boon of Dimensional Travel",
	category: "Epic Boon",
	prerequisites: [level(19)],
	description: seePhb(210),
}, {
	name: "Boon of Energy Resistance",
	category: "Epic Boon",
	prerequisites: [level(19)],
	description: seePhb(210),
}, {
	name: "Boon of Fate",
	category: "Epic Boon",
	prerequisites: [level(19)],
	description: seePhb(210),
}, {
	name: "Boon of Fortitude",
	category: "Epic Boon",
	prerequisites: [level(19)],
	description: seePhb(210),
}, {
	name: "Boon of Irresistible Offense",
	category: "Epic Boon",
	prerequisites: [level(19)],
	description: seePhb(211),
}, {
	name: "Boon of Recovery",
	category: "Epic Boon",
	prerequisites: [level(19)],
	description: seePhb(211),
}, {
	name: "Boon of Skill",
	category: "Epic Boon",
	prerequisites: [level(19)],
	description: seePhb(211),
}, {
	name: "Boon of Speed",
	category: "Epic Boon",
	prerequisites: [level(19)],
	description: seePhb(211),
}, {
	name: "Boon of Spell Recall",
	category: "Epic Boon",
	prerequisites: [level(19)],
	description: seePhb(211),
}, {
	name: "Boon of the Night Spirit",
	category: "Epic Boon",
	prerequisites: [level(19)],
	description: seePhb(211),
}, {
	name: "Boon of Truesight",
	category: "Epic Boon",
	prerequisites: [level(19)],
	description: seePhb(211),
}, {
	name: "Charger",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["str", "dex"], 13)],
	description: seePhb(202),
}, {
	name: "Chef",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(202),
}, {
	name: "Crafter",
	category: "Origin",
	description: seePhb(200),
}, {
	name: "Crossbow Expert",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["dex"], 13)],
	description: seePhb(203),
}, {
	name: "Crusher",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(203),
}, {
	name: "Defense",
	category: "Fighting Style",
	description: seePhb(209),
}, {
	name: "Defensive Duelist",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["dex"], 13)],
	description: seePhb(203),
}, {
	name: "Dual Wielder",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["str", "dex"], 13)],
	description: seePhb(203),
}, {
	name: "Dueling",
	category: "Fighting Style",
	description: seePhb(209),
}, {
	name: "Durable",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(203),
}, {
	name: "Elemental Adept",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(203),
}, {
	name: "Fey-Touched",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(204),
}, {
	name: "Grappler",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["str", "dex"], 13)],
	description: seePhb(204),
}, {
	name: "Great Weapon Fighting",
	category: "Fighting Style",
	description: seePhb(209),
}, {
	name: "Great Weapon Master",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["str"], 13)],
	description: seePhb(204),
}, {
	name: "Healer",
	category: "Origin",
	description: seePhb(201),
}, {
	name: "Heavily Armored",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(204),
}, {
	name: "Heavy Armor Master",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(204),
}, {
	name: "Inspiring Leader",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["wis", "cha"], 13)],
	description: seePhb(204),
}, {
	name: "Interception",
	category: "Fighting Style",
	description: seePhb(209),
}, {
	name: "Keen Mind",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["int"], 13)],
	description: seePhb(205),
}, {
	name: "Lightly Armored",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(205),
}, {
	name: "Lucky",
	category: "Origin",
	description: seePhb(201),
}, {
	name: "Mage Slayer",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(205),
}, {
	name: "Magic Initiate",
	category: "Origin",
	description: seePhb(201),
}, {
	name: "Martial Weapon Training",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(205),
}, {
	name: "Medium Armor Master",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(205),
}, {
	name: "Moderately Armored",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(205),
}, {
	name: "Mounted Combatant",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(205),
}, {
	name: "Musician",
	category: "Origin",
	description: seePhb(201),
}, {
	name: "Observant",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["int", "wis"], 13)],
	description: seePhb(205),
}, {
	name: "Piercer",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(206),
}, {
	name: "Poisoner",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(206),
}, {
	name: "Polearm Master",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["str", "dex"], 13)],
	description: seePhb(206),
}, {
	name: "Protection",
	category: "Fighting Style",
	description: seePhb(209),
}, {
	name: "Resilient",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(206),
}, {
	name: "Ritual Caster",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["int", "wis", "cha"], 13)],
	description: seePhb(206),
}, {
	name: "Savage Attacker",
	category: "Origin",
	description: seePhb(201),
}, {
	name: "Sentinel",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["str", "dex"], 13)],
	description: seePhb(207),
}, {
	name: "Shadow-Touched",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(207),
}, {
	name: "Sharpshooter",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["dex"], 13)],
	description: seePhb(207),
}, {
	name: "Shield Master",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(207),
}, {
	name: "Skill Master",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(207),
	removed: true,
}, {
	name: "Skill Expert",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(207),
}, {
	name: "Skilled",
	category: "Origin",
	description: seePhb(201),
}, {
	name: "Skulker",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["dex"], 13)],
	description: seePhb(208),
}, {
	name: "Slasher",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(208),
}, {
	name: "Speedy",
	category: "General",
	prerequisites: [level(4), oneOfAttributes(["dex", "con"], 13)],
	description: seePhb(208),
}, {
	name: "Spell Sniper",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(208),
}, {
	name: "Tavern Brawler",
	category: "Origin",
	description: seePhb(202),
}, {
	name: "Telekinetic",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(208),
}, {
	name: "Telepathic",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(208),
}, {
	name: "Thrown Weapon Fighting",
	category: "Fighting Style",
	description: seePhb(210),
}, {
	name: "Tough",
	category: "Origin",
	description: seePhb(202),
}, {
	name: "Two-Weapon Fighting",
	category: "Fighting Style",
	description: seePhb(210),
}, {
	name: "Unarmed Fighting",
	category: "Fighting Style",
	description: seePhb(210),
}, {
	name: "War Caster",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(209),
}, {
	name: "Weapon Master",
	category: "General",
	prerequisites: [level(4)],
	description: seePhb(209),
} ]
