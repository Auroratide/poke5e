import { DataClass } from "$lib/DataClass"

/**
 * Represents different forms a single species can take.
 * For now this is just a description, stolen from abilities.
 */
export class SpeciesForms extends DataClass<{
	description: string,
}> {
	get description() { return this.data.description }
}
