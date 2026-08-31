import { DataClass } from "$lib/DataClass"
import { get } from "svelte/store"
import { StandardNatures, NatureEffect } from "./StandardNature"
import type { Attributes } from "$lib/dnd/attributes"

export class Nature extends DataClass<string> {
	isStandard(): boolean {
		return (get(StandardNatures) as string[]).includes(this.data)
	}

	applyTo(attributes: Attributes): Attributes {
		const getNatureEffect = get(NatureEffect)
		const asi = getNatureEffect(this.data)
		return attributes.improve(asi)
	}

	static random(): Nature {
		const natures = get(StandardNatures)

		return new Nature(natures[Math.floor(Math.random() * natures.length)])
	}
}
