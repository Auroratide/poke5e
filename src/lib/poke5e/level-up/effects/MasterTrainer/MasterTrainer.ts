import { LevelUpEffect } from "../LevelUpEffect"
import MasterTrainerField from "./MasterTrainerField.svelte"

export class MasterTrainerEffect extends LevelUpEffect<Record<never, never>, Record<never, never>> {
	get Field() {
		return MasterTrainerField
	}

	apply<T>(subject: T): T {
		return subject
	}
}
