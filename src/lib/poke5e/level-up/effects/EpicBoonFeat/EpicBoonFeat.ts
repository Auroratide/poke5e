import { AsiOrFeatEffect } from "../AsiOrFeat"
import EpicBoonFeatField from "./EpicBoonFeatField.svelte"

export class EpicBoonFeat extends AsiOrFeatEffect {
	get Field() {
		return EpicBoonFeatField
	}
}
