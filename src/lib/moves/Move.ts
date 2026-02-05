import { DataClass, type Data } from "$lib/DataClass"
import type { Attributes } from "$lib/dnd/attributes"
import type { Level } from "$lib/dnd/level"
import type { PokemonSpecies } from "$lib/poke5e/species"
import type { PokeType } from "$lib/pokemon/types"
import type { BodyText } from "$lib/ui/rendering/types"
import { ContestDetails } from "./contest/ContestDetails"
import { MoveAttack } from "./MoveAttack"
import { MoveDamage } from "./MoveDamage"
import { MovePower } from "./MovePower"
import { MoveSave } from "./MoveSave"
import type { MoveStats } from "./MoveStats"
import type { Tm } from "./tms/Tm"
import { TmDetails } from "./tms/TmDetails"

export type MoveId = string

export class Move extends DataClass<{
	id: MoveId,
	beta?: boolean,
	name: string,
	type: PokeType,
	power: Data<MovePower>,
	time: string,
	pp: number,
	duration: string,
	range: string,
	description: BodyText,
	higherLevels?: string,
	optional?: BodyText,
	contest?: Data<ContestDetails>,
	tm?: Data<TmDetails>,
	damage?: Data<MoveDamage>,
	attack?: Data<MoveAttack>,
	save?: Data<MoveSave>,
}> {
	get id() { return this.data.id }
	get beta() { return this.data.beta ?? false }
	get name() { return this.data.name }
	get type() { return this.data.type }
	get power() { return new MovePower(this.data.power) }
	get time() { return this.data.time }
	get pp() { return this.data.pp }
	get duration() { return this.data.duration }
	get range() { return this.data.range }
	get description() { return this.data.description }
	get higherLevels() { return this.data.higherLevels }
	get optional() { return this.data.optional }
	get contest() { return this.data.contest ? new ContestDetails(this.data.contest) : undefined }
	get tm() { return this.data.tm ? new TmDetails(this.data.tm) : undefined }
	get damage() { return this.data.damage ? new MoveDamage(this.data.damage) : undefined }
	get attack() { return this.data.attack ? new MoveAttack(this.data.attack) : undefined }
	get save() { return this.data.save ? new MoveSave(this.data.save) : undefined }

	tmName(): string {
		if (this.tm == null) return this.name
		return `${this.tm.id} - ${this.name}`
	}

	isTm(): this is Tm {
		return this.tm != null
	}

	pokemonWhoLearnThis(allPokemon: PokemonSpecies[]): PokemonSpecies[] {
		return allPokemon.filter((pokemon) => pokemon.moves.canLearn(this))
	}

	pokemonWhoLearnThisViaTm(allPokemon: PokemonSpecies[]): PokemonSpecies[] {
		return allPokemon.filter((pokemon) => pokemon.moves.canLearnViaTm(this))
	}

	calculateMoveStats(forCharacter: {
		attributes: Attributes,
		level: Level,
		type: PokeType[],
	}): MoveStats {
		const result: MoveStats = {}

		if (this.power.data === "none" || this.power.data === "varies") return result

		const bestPower = this.power.bestAttribute(forCharacter.attributes)[0]
		if (bestPower == null) return result

		const attributeMod = forCharacter.attributes[bestPower].modifier

		const pb = forCharacter.level.proficiencyBonus
		const hasStab = forCharacter.type.includes(this.type)

		result.toHit = this.attack?.toHit(pb, attributeMod)
		result.save = this.save?.withDc(pb, attributeMod)
		result.damage = this.damage?.damage(attributeMod, hasStab, forCharacter.level)

		return result
	}

	static matchNameOrType = (value: string) => (move: Move) =>
		move.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
			move.type.includes(value.toLocaleLowerCase())
}
