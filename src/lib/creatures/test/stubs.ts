import type { Pokemon, MovePool } from "../types"
import { stubAttributes } from "$lib/dnd/attributes/test/stubs"
import { stubSkillProficiencies } from "$lib/dnd/skills/test/stubs"

export function stubMovePool(template: Partial<MovePool> = {}): MovePool {
	return {
		start: ["helping-hand", "tackle", "tail-whip", "charm", "sand-attack", "baby-doll-eyes"],
		level2: [],
		level6: ["swift", "sing"],
		level10: ["heal-pulse", "encore", "quick-attack", "refresh"],
		level14: [ "follow-me", "me-first", "last-resort", "baton-pass"],
		level18: ["hyper-beam", "trump-card"],
		tm: [1, 10, 11, 15, 16, 17, 18, 20, 21, 27, 30, 32, 33, 42, 44, 45, 46, 48, 49, 68, 87, 88, 90, 96, 100],
		egg: [],
		...template,
	}
}

export function stubPokemon(template: Partial<Pokemon> = {}): Pokemon {
	return {
		id: template.id ?? "eeveon",
		name: template.name ?? "Eeveon",
		number: template.number ?? 0,
		type: template.type ?? ["normal"],
		size: template.size ?? "small",
		sr: template.sr ?? 8,
		minLevel: template.minLevel ?? 5,
		eggGroup: template.eggGroup ?? ["field"],
		gender: template.gender ?? "1:7",
		description: template.description ?? "The Domesticated Pokémon. It is born from an absence of evolutionary pressure. Scientists believe increasingly more Eevees will evolve into Eeveon as human influence grows.",
		ac: template.ac ?? 15,
		hp: template.hp ?? 45,
		hitDice: template.hitDice ?? "d10",
		speed: template.speed ?? [ {
			type: "walking",
			value: 40,
		} ],
		attributes: template.attributes?.copy() ?? stubAttributes({
			str: 15,
			dex: 16,
			con: 13,
			int: 6,
			wis: 12,
			cha: 16,
		}),
		skills: template.skills?.copy() ?? stubSkillProficiencies({
			insight: 1,
			performance: 1,
			persuasion: 1,
		}),
		savingThrows: template.savingThrows ?? ["dex", "cha"],
		senses: template.senses ?? [],
		abilities: template.abilities ?? [ {
			id: "cute-charm",
			name: "Cute Charm",
			description: "Once per short rest, you can impose disadvantage on an enemy attack roll of your choice.",
			hidden: false,
		} ],
		specialAbilityText: template.specialAbilityText,
		evolution: template.evolution ?? {
			stage: "2",
			maxStage: "2",
			from: ["eevee"],
			to: [],
		},
		moves: template.moves ?? stubMovePool(),
		media: template.media ?? {},
	}
}