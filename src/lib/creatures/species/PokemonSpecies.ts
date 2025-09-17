import { type Data, DataClass } from "$lib/DataClass"
import { type Attribute, Attributes } from "$lib/dnd/attributes"
import { type CreatureSize } from "$lib/dnd/CreatureSize"
import { DistanceSet } from "$lib/dnd/distance"
import { HitDice } from "$lib/dnd/hit-dice"
import { Speeds } from "$lib/dnd/movement"
import { Senses } from "$lib/dnd/senses"
import { SkillRanks } from "$lib/dnd/skills"
import { AbilityPool } from "$lib/pokemon/ability"
import type { PokeEvolution } from "$lib/pokemon/types"
import { PokemonType } from "$lib/pokemon/types-2"
import { EggGroup } from "../egg-group"
import { GenderRatio } from "../gender"
import { SpeciesMedia, type UploadedMedia } from "../media"
import { MovePool } from "../move-pool"
import { SpeciesRating } from "../sr"
import type { PokemonJsonResponse } from "./PokemonJsonResponse"
import { SpeciesIdentifier } from "./SpeciesIdentifier"

export class PokemonSpecies extends DataClass<{
	id: Data<SpeciesIdentifier>,
	name: string,
	number: number,
	type: Data<PokemonType>,
	size: CreatureSize,
	sr: Data<SpeciesRating>,
	minLevel: number,
	eggGroups: Data<EggGroup>,
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
	abilities: Data<AbilityPool>,
	moves: Data<MovePool>,
	media: Data<SpeciesMedia<UploadedMedia>>,
	evolution?: PokeEvolution,
}> {
	get id(): SpeciesIdentifier { return new SpeciesIdentifier(this.data.id) }
	get type(): PokemonType { return new PokemonType(this.data.type) }
	get gender(): GenderRatio { return new GenderRatio(this.data.gender) }
	get sr(): SpeciesRating { return new SpeciesRating(this.data.sr) }
	get eggGroups(): EggGroup { return new EggGroup(this.data.eggGroups) }
	get hitDice(): HitDice { return new HitDice(this.data.hitDice) }
	get speed(): Speeds { return new Speeds(this.data.speed) }
	get senses(): Senses { return new Senses(this.data.senses) }
	get attributes(): Attributes { return new Attributes(this.data.attributes) }
	get skills(): SkillRanks { return new SkillRanks(this.data.skills) }
	get media(): SpeciesMedia<UploadedMedia> { return new SpeciesMedia(this.data.media) }
	get moves(): MovePool { return new MovePool(this.data.moves) }
	get abilities(): AbilityPool { return new AbilityPool(this.data.abilities) }

	numberAsString(): string {
		return `#${this.data.number.toString().padStart(4, "0")}`
	}

	static fromJson(it: PokemonJsonResponse["items"][number]): PokemonSpecies {
		return new PokemonSpecies({
			id: SpeciesIdentifier.fromSpeciesName(it.id).data,
			name: it.name,
			number: it.number,
			type: it.type,
			size: it.size,
			sr: it.sr,
			minLevel: it.minLevel,
			eggGroups: it.eggGroup,
			gender: it.gender,
			description: it.description,
			ac: it.ac,
			hp: it.hp,
			hitDice: it.hitDice,
			speed: DistanceSet.fromList(Speeds, it.speed).data,
			senses: DistanceSet.fromList(Senses, it.senses).data,
			attributes: it.attributes,
			skills: SkillRanks.fromList(it.skills).data,
			saves: it.savingThrows,
			abilities: AbilityPool.fromList(it.abilities).data,
			moves: it.moves,
			media: {
				normalPortrait: {
					name: it.media.main,
					href: it.media.main,
				},
				normalSprite: it.media.sprite ? {
					name: it.media.sprite,
					href: it.media.sprite,
				} : undefined,
				shinyPortrait: it.media.mainShiny ? {
					name: it.media.mainShiny,
					href: it.media.mainShiny,
				} : undefined,
				shinySprite: it.media.spriteShiny ? {
					name: it.media.spriteShiny,
					href: it.media.spriteShiny,
				} : undefined,
			},
			evolution: it.evolution,
		})
	}
}