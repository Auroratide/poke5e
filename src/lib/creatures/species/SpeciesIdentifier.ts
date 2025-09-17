import { DataClass } from "$lib/DataClass"
import type { ReadKey as FakemonReadKey } from "$lib/fakemon"

export class SpeciesIdentifier extends DataClass<string> {
	isFakemon(): boolean { return this.data.startsWith("F.") }

	static fromSpeciesName(name: string): SpeciesIdentifier {
		return new SpeciesIdentifier(name)
	}

	static fromFakemonReadKey(key: FakemonReadKey): SpeciesIdentifier {
		return new SpeciesIdentifier(`F.${key}`)
	}
}
