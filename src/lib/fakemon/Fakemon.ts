import type { MovePool } from "$lib/creatures/types"
import { DataClass, type Data } from "$lib/DataClass"
import { Attributes, type Attribute } from "$lib/dnd/attributes"
import type { CreatureSize } from "$lib/dnd/CreatureSize"
import type { HitDice } from "$lib/dnd/hit-dice"
import type { Speeds } from "$lib/dnd/movement"
import type { Senses } from "$lib/dnd/senses"
import type { SkillRanks } from "$lib/dnd/skills"
import type { Ability } from "$lib/pokemon/types"
import type { PokemonType } from "$lib/pokemon/types-2"
import type { MarkdownString } from "$lib/rendering/markdown"

export class Fakemon extends DataClass<{
	id: string,
	readKey: string,
	writeKey?: string,
	speciesName: string,
	type: Data<PokemonType>,
	size: CreatureSize,
	sr: number, // TODO
	minLevel: number,
	eggGroups: string[],
	gender: string, // TODO
	description: MarkdownString,
	ac: number,
	hp: number,
	hitDice: HitDice,
	speed: Data<Speeds>,
	senses: Data<Senses>,
	attributes: Data<Attributes>,
	skills: Data<SkillRanks>,
	saves: Attribute[],
	abilities: Pick<Ability, "id" | "hidden">[],
	moves: MovePool,
}> {
	get attributes(): Attributes { return new Attributes(this.data.attributes) }
}

export type DraftFakemon = Omit<Data<Fakemon>, "id" | "readKey" | "writeKey">
