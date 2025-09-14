import { DataClass } from "$lib/DataClass"
import type { AbilityId } from "./Ability"

export class AbilityPool extends DataClass<{
	normal: AbilityId[],
	hidden: AbilityId[],
}> {

}
