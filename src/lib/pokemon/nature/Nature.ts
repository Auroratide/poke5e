import { DataClass } from "$lib/DataClass"
import { get } from "svelte/store"
import { StandardNatures } from "./StandardNature"

export class Nature extends DataClass<string> {
	isStandard(): boolean {
		return (get(StandardNatures) as string[]).includes(this.data)
	}
}
