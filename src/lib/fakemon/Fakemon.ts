import { GenderRatio } from "$lib/creatures/gender"
import { MovePool } from "$lib/creatures/move-pool"
import { SpeciesRating } from "$lib/creatures/sr"
import { DataClass, type Data } from "$lib/DataClass"
import { Attributes, type Attribute } from "$lib/dnd/attributes"
import type { CreatureSize } from "$lib/dnd/CreatureSize"
import { HitDice } from "$lib/dnd/hit-dice"
import { Speeds } from "$lib/dnd/movement"
import { Senses } from "$lib/dnd/senses"
import { SkillRanks } from "$lib/dnd/skills"
import type { Ability } from "$lib/pokemon/types"
import { PokemonType } from "$lib/pokemon/types-2"
import { FakemonMedia, type UploadedMedia } from "./media"

export type FakemonId = string
export type ReadKey = string
export type WriteKey = string

export class Fakemon extends DataClass<{
	id: FakemonId,
	readKey: ReadKey,
	writeKey?: WriteKey,
	speciesName: string,
	type: Data<PokemonType>,
	size: CreatureSize,
	sr: Data<SpeciesRating>,
	minLevel: number,
	eggGroups: string[],
	gender: Data<GenderRatio>,
	description: string,
	ac: number,
	hp: number,
	hitDice: Data<HitDice>,
	speed: Data<Speeds>,
	senses: Data<Senses>,
	attributes: Data<Attributes>,
	skills: Data<SkillRanks>,
	saves: Attribute[],
	abilities: Pick<Ability, "id" | "hidden">[],
	moves: Data<MovePool>,
	media: Data<FakemonMedia<UploadedMedia>>,
}> {
	get type(): PokemonType { return new PokemonType(this.data.type) }
	get gender(): GenderRatio { return new GenderRatio(this.data.gender) }
	get sr(): SpeciesRating { return new SpeciesRating(this.data.sr) }
	get hitDice(): HitDice { return new HitDice(this.data.hitDice) }
	get speed(): Speeds { return new Speeds(this.data.speed) }
	get senses(): Senses { return new Senses(this.data.senses) }
	get attributes(): Attributes { return new Attributes(this.data.attributes) }
	get skills(): SkillRanks { return new SkillRanks(this.data.skills) }
	get media(): FakemonMedia<UploadedMedia> { return new FakemonMedia(this.data.media) }
	get moves(): MovePool { return new MovePool(this.data.moves) }
}

export type DraftFakemon = Omit<Data<Fakemon>, "id" | "readKey" | "writeKey">
