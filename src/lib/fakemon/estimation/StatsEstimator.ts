import type { PokemonSpecies } from "$lib/poke5e/species"
import type { Data } from "$lib/DataClass"
import type { HitDice } from "$lib/dnd/hit-dice"
import type { Bst } from "$lib/pokemon/bst"
import { PokemonType } from "$lib/pokemon/types"

export class StatsEstimator {
	private type: PokemonType = new PokemonType(["normal"])
	private hitDice: HitDice
	private level: number = 1

	withType(type: PokemonType): this {
		this.type = type
		return this
	}

	withHitDice(hitDice: HitDice): this {
		this.hitDice = hitDice
		return this
	}

	withLevel(level: number): this {
		this.level = level
		return this
	}

	fromBst(bst: Bst): Pick<Data<PokemonSpecies>, "hp" | "ac" | "attributes"> {
		const ac = this.calculateAc(bst)
		const str = this.calculateStr(bst)
		const dex = this.calculateDex(bst)
		const con = this.calculateCon(bst)
		const int = this.calculateInt(bst)
		const wis = this.calculateWis(bst)
		const cha = this.calculateCha(bst)
		const hp = this.calculateHp(this.level, this.hitDice.sizeAsInt(), con)

		return {
			hp,
			ac,
			attributes: {
				str,
				dex,
				con,
				int,
				wis,
				cha,
			},
		}
	}

	private calculateAc(bst: Bst): number {
		const total = bst.data.defense + bst.data.specialDefense
		return Math.max(10, Math.round(0.0391 * total + 9.18))
	}

	private calculateStr(bst: Bst): number {
		const total = bst.data.attack + bst.data.defense
		return Math.round(0.0509 * total + 6.97)
	}

	private calculateDex(bst: Bst): number {
		const total = bst.data.speed
		return Math.round(0.0996 * total + 7.73)
	}

	private calculateCon(bst: Bst): number {
		const total = bst.data.hp + bst.data.defense
		return Math.round(0.0467 * total + 7.9)
	}

	private calculateInt(bst: Bst): number {
		if (this.type.includes("psychic")) {
			const total = bst.data.specialAttack
			return Math.round(0.045 * total + 6)
		} else {
			return 6
		}
	}

	private calculateWis(bst: Bst): number {
		const total = bst.data.specialAttack + bst.data.specialDefense
		return Math.round(0.035 * total + 7.5)
	}

	private calculateCha(bst: Bst): number {
		if (this.type.includes("fairy", "dark", "dragon")) {
			const total = bst.data.specialDefense
			return Math.round(0.038 * total + 10)
		} else {
			return 10
		}
	}

	private calculateHp(level: number, hitDice: number, con: number): number {
		const diceValue = 1 + hitDice / 2
		const conMod = Math.floor(con / 2) - 5

		return 12 + level * (diceValue + conMod)
	}
}
