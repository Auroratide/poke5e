import { LevelUpEffect } from "../LevelUpEffect.svelte"
import MasterTrainerField from "./MasterTrainerField.svelte"

export class MasterTrainerEffect extends LevelUpEffect<Record<never, never>, Record<never, never>> {
	get Field() {
		return MasterTrainerField
	}

	hasError(): string | undefined {
		return undefined
	}

	apply<T>(subject: T): T {
		return subject
	}
}
