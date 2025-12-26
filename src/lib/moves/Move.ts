import { DataClass, type Data } from "$lib/DataClass"
import type { PokemonSpecies } from "$lib/poke5e/species"
import type { PokeType } from "$lib/pokemon/types"
import type { BodyText } from "$lib/ui/rendering/types"
import { ContestDetails } from "./ContestDetails"
import { MovePower } from "./MovePower"
import type { Tm } from "./Tm"
import { TmDetails } from "./TmDetails"

export type MoveId = string

export class Move extends DataClass<{
	id: MoveId,
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
}> {
	get id() { return this.data.id }
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

	static matchNameOrType = (value: string) => (move: Move) =>
		move.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
			move.type.includes(value.toLocaleLowerCase())
}
