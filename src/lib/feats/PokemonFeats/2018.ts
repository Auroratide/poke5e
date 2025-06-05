import type { Feat } from "../Feat"
import type { DndPokemonFeat } from "./DndPokemonFeat"

export const DndFeatsForPokemon: DndPokemonFeat[] = [ {
	name: "Alert",
}, {
	name: "Athlete",
}, {
	name: "Charger",
	qualifier: "when using melee attacks",
}, {
	name: "Durable",
}, {
	name: "Elemental Adept",
	qualifier: "choose a Pokémon type",
}, {
	name: "Mobile",
	qualifier: "from '14 PHB rules",
}, {
	name: "Observant",
}, {
	name: "Resilient",
}, {
	name: "Savage Attacker",
}, {
	name: "Sentinel",
}, {
	name: "Skilled",
	qualifier: "only 1 skill, not Animal Handling",
}, {
	name: "Skulker",
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
	name: "Combo Master",
	category: "General",
	description: "Your Pokémon is an expert in combining strikes against a foe. When this feat is selected, moves that have the ability to hit more than once, after the same attack roll, are guaranteed to hit at least twice. (Fury Swipes, Double Slap, Water Shuriken, etc.)",
}, {
	name: "Extra Move",
	category: "General",
	description: "Your Pokémon can know five total moves instead of four.",
}, {
	name: "Hidden Ability",
	category: "General",
	description: "Your Pokémon reaches inside itself to discover a new ability. It gains access to the Hidden Ability in its stat block.",
}, {
	name: "Melee Master",
	category: "General",
	description: "Your Pokémon is a master of close combat.\n\n- Gain advantage on all attacks of opportunity.\n- Before you make a melee attack, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack’s damage (Once per move).",
}, {
	name: "Power Sculpter",
	category: "General",
	description: "Your Pokémon is able to sculpt the power of their moves around their allies. For area of effect moves your Pokémon activates, choose 1 + MOVE allies in range to automatically succeed on their saving throw against taking damage or an effect. If the damage is halved for a successful save, they take no damage instead.",
}, {
	name: "Ranged Master",
	category: "General",
	description: "Your Pokémon is a sharpshooter.\n\n- Your ranged attacks ignore half and three-fourths cover.\n- Before you make a ranged attack, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack’s damage (Once per move).",
}, {
	name: "Terrain Adept",
	category: "General",
	description: "Your Pokémon is especially skilled when fighting on a specific terrain. Choose one of the following terrains when selecting this feat. Your Pokémon gains +2 to attack rolls when in this terrain. Terrains: Coastal, Swamp, Forest, Arctic, Desert, Grassland, Hill, Mountain, Underwater.",
}, {
	name: "Tireless",
	category: "General",
	description: "Your Pokémon endures hours of rigorous training which keep it in battle longer than the average Pokémon. Gain +1 PP for every move.",
}, {
	name: "Wrangler",
	category: "General",
	description: "You have developed a unique set of skills that give you the ability to grapple and hold an opponent down with steady and strong hands. You gain the following benefits:\n\n- You have advantage on attack rolls against a creature you are Grappling.\n- You can use your action to try to pin a creature already Grappled by you. To do so, make another grapple check. If you succeed, you and the creature are both Restrained until the grapple ends.\n- When a creature attempts to use their movement to leave your reach without disengaging, you may use your reaction to attempt to Grapple the target.",
} ]
