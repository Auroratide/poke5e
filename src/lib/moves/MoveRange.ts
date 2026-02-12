export type MoveRange = string

export const MoveRange = {
	asNumberOfFeet(range: MoveRange): number {
		const lowercase = range.toLocaleLowerCase()
		const explicitRange = lowercase.match(/(\d+)\s*ft/)
		if (explicitRange) {
			return parseInt(explicitRange[1])
		} else {
			return 0
		}
	},
} as const
