import { AsiOrFeatEffect } from "../AsiOrFeat"
import PeakPowerField from "./PeakPowerField.svelte"

export class PeakPowerEffect extends AsiOrFeatEffect {
	get Field() {
		return PeakPowerField
	}
}
