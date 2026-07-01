import type { Attributes } from "$lib/dnd/attributes"
import type { HitDice } from "$lib/dnd/hit-dice"
import type { Resource } from "$lib/poke5e/resource"
import IncreaseHpField from "./IncreaseHpField.svelte"
import { LevelUpEffect } from "../LevelUpEffect.svelte"

type HasHp = {
	hp: Resource
}

export type IncreaseHpProps = {
	hitDice: HitDice
	attributes: Attributes,
	currentHp: number,
}

export type IncreaseHpParams = {
	increaseAmount: number
}

export class IncreaseHpEffect extends LevelUpEffect<IncreaseHpProps, IncreaseHpParams> {
	get Field() {
		return IncreaseHpField
	}

	hasError(): string | undefined {
		return undefined
	}

	apply<T extends HasHp>(subject: T): T {
		return {
			...subject,
			hp: {
				current: subject.hp.current + (this.params.increaseAmount ?? 0),
				max: subject.hp.max + (this.params.increaseAmount ?? 0),
			},
		}
	}
}
