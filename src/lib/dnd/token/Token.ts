export type Token = {
	color: string,
	crop: {
		/**
		 * From 0 to 1, percentage of width
		 */
		x: number,

		/**
		 * From 0 to 1, percentage of height
		 */
		y: number,

		/**
		 * From 0 to 1, percentage of shortest side
		 */
		size: number,
	},
}

export const Token = {
	create: (token: Partial<Token>): Token => ({
		color: "#282631",
		crop: {
			x: 0.5,
			y: 0.5,
			size: 1,
		},
		...token,
	}),
} as const