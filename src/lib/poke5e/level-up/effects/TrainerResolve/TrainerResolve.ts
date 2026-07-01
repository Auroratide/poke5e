import { Attributes, type Attribute } from "$lib/dnd/attributes"
import { equalUnordered } from "$lib/utils/list"
import { LevelUpEffect } from "../LevelUpEffect.svelte"
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

	hasError(): string | undefined {
		if (this.props.savingThrows.length < Attributes.list.length && equalUnordered(this.props.savingThrows)(this.params.savingThrows)) {
			return "Choose a saving throw for Trainer's Resolve."
		}

		return undefined
	}

	apply<T extends HasSavingThrows>(subject: T): T {
		return {
			...subject,
			savingThrows: this.params.savingThrows,
		}
	}
}
