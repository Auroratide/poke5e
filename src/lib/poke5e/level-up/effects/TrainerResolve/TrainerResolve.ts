import type { Attribute } from "$lib/dnd/attributes"
import { LevelUpEffect } from "../LevelUpEffect"
import TrainerResolveField from "./TrainerResolveField.svelte"

export type TrainerResolveProps = {
	savingThrows: Attribute[],
}

export type TrainerResolveParams = {
	savingThrows: Attribute[],
}

type HasSavingThrows = {
	savingThrows: Attribute[]
}

export class TrainerResolveEffect extends LevelUpEffect<TrainerResolveProps, TrainerResolveParams> {
	get Field() {
		return TrainerResolveField
	}

	apply<T extends HasSavingThrows>(subject: T): T {
		return {
			...subject,
			savingThrows: this.params.savingThrows,
		}
	}
}
