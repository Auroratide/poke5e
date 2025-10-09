import type { Feat } from "../Feat"
import type { DndPokemonFeat } from "./DndPokemonFeat"

export const DndFeatsForPokemon: DndPokemonFeat[] = [ {
	name: "Alert",
}, {
	name: "Charger",
	qualifier: "when using melee attacks",
}, {
	name: "Durable",
}, {
	name: "Elemental Adept",
	qualifier: "choose a Pokémon type",
}, {
	name: "Observant",
}, {
	name: "Resilient",
}, {
	name: "Savage Attacker",
}, {
	name: "Sentinel",
}, {
	name: "Skill Expert",
	qualifier: "not Animal Handling",
}, {
	name: "Skilled",
	qualifier: "only 1 skill, not Animal Handling",
}, {
	name: "Skulker",
}, {
	name: "Speedy",
}, {
	name: "Tough",
} ]

export const PokemonFeats: Feat[] = [ {
	name: "Able-Bodied",
	category: "General",
	description: "Your Pokémon's body is trained to learn from and fight off ailments for long periods of time. The status \"grace period\" for this Pokémon is extended by two rounds.",
}, {
	name: "AC Up",
	category: "General",
	description: "Your Pokémon’s AC increases by 1. This bonus is included through a Pokémon’s evolutions.",
}, {
	name: "Ambidextrous",
	category: "General",
	description: "Your Pokémon can hold an addtional held item. This feat can only be taken once.",
}, {
	name: "Combo Master",
	category: "General",
	description: "Your Pokémon is an expert in combining strikes against a foe. When this feature is selected, moves that have the ability to hit more than once are guaranteed to hit at least twice. (Fury Swipes, Double Slap, etc.)",
}, {
	name: "Extra Move",
	category: "General",
	description: "Your Pokémon can know one more move (five total moves instead of four). You may later take this feat again to gain the ablity to know one more move (to a maximum of six moves total).",
}, {
	name: "Gifted",
	category: "General",
	description: "Increase one ability score of your choice by 1, to a maximum of 22. This ability score's maximum is now 22. As a prerequisite, the Pokémon taking this feat must be at least level 10.",
}, {
	name: "Hidden Ability",
	category: "General",
	description: "Your Pokémon reaches inside itself to discover a new ability. It gains access to the Hidden Ability in its stat block.",
}, {
	name: "Melee Master",
	category: "General",
	description: "Your Pokémon is a master of close combat.\n\n- Gain advantage on all attacks of opportunity.\n- When you hit a creature with a melee move that uses STR as its move power as part of the Attack action on your turn, you can cause the attack to deal extra damage to the target. The extra damage equals your Proficiency Bonus.",
}, {
	name: "Natural Mount",
	category: "General",
	description: "While this Pokémon is mounted, if the creature mounting it is attacked, it can force the attack to target itself instead. Addtionally, if this Pokémon or its mounter are forced to make a Dexterity saving throw that would result in half damage on success, it can deploy additional defenses. This Pokémon can choose either itself or its mounter to take no damage if they succeed on the saving throw, and only half damage if they fail.",
}, {
	name: "Power Sculpter",
	category: "General",
	description: "Your Pokémon is able to sculpt the power of their moves around their allies. For area of effect moves your Pokémon activates, choose 1 + MOVE allies in range to automatically succeed on their saving throw against taking damage or an effect. If the damage is halved for a successful save, they take no damage instead.",
}, {
	name: "Ranged Master",
	category: "General",
	description: "Your Pokémon is a sharpshooter.\n\n- Your ranged attacks ignore half and three-fourths cover.\n- Being within 5 feet of an enemy doesn't impose Disadvantage on your ranged move attack rolls.",
}, {
	name: "Terrain Adept",
	category: "General",
	description: "Your Pokémon is especially skilled when fighting on a specific terrain. Choose one of the following terrains when selecting this feature. Your Pokémon gains +3 to attack rolls when in this terrain. Terrains: Coastal, Swamp, Forest, Arctic, Desert, Grassland, Hill, Mountain, Underwater.",
}, {
	name: "Tireless",
	category: "General",
	description: "Your Pokémon endures hours of rigorous training which keep it in battle longer than the average Pokémon. Gain +1 PP for every move.",
}, {
	name: "Wrangler",
	category: "General",
	description: "You have developed a unique set of skills that give you the ability to grapple and hold an opponent down with steady and strong hands. You gain the following benefits:\n\n- You have Advantage on attack rolls against a creature Grappled by you.\n- You don't have to spend extra movement to move a creature Grappled by you if the creature is your size or smaller.\n- When you hit a creature with a melee move that uses the DEX move power as part of the Attack action on your turn, you can use both the Damage and the Grapple option. You can use this benefit only once per turn.",
} ]
