import { DataClass } from "$lib/DataClass"

/**
 * Gender takes a ratio format:
 * * F:M ratio (ex: 7:1 means 7/8 pokemon are female)
 * * 0:0 means unknown or genderless
 * * So far, no pokemon has a third gender
 */
export class GenderRatio extends DataClass<string> {
	isGenderless = (): boolean => {
		const [ f, m ] = this.ratio()
		return f + m === 0
	}

	percentFemale = (): number => this.percentOf(0)
	percentMale = (): number => this.percentOf(1)

	private ratio = (): [number, number] =>
		this.data.split(":").map((it) => parseInt(it)) as [number, number]
	private percentOf = (com: 0 | 1): number => {
		if (this.isGenderless()) return 0
		const r = this.ratio()
		return 100 * r[com] / (r[0] + r[1])
	}
}
